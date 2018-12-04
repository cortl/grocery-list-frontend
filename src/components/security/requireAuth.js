import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export default (ComposedComponent) => {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        };

        componentWillMount = () => {
            if (!this.props.authenticated) {
                this.context.router.history.push("/signIn");
            }
        };

        componentWillUpdate = (nextProps) => {
            if (!nextProps.authenticated) {
                this.context.router.history.push("/signIn");
            }
        };

        render = () => {
            // if (this.props.authenticated) {
                return <ComposedComponent {...this.props} />;
            // }
            // return null;
        }
    }

    return connect(mapStateToProps)(Authentication);
}

export const mapStateToProps = (state) => {
    return { authenticated: state.firebase.auth.isEmpty};
};
