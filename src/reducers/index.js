import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';

const initialState = ''
const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_ERROR':
            return action.text
        case 'AUTH_SUCCEED':
            return initialState
        default:
            return state;
    }
}

export default combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    error: errorReducer
});

