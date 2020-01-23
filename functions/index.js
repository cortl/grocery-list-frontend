const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuid = require('uuid');

admin.initializeApp();
admin.firestore().settings({timestampsInSnapshots: true});
const firestore = admin.firestore();

const itemStripper = name => {
    return name.split(' ')
        .filter((item) => !hasNumber(item))
        .filter((item) => item.length !== 1)
        .join(' ');
};

const hasNumber = string => {
    return /\d/.test(string);
};

const categoriesFound = (snap, item, categories) => {
    console.info(`Category found for user: ${item.userId} and item: ${item.name}`);
    return categories.forEach(category => {
        return snap.ref.set({
            userId: item.userId,
            name: item.name,
            category: category.ref
        });
    });
};

const categoriesNotFound = (snap, item) => {
    console.log(`Category not found for user: ${item.userId} and item: ${item.name}`);
    return firestore.collection('associations').add({
        category: 'None',
        name: item.name,
        userId: item.userId
    }).then(categoryDocRef => {
        return snap.ref.set({
            userId: item.userId,
            name: item.name,
            category: categoryDocRef
        });
    });
};

exports.addItemFirestore = functions.firestore
    .document('items/{item}')
    .onCreate(async snap => {
        const item = snap.data();
        const normalizedItemName = itemStripper(item.name);

        const categories = await firestore.collection('associations')
            .where('userId', '==', item.userId)
            .where('name', '==', normalizedItemName)
            .get();

        return categories.size > 0
            ? categoriesFound(snap, item, categories)
            : categoriesNotFound(snap, item);
    });

exports.addUserMetadata = functions.auth.user().onCreate((user) => {
    firestore.collection('users').set({email: user.email, list: uuid.v4()});
});