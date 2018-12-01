import {NONE} from "../constants/categories";
import {ADD_ITEM, CHANGE_CATEGORY, REMOVE_ITEM} from "../actions";

const items = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEM:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    category: NONE
                }
            ];
        case REMOVE_ITEM:
            return state.filter(item => item.id !== action.id);
        case CHANGE_CATEGORY: {
            const item = state.find(item => item.id === action.id);
            return [
                ...state.filter(item => item.id !== action.id),
                {
                    id: action.id,
                    text: item.text,
                    category: action.category
                }
            ]
        }
        default:
            return state
    }
};

export default items
