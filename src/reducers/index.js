import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import {errorReducer} from './error';
import {settingsReducer} from './settings';

export default combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    error: errorReducer,
    settings: settingsReducer
});

