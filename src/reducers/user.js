const initialState = {};
export const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                ...action.payload
            };
        case 'RESET_USER':
            return {};
        default:
            return state;
    }
};
