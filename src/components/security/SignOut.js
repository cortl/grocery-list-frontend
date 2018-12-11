import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {signOut} from "../../actions";
import {connect} from "react-redux";

export class SignOut extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillUpdate(nextProps) {
        if (nextProps.auth.isEmpty) {
            this.context.router.history.push('/signIn');
        }
    }

    render() {
        return (
            <a className='nav-link' href='#' onClick={this.props.signOut}>Sign Out</a> // eslint-disable-line
        );
    }

}

export const mapStateToProps = (state) => ({
    auth: state.firebase.auth
});

export default connect(mapStateToProps, {signOut})(SignOut);
