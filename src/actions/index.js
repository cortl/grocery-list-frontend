export const addItem = text => ({
    type: 'ADD_ITEM',
    id: Date.now(),
    text
});

export const removeItem = id => ({
    type: 'REMOVE_ITEM',
    id
});

export const changeCategory = (id, category) => ({
    type: 'CHANGE_CATEGORY',
    id,
    category
});
