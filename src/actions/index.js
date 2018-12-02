export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ITEM_ERROR = 'ADD_ITEM_ERROR';
export const addItem = name => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.add(
            {collection: 'items'}, {
                name
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

export const changeExistingCategory = (id, name, category) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.set({collection: 'associations', doc: id}, {name: name, category: category})
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

export const changeNewCategory = (id, name, category) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.add({collection: 'associations'}, {
            category,
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
