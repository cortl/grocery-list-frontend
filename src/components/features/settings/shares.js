import React from 'react';
import {connect} from 'react-redux';
import {Card, Input, Button} from 'semantic-ui-react';

import firebase from '../../../config/fbConfig';
import {addShare, approveShare} from '../../../actions/index';

export class Shares extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invites: [],
            currentShares: []
        };
    }

    async componentDidMount() {
        console.log(this.props.email);
        const docs = (await firebase.firestore().collection('shares')
            .where('requestedEmail', '==', this.props.email)
            .get()
            .then(querySnap => querySnap.docs))
            .map(queryDocSnap => ({id: queryDocSnap.id, ...queryDocSnap.data()}));
        this.setState({
            invites: docs.filter(doc => !doc.requestedId)
        });
    }

    render() {
        return (
            <Card fluid>
                <Card.Content header='Share your list' />
                <Card.Content>
                    {'Shared with'}
                </Card.Content>
                <Card.Content>
                    {'Invites to approve'}
                    {this.state.invites.map(invite => (
                        <>
                            <p>{invite.senderEmail}</p>
                            <Button onClick={() => this.props.approve()}
                            >
                                {'Approve'}
                            </Button>
                        </>
                    ))}
                </Card.Content>
                <Card.Content>
                    <Input
                        action={{
                            content: '+',
                            color: 'teal',
                            onClick: () => {
                                console.log(`${this.state.input}`);
                                this.props.addShare(this.props.userId, this.props.email, this.state.input);
                            }
                        }}
                        fluid
                        maxLength={50}
                        onChange={e => this.setState({input: e.target.value})}
                        placeholder='your.name@email.com'
                        style={{marginTop: '1em'}}
                    />
                </Card.Content>
            </Card>
        );
    }
}

export const mapStateToProps = state => ({
    userId: state.firebase.auth.uid,
    email: state.firebase.auth.email
});

export const mapDispatchToProps = dispatch => ({
    approve: (userId, docId) => dispatch(approveShare(userId, docId)),
    addShare: (userId, email, requestedEmail) => dispatch(addShare(userId, email, requestedEmail))
});

export default connect(mapStateToProps, mapDispatchToProps)(Shares);
