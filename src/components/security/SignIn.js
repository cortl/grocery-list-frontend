import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { signIn } from "../../actions";
import { connect } from "react-redux";
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { Container, Header, Image, Button, Icon, Grid, Loader } from 'semantic-ui-react';
import Logo from '../../media/logo.png';

const contentStyle = {
    marginTop: '2em'
}

export class SignIn extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    UNSAFE_componentWillUpdate(nextProps) {
        if (!isEmpty(nextProps.auth)) {
            this.context.router.history.push('/');
        }
    }

    render() {
        return (
            <Container style={contentStyle}>
                <Header textAlign='center' size='large' icon>
                    <Image src={Logo} alt='logo' />
                    <Header.Content>Grocery List</Header.Content>
                </Header>
                {
                    !isLoaded(this.props.auth)
                        ? <Loader active />
                        : <Grid verticalAlign='middle' style={{ marginTop: '5em' }}>
                            <Grid.Row>
                                <Grid.Column
                                    stlye=''
                                    textAlign="center">
                                    <Button color='google plus'
                                        inline='centered'
                                        onClick={this.props.signIn}>
                                        <Icon name='google' /> Google
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                }
            </Container>
        )
    }
}

SignIn.propTypes = {
    auth: PropTypes.object,
    signIn: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
    auth: state.firebase.auth
});

export default connect(mapStateToProps, { signIn })(SignIn);
