import {authRef, provider} from '../config/fbConfig';

export const addItem = (name, userId) => {
    return (_dispatch, _getState, {getFirestore}) => {
        getFirestore().add(
            {collection: 'items'}, {
                name,
                userId
            });
    };
};

export const removeItem = id => {
    return (_dispatch, _getState, {getFirestore}) => {
        getFirestore().delete({
            collection: 'items',
            doc: id.toString()
        });
    };
};

export const changeCategory = (id, userId, name, category) => {
    return (_dispatch, _getState, {getFirestore}) => {
        getFirestore().set({collection: 'associations', doc: id}, {name, category, userId});
    };
};

export const signIn = () => () => authRef.signInWithPopup(provider);

export const signOut = () => () => authRef.signOut();