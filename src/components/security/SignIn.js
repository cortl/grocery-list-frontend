import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {signIn} from "../../actions";
import {connect} from "react-redux";
import Header from "../Header";

export class SignIn extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillUpdate(nextProps) {
        if (!nextProps.auth.isEmpty) {
            this.context.router.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <Header text='Sign In'/>
                <div className='card'>
                    <div className='card-body'>
                        {/*eslint-disable-next-line*/}
                        <a href='#' onClick={this.props.signIn}>
                            <i className='fab fa-google mr-2'/>
                            Sign In With Google
                        </a>
                    </div>
                </div>
            </div>
        );
    }

}

export const mapStateToProps = (state) => ({
    auth: state.firebase.auth
});

export default connect(mapStateToProps, {signIn})(SignIn);
