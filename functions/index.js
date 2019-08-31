const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
admin.firestore().settings({timestampsInSnapshots: true})

const itemStripper = name => {
    return name.split(' ')
        .filter((item) => !hasNumber(item))
        .filter((item) => item.length !== 1)
        .join(' ');
};

const hasNumber = string => {
    return /\d/.test(string);
};

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
    const normalizedItemName = itemStripper(item.name)

    return firestore.collection('associations')
        .where('userId', '==', item.userId)
        .where('name', '==', normalizedItemName)
        .get()
        .then(categories => {
            if (categories.size > 0) {
                console.info(`Category found for user: ${item.userId} and item: ${item.name}`)
                return categories.forEach(category => {
                    return snap.ref.set({
                        userId: item.userId,
                        name: item.name,
                        category: category.ref
                    });
                })
            } else {
                console.log(`Category not found for user: ${item.userId} and item: ${item.name}`)
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
            }
        });
});