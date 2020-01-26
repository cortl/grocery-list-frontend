
const initialSettings = {
    pending: [],
    invites: [],
    current: [],
    loading: true,
    error: ''
};

export const settingsReducer = (state = initialSettings, action) => {
    switch (action.type) {
        case 'FETCH_SETTINGS':
            return {
                ...state,
                pending: action.pending,
                invites: action.invites,
                current: action.current,
                loading: false
            };
        case 'SHARE_ERROR':
            return {
                ...state,
                error: action.message
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: ''
            }
        default:
            return state;
    }
};