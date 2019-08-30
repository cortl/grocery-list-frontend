import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export default (ComposedComponent) => {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        };

        isLoggedIn = () => this.props.auth.isLoaded

        UNSAFE_componentWillMount = () => {
            if (!this.isLoggedIn()) {
                this.context.router.history.push("/signIn");
            }
        };

        componentDidUpdate = () => {
            if (!this.isLoggedIn()) {
                this.context.router.history.push("/signIn");
            }
        }

        render = () => {
            if (this.isLoggedIn()) {
                return <ComposedComponent {...this.props} />;
            }
            return null;
        }
    }

    Authentication.propTypes = {
        auth: PropTypes.shape({
            isEmpty: PropTypes.bool,
            isLoaded: PropTypes.bool
        })
    }

    return connect(mapStateToProps)(Authentication);
}



export const mapStateToProps = (state) => {
    return { auth: state.firebase.auth };
};
