import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {isEmpty} from 'react-redux-firebase';
import {Menu} from 'semantic-ui-react';

import {signOut} from '../../../actions/index';

export class SignOut extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentDidUpdate() {
        if (isEmpty(this.props.auth)) {
            this.context.router.history.push('/login');
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
