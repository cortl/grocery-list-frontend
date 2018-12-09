import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from "react-redux-firebase";
import {user} from "./user";

export default combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    user
})
