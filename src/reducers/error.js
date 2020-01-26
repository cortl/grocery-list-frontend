const initialState = '';
export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_ERROR':
            return action.text;
        case 'AUTH_SUCCEED':
            return initialState;
        default:
            return state;
    }
};


