
const queryFor = (firestore, field, value) => firestore.collection('shares')
    .where(field, '==', value)
    .get()
    .then(querySnap => querySnap.docs)
    .then(queryDocSnaps => queryDocSnaps.map(queryDocSnap => ({ id: queryDocSnap.id, ...queryDocSnap.data() })));

export const fetchSettings = () => async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const { email, uid } = getState().firebase.auth;
    const [otherDocs, myDocs] = await Promise.all([
        queryFor(firestore, 'requestedEmail', email),
        queryFor(firestore, 'senderId', uid)
    ]);
    const invites = otherDocs.filter(doc => !doc.requestedId);
    const pending = myDocs.filter(doc => !doc.requestedId);
    const current = otherDocs.filter(doc => doc.requestedId)
        .map(doc => ({ email: doc.senderEmail, id: doc.id }))
        .concat(
            myDocs.filter(doc => doc.requestedId)
                .map(doc => ({ email: doc.requestedEmail, id: doc.id }))
        );
    dispatch({
        type: 'FETCH_SETTINGS',
        invites,
        pending,
        current
    });
    dispatch({ type: 'CLEAR_ERROR' });
};

export const approveShare = (docId) => (dispatch, getState, { getFirestore }) =>
    getFirestore()
        .doc(`shares/${docId}`)
        .set({ requestedId: getState().firebase.auth.uid }, { merge: true })
        .then(() => dispatch(fetchSettings()));

export const removeShare = (docId) => (dispatch, _getState, { getFirestore }) =>
    getFirestore()
        .doc(`shares/${docId}`).delete()
        .then(() => dispatch(fetchSettings()));

const shareError = (message) => dispatch => dispatch({
    type: 'SHARE_ERROR',
    message
});

export const addShare = (requestedEmail) => async (dispatch, getState, { getFirestore }) => {
    const { uid, email, displayName } = getState().firebase.auth;
    const yourInvitationDoesNotExist = await getFirestore()
        .collection('shares')
        .where('senderId', '==', uid)
        .where('requestedEmail', '==', requestedEmail)
        .get()
        .then(querySnap => querySnap.empty);
    const theirInvitationDoesNotExist = await getFirestore()
        .collection('shares')
        .where('requestedEmail', '==', email)
        .where('senderEmail', '==', requestedEmail)
        .get()
        .then(querySnap => querySnap.empty);
    if (yourInvitationDoesNotExist && theirInvitationDoesNotExist) {
        getFirestore()
            .collection('shares').add({
                senderId: uid,
                senderEmail: email,
                senderName: displayName,
                requestedEmail
            }).then(() => dispatch(fetchSettings()));
    } else {
        dispatch(shareError('You\'re already sharing your list with them!'));
    }
};
