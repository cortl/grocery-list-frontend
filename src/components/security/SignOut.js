import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {signOut} from '../../actions';
import {connect} from 'react-redux';
import {Menu} from 'semantic-ui-react';

export class SignOut extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillUpdate(nextProps) {
        if (nextProps.auth.isEmpty) {
            this.context.router.history.push('/signIn');
        }
    }

    render() {
        return (
            <Menu.Item onClick={this.props.signOut} position='right'>{'Sign Out'}</Menu.Item>
        );
    }

}

SignOut.propTypes = {
    auth: PropTypes.shape({
        isEmpty: PropTypes.bool
    }),
    signOut: PropTypes.func
};

export const mapStateToProps = (state) => ({
    auth: state.firebase.auth
});

export default connect(mapStateToProps, {signOut})(SignOut);
