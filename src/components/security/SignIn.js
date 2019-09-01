import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { login } from '../../actions';
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { Container, Header, Image, Button, Icon, Grid, Loader } from 'semantic-ui-react';
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
                    <Image alt='logo' src={Logo}/>
                    <Header.Content>{'Grocery List'}</Header.Content>
                </Header>
                {
                    !isLoaded(this.props.auth)
                        ? <Loader active/>
                        : (
                            <Grid style={{ marginTop: '5em' }} verticalAlign='middle'>
                                <Grid.Row>
                                    <Grid.Column
                                        stlye=''
                                        textAlign='center'>
                                        <Button color='google plus'
                                            inline='centered'
                                            onClick={this.props.login}>
                                            <Icon name='google'/>
                                            {'Google'}
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
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

export default connect(mapStateToProps, { login })(SignIn);
