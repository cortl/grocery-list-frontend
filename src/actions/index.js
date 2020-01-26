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
})

const removeError = dispatch => () => dispatch({
    type: 'AUTH_SUCCEED',
})

const loginWith = (provider, dispatch) => authRef
    .signInWithPopup(provider)
    .then(removeError(dispatch))
    .catch(authError(dispatch))

export const loginWithGoogle = () => (dispatch) => loginWith(googleProvider, dispatch);
export const loginWithFacebook = () => (dispatch) => loginWith(facebookProvider, dispatch);
export const loginWithTwitter = () => (dispatch) => loginWith(twitterProvider, dispatch);
export const loginWithGithub = () => (dispatch) => loginWith(githubProvider, dispatch);

export const signOut = () => () => authRef.signOut();