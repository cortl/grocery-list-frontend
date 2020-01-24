const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuid = require('uuid');

admin.initializeApp();
admin.firestore().settings({timestampsInSnapshots: true});
const firestore = admin.firestore();

exports.addUserMetadata = functions.auth.user().onCreate((user) => {
    firestore.collection('users').set({email: user.email, list: uuid.v4()});
});