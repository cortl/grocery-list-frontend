/* eslint-disable no-console */
import { authRef, facebookProvider, googleProvider, twitterProvider, githubProvider } from '../config/fbConfig';

export const addItem = (name, userId) => {
    return (_dispatch, _getState, { getFirestore }) => {
        getFirestore().add(
            { collection: 'items' }, {
            name,
            userId
        });
    };
};

export const removeItem = id => {
    return (_dispatch, _getState, { getFirestore }) => {
        getFirestore().delete({
            collection: 'items',
            doc: id.toString()
        });
    };
};

export const changeAssociation = (id, userId, name, category) => {
    return (_dispatch, _getState, { getFirestore }) => {
        getFirestore().set({ collection: 'associations', doc: id }, { name, category, userId });
    };
};

export const newAssociation = (userId, name, category) => {
    return (_dispatch, _getState, { getFirestore }) => {
        getFirestore().add({ collection: 'associations' }, { name, category, userId });
    };
};

const authError = dispatch => e => dispatch({
    type: 'AUTH_ERROR',
    text: e.message
});

const removeError = (dispatch) => () => {
    dispatch({
        type: 'AUTH_SUCCEED'
    });
    dispatch({
        type: 'FETCH_SETTINGS'
    });
};

const loginWith = (provider, dispatch, getState) => authRef
    .signInWithPopup(provider)
    .then(removeError(dispatch, getState()))
    .catch(authError(dispatch));

export const loginWithGoogle = () => (dispatch, getState) => loginWith(googleProvider, dispatch, getState);
export const loginWithFacebook = () => (dispatch, getState) => loginWith(facebookProvider, dispatch, getState);
export const loginWithTwitter = () => (dispatch, getState) => loginWith(twitterProvider, dispatch, getState);
export const loginWithGithub = () => (dispatch, getState) => loginWith(githubProvider, dispatch, getState);
export const signOut = () => () => authRef.signOut();