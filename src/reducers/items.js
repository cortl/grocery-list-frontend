import {NONE} from "../constants/categories";
import {ADD_ITEM, CHANGE_CATEGORY, REMOVE_ITEM} from "../actions";

const items = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEM:
            return [
                ...state,
                {
                    name: action.name,
                    category: NONE
                }
            ];
        case REMOVE_ITEM:
            return state;
        case CHANGE_CATEGORY: {
            return state
        }
        case 'CREATE_PROJECT_ERROR':
            console.log('done broke', action.err);
            return state;
        case 'REMOVE_ITEM_ERROR':
            console.log('done broke', action.err);
            return state;
        case 'CHANGE_CATEGORY_ERROR':
            console.log('done broke', action.err);
            return state;
        default:
            return state
    }
};

export default items
