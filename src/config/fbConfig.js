// Initialize Firebase
import * as firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyBj1zvuapHEXxMAXE83qVw77AMejt8mrXI",
    authDomain: "grocery-list-73afe.firebaseapp.com",
    databaseURL: "https://grocery-list-73afe.firebaseio.com",
    projectId: "grocery-list-73afe",
    storageBucket: "grocery-list-73afe.appspot.com",
    messagingSenderId: "514960464825"
};

firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;

