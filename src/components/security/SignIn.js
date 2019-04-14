import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { signIn } from "../../actions";
import { connect } from "react-redux";
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { Spinner } from '../Spinner';

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
        console.log(!isLoaded(this.props.auth))
        return (
            <React.Fragment>
                <div style={{
                    backgroundImage: `url(${require('../../media/wall.jpg')})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: '100%',
                    filter: 'blur(5px)',
                    display: 'block',
                    position: 'fixed',
                    left: 0,
                    right: 0,
                    zIndex: 1
                }}></div>
                <div
                    style={{
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        zIndex: 9999
                    }}>
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

export const mapStateToProps = (state) => ({
    auth: state.firebase.auth
});

export default connect(mapStateToProps, { signIn })(SignIn);
