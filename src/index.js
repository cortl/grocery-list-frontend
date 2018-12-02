import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {compose, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import App from "./components/App";
import {reduxFirestore, getFirestore} from 'redux-firestore';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import fbConfig from './config/fbConfig';

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reactReduxFirebase(fbConfig),
        reduxFirestore(fbConfig),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
