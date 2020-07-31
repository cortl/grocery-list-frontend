export const fetchStats = () => async (dispatch, getState, { getFirestore }) => {
    const { uid } = getState().firebase.auth;
    const userDoc = (await getFirestore().doc(`users/${uid}`).get()).data();
    dispatch({
        type: 'FETCH_STATS',
        totalItemsAdded: userDoc.totalItemsAdded
    });
    dispatch({ type: 'CLEAR_ERROR' });
};