import {authRef, provider} from "../config/fbConfig";

export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ITEM_ERROR = 'ADD_ITEM_ERROR';
export const addItem = (name, listId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.add(
            {collection: 'items'}, {
                name,
                listId
            }).then(() => {
            dispatch({
                type: ADD_ITEM,
                name
            })
        }).catch((err) => {
            dispatch({type: ADD_ITEM_ERROR, err});
        });
    };
};


export const REMOVE_ITEM = 'REMOVE_ITEM';
const REMOVE_ITEM_ERROR = 'REMOVE_ITEM_ERROR';
export const removeItem = id => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.delete({
            collection: 'items',
            doc: id.toString()
        }).then(() => {
            dispatch({
                type: REMOVE_ITEM,
                id
            })
        }).catch((err) => {
            dispatch({type: REMOVE_ITEM_ERROR, err})
        })
    };
};

export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const CHANGE_EXISTING_CATEGORY_ERROR = 'CHANGE_CATEGORY_ERROR';
const CHANGE_NEW_CATEGORY_ERROR = 'CHANGE_CATEGORY_ERROR';

export const changeExistingCategory = (id, userId, name, category) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.set({collection: 'associations', doc: id}, {name, category, userId})
            .then(dispatch({
                type: CHANGE_CATEGORY,
                id,
                name,
                category
            }))
            .catch((err) => {
                dispatch({type: CHANGE_EXISTING_CATEGORY_ERROR, err})
            })
    }
};

export const changeNewCategory = (id, userId, name, category) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.add({collection: 'associations'}, {
            category,
            userId,
            name
        })
            .then(dispatch({
                type: CHANGE_CATEGORY,
                id,
                name,
                category
            }))
            .catch((err) => {
                dispatch({type: CHANGE_NEW_CATEGORY_ERROR, err})
            })
    }
};

export const FETCH_USER = 'FETCH_USER';
export const fetchUser = () => dispatch => {
    authRef.onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: FETCH_USER,
                payload: user
            });
        } else {
            dispatch({
                type: FETCH_USER,
                payload: null
            });
        }
    });
};

export const loadUser = (uid) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.get({collection: 'users', doc: uid})
        .then(userProfile => {
            const userDoc = userProfile.docs[0].data();
            dispatch({
                type: 'SIGN_IN',
                payload: {
                    lists: userDoc.lists.map(list => list.id),
                    ownList: userDoc.lists[0].id
                }
            })
        });
};

export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const signIn = () => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    authRef
        .signInWithPopup(provider)
        .then(result => {
            const userId = result.user.uid;
            firestore.get({collection: 'users', doc: userId})
                .then(userProfile => {
                    if (!userProfile.exists) {
                        firestore.collection('lists').add({
                            userId
                        }).then(docId => {
                            firestore.set({collection: 'users', doc: userId},
                                {
                                    lists: [docId]
                                });
                        });
                    } else {
                        dispatch({
                            type: 'SIGN_IN',
                            payload: {
                                lists: userProfile.data().lists.map(list => list.id),
                                ownList: userProfile.data().lists[0].id
                            }
                        });
                    }
                });
        });
};

export const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR';
export const signOut = () => dispatch => {
    authRef
        .signOut()
        .then(() => {
            dispatch({
                type: 'RESET_USER'
            })
        });
};
