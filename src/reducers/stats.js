
const initialStats = {
    loading: true,
    error: '',
};

export const statsReducer = (state = initialStats, action) => {
    switch (action.type) {
        case 'FETCH_STATS':
            return {
                ...state,
                ...action,
                loading: false
            };
        default:
            return state;
    }
};