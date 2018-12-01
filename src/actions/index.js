export const ADD_ITEM = 'ADD_ITEM';
export const addItem = text => ({
    type: ADD_ITEM,
    id: Date.now(),
    text
});


export const REMOVE_ITEM = 'REMOVE_ITEM';
export const removeItem = id => ({
    type: REMOVE_ITEM,
    id
});

export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const changeCategory = (id, category) => ({
    type: CHANGE_CATEGORY,
    id,
    category
});
