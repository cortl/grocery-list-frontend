export const addItem = text => ({
    type: 'ADD_ITEM',
    id: Date.now(),
    text
});

export const completeItem = id => ({
    type: 'COMPLETE_ITEM',
    id
});
