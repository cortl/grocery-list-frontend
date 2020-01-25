import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = process.env.NODE_ENV === 'development'
    ? {
        apiKey: process.env.REACT_APP_API_KEY_DEV,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN_DEV,
        databaseURL: process.env.REACT_APP_DATABASE_URL_DEV,
        projectId: process.env.REACT_APP_PROJECT_ID_DEV,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET_DEV,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_DEV,
        appId: process.env.REACT_APP_APP_ID
    }
    : {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID
    };

firebase.initializeApp(config);

firebase.firestore().settings({});

export const authRef = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();

export default firebase;

