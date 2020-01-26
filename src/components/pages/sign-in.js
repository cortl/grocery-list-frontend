import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { Container, Header, Image, Button, Icon, Loader, Card, Message } from 'semantic-ui-react';

import Logo from '../../media/logo.png';
import { loginWithGoogle, loginWithFacebook, loginWithTwitter, loginWithGithub } from '../../actions';

const contentStyle = {
    marginTop: '2em'
};

export class SignIn extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentDidUpdate() {
        if (!isEmpty(this.props.auth)) {
            this.context.router.history.push('/');
        }
    }

    render() {
        return (
            <Container style={contentStyle}>
                <Header icon size='large' textAlign='center'>
                    <Image alt='logo' src={Logo} />
                    <Header.Content>{'Grocery List'}</Header.Content>
                </Header>
                {this.props.error && <Message negative>{this.props.error}</Message>}
                {
                    !isLoaded(this.props.auth)
                        ? <Loader active />
                        : (
                            <Card centered style={{ marginTop: '5em' }}>
                                <Card.Content header='Log in' />
                                <Card.Content textAlign='center'>
                                    <Button.Group vertical>
                                        <Button color='google plus'
                                            onClick={this.props.loginWithGoogle}>
                                            <Icon name='google' />
                                            {'Google'}
                                        </Button>
                                        <Button color='facebook'
                                            onClick={this.props.loginWithFacebook}>
                                            <Icon name='facebook' />
                                            {'Facebook'}
                                        </Button>
                                        <Button color='twitter'
                                            onClick={this.props.loginWithTwitter}>
                                            <Icon name='twitter' />
                                            {'Twitter'}
                                        </Button>
                                        <Button color='grey'
                                            onClick={this.props.loginWithGithub}>
                                            <Icon name='github' />
                                            {'Github'}
                                        </Button>
                                    </Button.Group>
                                </Card.Content>
                            </Card>
                        )
                }
            </Container>
        );
    }
}

SignIn.propTypes = {
    auth: PropTypes.object,
    loginWithGoogle: PropTypes.func.isRequired,
    loginWithFacebook: PropTypes.func.isRequired,
    loginWithTwitter: PropTypes.func.isRequired,
    loginWithGithub: PropTypes.func.isRequired
};

export const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    error: state.error
});

export default connect(mapStateToProps, { loginWithGoogle, loginWithFacebook, loginWithTwitter, loginWithGithub })(SignIn);
