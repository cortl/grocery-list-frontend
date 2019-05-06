/* global require */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { signIn } from "../../actions";
import { connect } from "react-redux";
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { Spinner } from '../Spinner';

const backgroundStyle = {
    backgroundImage: `url(${require('../../media/wall.jpg')})`,
    backgroundSize: 'cover',
    display:' block',
    left: '-5px',
    top:'-5px',
    bottom:'-5px',
    position: 'fixed',
    right: '-5px',
    zIndex: '1',
    WebkitFilter: 'blur(5px)',
    MozFilter: 'blur(5px)',
    OFilter: 'blur(5px)',
    MSFilter: 'blur(5px)',
    filter: 'blur(5px)',
    WebkitBackgroundSize: 'cover',
    MozBackgroundSize: 'cover',
    OBackgroundSize: 'cover',
    margin:'-5px'
}

const contentStyle = {
    position: 'fixed',
    left: 0,
    right: 0,
    zIndex: 9999
}

export class SignIn extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillUpdate(nextProps) {
        if (!isEmpty(nextProps.auth)) {
            this.context.router.history.push('/');
        }
    }

    render() {
        return (
            <React.Fragment>
                <div style={backgroundStyle}></div>
                <div
                    style={contentStyle}>
                    <div className='container text-center'>
                        <h1 className='display-3 mt-5 mb-5 text-white'>Grocery List</h1>
                        <div className='text-center'>
                            {
                                !isLoaded(this.props.auth)
                                    ? <Spinner />
                                    : <button
                                        className='btn btn-light'
                                        onClick={this.props.signIn}>
                                        <i className='fab fa-google mr-2' />
                                        {'Sign In With Google'}
                                    </button>
                            }
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
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
