import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Card, Input, Icon, Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import firebase from '../../../config/fbConfig';

const queryFor = (field, value) => firebase.firestore().collection('shares')
    .where(field, '==', value)
    .get()
    .then(querySnap => querySnap.docs)
    .then(queryDocSnaps => queryDocSnaps.map(queryDocSnap => ({id: queryDocSnap.id, ...queryDocSnap.data()})));

export class Shares extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            invites: [],
            pending: [],
            current: []
        };
    }

    componentDidMount() {
        this.refresh();
    }

    refresh = async () => {
        const [otherDocs, myDocs] = await Promise.all([
            queryFor('requestedEmail', this.props.email),
            queryFor('senderId', this.props.userId)
        ]);
        this.setState({
            invites: otherDocs.filter(doc => !doc.requestedId),
            pending: myDocs.filter(doc => !doc.requestedId),
            current: otherDocs.filter(doc => doc.requestedId)
                .map(doc => ({email: doc.senderEmail, id: doc.id}))
                .concat(
                    myDocs.filter(doc => doc.requestedId)
                        .map(doc => ({email: doc.requestedEmail, id: doc.id}))
                )
        });
    }

    approveShare = docId => () => {
        firebase.firestore().doc(`shares/${docId}`).set({
            requestedId: this.props.userId
        }, {merge: true})
            .then(() => this.refresh());
    }

    addShare = () => {
        firebase.firestore().collection('shares').add({
            senderId: this.props.userId,
            senderEmail: this.props.email,
            requestedEmail: this.state.input
        }).then(() => this.refresh());
        this.setState({input: ''});
    }

    removeShare = docId => () => {
        firebase.firestore().doc(`shares/${docId}`).delete()
            .then(() => this.refresh());
    };

    onChange = e => {
        this.setState({input: e.target.value});
    }

    onEnter = (e) => {
        if (e.key === 'Enter') {
            this.addShare();
        }
    }

    render() {
        return (
            <Card fluid>
                <Card.Content header='Share your list' />
                <Card.Content>
                    {'Shared with'}
                    {this.state.current.map((currentShare, i) => (
                        <Fragment key={`current${i}`}>
                            <p>{currentShare.email}</p>
                            <Button onClick={this.removeShare(currentShare.id)}>
                                <Icon name='times' />
                            </Button>
                        </Fragment>
                    ))
                    }
                </Card.Content>
                <Card.Content>
                    {'Invites to approve'}
                    {this.state.invites.map((invite, i) => (
                        <Fragment key={`approve${i}`}>
                            <p>{invite.senderEmail}</p>
                            <Button onClick={this.approveShare(invite.id)}>
                                <Icon name='checkmark' />
                            </Button>
                            <Button onClick={this.removeShare(invite.id)}>
                                <Icon name='times' />
                            </Button>
                        </Fragment>
                    ))}
                </Card.Content>
                <Card.Content>
                    {'Pending invites'}
                    {this.state.pending.map((invite, i) => (
                        <Fragment key={`pending${i}`}>
                            <p>{invite.requestedEmail}</p>
                            <Button onClick={this.removeShare(invite.id)}>
                                <Icon name='times' />
                            </Button>
                        </Fragment>
                    ))}
                </Card.Content>
                <Card.Content>
                    <Input
                        action={{
                            content: '+',
                            color: 'teal',
                            onClick: this.addShare
                        }}
                        fluid
                        maxLength={50}
                        onChange={this.onChange}
                        onKeyPress={this.onEnter}
                        placeholder='your.name@email.com'
                        style={{marginTop: '1em'}}
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
