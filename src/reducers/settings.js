
const initialSettings = {
    pending: [],
    invites: [],
    current: [],
    loading: true
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
        default:
            return state;
    }
};