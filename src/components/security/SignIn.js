import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {login} from '../../actions';
import {connect} from 'react-redux';
import {isLoaded, isEmpty} from 'react-redux-firebase';
import {Container, Header, Image, Button, Icon, Loader, Card} from 'semantic-ui-react';
import Logo from '../../media/logo.png';

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
                {
                    !isLoaded(this.props.auth)
                        ? <Loader active />
                        : (
                            <Card centered style={{marginTop: '5em'}}>
                                <Card.Content header='Log in' />
                                <Card.Content textAlign='center'>
                                    <Button color='google plus'
                                        onClick={this.props.login}>
                                        <Icon name='google' />
                                        {'Log in with Google'}
                                    </Button>
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
    login: PropTypes.func.isRequired
};

export const mapStateToProps = (state) => ({
    auth: state.firebase.auth
});

export default connect(mapStateToProps, {login})(SignIn);
