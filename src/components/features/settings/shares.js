import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Input, Icon, Button, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import firebase from '../../../config/fbConfig';

const queryFor = (field, value) => firebase.firestore().collection('shares')
    .where(field, '==', value)
    .get()
    .then(querySnap => querySnap.docs)
    .then(queryDocSnaps => queryDocSnaps.map(queryDocSnap => ({ id: queryDocSnap.id, ...queryDocSnap.data() })));

export class Shares extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            loading: true,
            error: false,
            invites: [],
            pending: [],
            current: []
        };
    }

    componentDidMount() {
        this.refresh();
    }

    refresh = async () => {
        this.setState({loading: true})
        const [otherDocs, myDocs] = await Promise.all([
            queryFor('requestedEmail', this.props.email),
            queryFor('senderId', this.props.userId)
        ]);
        this.setState({
            invites: otherDocs.filter(doc => !doc.requestedId),
            pending: myDocs.filter(doc => !doc.requestedId),
            current: otherDocs.filter(doc => doc.requestedId)
                .map(doc => ({ email: doc.senderEmail, id: doc.id }))
                .concat(
                    myDocs.filter(doc => doc.requestedId)
                        .map(doc => ({ email: doc.requestedEmail, id: doc.id }))
                ),
            loading: false
        });
    }

    approveShare = docId => () => {
        firebase.firestore().doc(`shares/${docId}`).set({
            requestedId: this.props.userId
        }, { merge: true })
            .then(() => this.refresh());
    }

    addShare = () => {
        firebase.firestore().collection('shares').add({
            senderId: this.props.userId,
            senderEmail: this.props.email,
            requestedEmail: this.state.input
        }).then(() => this.refresh());
        this.setState({ input: '' });
    }

    removeShare = docId => () => {
        firebase.firestore().doc(`shares/${docId}`).delete()
            .then(() => this.refresh());
    };

    onClick = () => {
        this.validateInput(this.addShare)
    }

    onChange = e => {
        this.setState({ input: e.target.value });
    }

    onEnter = e => {
        if (e.key === 'Enter' && !this.validateInput()) {
            this.addShare();
        }
    }

    validateInput = () => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.input)) {
            this.setState({error: false});
            return false
        } else {
            this.setState({error: true})
            return true;
        }
    }

    buildContent = (title, list, field, deny, approve) => {
        return (
            <Card.Content>
                {title}
                {
                    this.state.loading
                        ? <Loader active inline='centered'/>
                        : list.map((item, i) => (
                            <Fragment key={`${field}-${i}`}>
                                <p>{item[field]}</p>
                                {
                                    approve
                                    && <Button onClick={this.approveShare(item.id)}>
                                        <Icon name='checkmark' />
                                    </Button>
                                }
                                {
                                    deny
                                    && <Button onClick={this.removeShare(item.id)}>
                                        <Icon name='times' />
                                    </Button>
                                }
                            </Fragment>
                        ))
                }
            </Card.Content>
        )
    }

    render() {
        return (
            <Card fluid>
                <Card.Content header='Share your list' />
                {this.buildContent('Shared with', this.state.current, 'email', true, false)}
                {this.buildContent('Invites to approve', this.state.invites, 'senderEmail', true, true)}
                {this.buildContent('Pending invites', this.state.pending, 'requestedEmail', true, false)}
                <Card.Content>
                    <Input
                        action={{
                            content: '+',
                            color: this.state.error ? 'red' : 'teal',
                            onClick: () => !this.validateInput(this.addShare) && this.addShare()
                        }}
                        fluid
                        error={this.state.error}
                        maxLength={50}
                        onChange={this.onChange}
                        onKeyPress={this.onEnter}
                        onBlur={this.validateInput}
                        placeholder='your.name@email.com'
                        style={{ marginTop: '1em' }}
                        value={this.state.input}
                    />
                </Card.Content>
            </Card>
        );
    }
}

Shares.propTypes = {
    userId: PropTypes.string,
    email: PropTypes.string
};

export const mapStateToProps = state => ({
    userId: state.firebase.auth.uid,
    email: state.firebase.auth.email
});

export default connect(mapStateToProps)(Shares);
