import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Input, Icon, Button, Loader, Label, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { fetchSettings, approveShare, addShare, removeShare } from '../../../actions/settings';

export class Shares extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            error: false
        };
    }

    componentDidMount() {
        this.props.fetchSettings();
    }

    approveShare = docId => () => this.props.approveShare(docId)
    removeShare = docId => () => this.props.removeShare(docId)
    addShare = () => {
        this.props.addShare(this.state.input);
        this.setState({ input: '' });
    }

    onClick = () => this.validateInput(this.addShare);
    onChange = e => this.setState({ input: e.target.value });
    onEnter = e => {
        if (e.key === 'Enter' && !this.validateInput()) {
            this.addShare();
        }
    }
    validateInput = () => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.input)) {
            this.setState({ error: false });
            return false;
        } else {
            this.setState({ error: true });
            return true;
        }
    }

    buildContent = (title, list, noneMessage, field, deny, approve) => {
        return (
            <Card.Content>
                <Header as='h4'>{title}</Header>
                {
                    this.props.loading
                        ? <Loader active inline='centered' />
                        : list.length ?
                            list.map((item, i) => (
                                <Fragment key={`${field}-${i}`}>
                                    <p>{item[field]}</p>
                                    {
                                        approve
                                        && (
                                            <Button color='green' onClick={this.approveShare(item.id)}>
                                                <Icon name='checkmark' />
                                                <span>{'Approve'}</span>
                                            </Button>
                                        )
                                    }
                                    {
                                        deny
                                        && (
                                            <Button color='red' onClick={this.removeShare(item.id)}>
                                                <Icon name='times' />
                                                <span>{'Remove'}</span>
                                            </Button>
                                        )
                                    }
                                </Fragment>
                            ))
                            : <p>{noneMessage}</p>
                }
            </Card.Content>
        );
    }

    render() {
        return (
            <Card fluid>
                <Card.Content header='Share your list' />
                {this.buildContent('Shared with', this.props.current, 'Not shared with anyone 😢', 'email', true, false)}
                {this.buildContent('Invites to approve', this.props.invites, 'No invites to approve yet! 👍', 'senderEmail', true, true)}
                {this.buildContent('Pending invites', this.props.pending, 'No invites pending 🙌', 'requestedEmail', true, false)}
                <Card.Content>
                    <Input
                        action={{
                            content: '+',
                            color: this.state.error ? 'red' : 'teal',
                            onClick: () => !this.validateInput() && this.addShare()
                        }}
                        error={this.state.error}
                        fluid
                        maxLength={50}
                        onBlur={this.validateInput}
                        onChange={this.onChange}
                        onKeyPress={this.onEnter}
                        placeholder='your.name@email.com'
                        style={{ marginTop: '1em' }}
                        value={this.state.input}
                    />
                    {this.state.error && <Label color='red' pointing>{'Please enter a valid email'}</Label>}
                </Card.Content>
            </Card>
        );
    }
}

Shares.propTypes = {
    loading: PropTypes.bool,
    pending: PropTypes.array,
    current: PropTypes.array,
    invites: PropTypes.array,
    fetchSettings: PropTypes.func,
    addShare: PropTypes.func,
    approveShare: PropTypes.func,
    removeShare: PropTypes.func
};

export const mapStateToProps = state => ({
    loading: state.settings.loading,
    pending: state.settings.pending,
    current: state.settings.current,
    invites: state.settings.invites
});

export default connect(mapStateToProps, {
    fetchSettings,
    addShare,
    approveShare,
    removeShare
})(Shares);
