const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true })

const itemStripper = name => {
    return name.split(' ')
        .filter((item) => !hasNumber(item))
        .filter((item) => item.length !== 1)
        .join(' ');
};

const hasNumber = string => {
    return /\d/.test(string);
};

const matchingCategory = item => (category) => {
    return category.name.toUpperCase() === itemStripper(item.name.toUpperCase());
};

const getCategoryForItem = (item, categories) => {
    return categories.find(matchingCategory(item));
}

const getCategories = (firestore, userId) => {
    return firestore.collection('associations').where('userId', '==', userId).get()
        .then(categoryQuerySnapshot => {
            let categories = [];
            categoryQuerySnapshot.forEach(categoryDocumentSnapshot => {
                categories.push({
                    id: categoryDocumentSnapshot.id,
                    category: categoryDocumentSnapshot.data().category,
                    name: categoryDocumentSnapshot.data().name,
                    ref: categoryDocumentSnapshot.ref
                });
            });
            return categories;
        })
}

exports.addItem = functions.https.onRequest((req, res) => {
    const firestore = admin.firestore();

    const newItem = req.body

    return firestore.collection('items').add(newItem).then(documentReference => {
        return documentReference.get().then(documentSnap => {
            return res.status(201).send({
                id: documentSnap.id,
                name: documentSnap.data().name,
                userId: documentSnap.data().userId
            });
        });
    })
});

exports.addItemFirestore = functions.firestore.document('items/{item}').onCreate((snap, context) => {
    const firestore = admin.firestore();
    const item = snap.data();

    return getCategories(firestore, item.userId).then(categories => {
        const matchingCategory = getCategoryForItem(item, categories);
        console.log(`found matching category ${matchingCategory}`)
        return matchingCategory
            ? snap.ref.set({
                userId: item.userId,
                name: item.name,
                category: matchingCategory.ref
            })
            : firestore.collection('associations').add({
                category: 'None',
                name: item.name,
                userId: item.userId
            }).then(categoryDocRef => {
                console.log('had to create a category for this')
                return snap.ref.set({
                    userId: item.userId,
                    name: item.name,
                    category: categoryDocRef
                })
            });
    });
});