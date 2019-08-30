import {CATEGORIES, NONE} from '../constants/categories';
import {firestoreConnect} from 'react-redux-firebase';
import {withFirestore} from 'react-redux-firebase';
import {ItemList} from '../components/ItemList';
import {connect} from 'react-redux';
import {compose} from 'recompose';

const getMatchingCategory = (firestoreCategoryDoc, categories) => {
    if (categories && firestoreCategoryDoc) {
        const category = categories[firestoreCategoryDoc.id];
        return category
            ? {
                ...CATEGORIES[category.category],
                categoryPath: firestoreCategoryDoc.path,
                categoryId: firestoreCategoryDoc.id
            }
            : {
                ...NONE,
                categoryPath: '',
                categoryId: ''
            };
    } else {
        return {
            ...NONE,
            categoryPath: '',
            categoryId: ''
        };
    }
};

export const mapStateToProps = (state) => ({
    items: state.firestore.ordered.items && state.firestore.ordered.items
        .map(firestoreItem => ({
            ...firestoreItem,
            category: {
                ...getMatchingCategory(firestoreItem.category, state.firestore.data.associations)

            }

        }))
});

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        {collection: 'items', where: ['userId', '==', props.auth.uid]},
        {collection: 'associations', where: ['userId', '==', props.auth.uid]}
    ]),
    withFirestore
)(ItemList);
