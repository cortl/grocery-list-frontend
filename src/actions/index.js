import {authRef, provider} from "../config/fbConfig";

export const addItem = (name, userId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        getFirestore().add(
            {collection: 'items'}, {
                name,
                userId
            });
    };
};

export const removeItem = id => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        getFirestore().delete({
            collection: 'items',
            doc: id.toString()
        });
    };
};

export const changeCategory = (id, userId, name, category) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        getFirestore().set({collection: 'associations', doc: id}, {name, category, userId})
    }
};

export const signIn = () => dispatch => {
    authRef.signInWithPopup(provider)
};

export const signOut = () => dispatch => {
    authRef.signOut()
};
