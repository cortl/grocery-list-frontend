import {firestoreConnect} from 'react-redux-firebase';
import {withFirestore} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {itemStripper} from '../utils/category-matching';
import {CATEGORIES, NONE} from '../constants/categories';
import {ItemList} from '../components/features/grocery-list/item-list';

const getCategory = (categories, name) => {
    const pickedCategory = categories[itemStripper(name)];
    return pickedCategory
        ? {
            ...CATEGORIES[pickedCategory.category],
            categoryId: pickedCategory.id
        }
        : {
            ...NONE,
            categoryId: ''
        };
};

export const mapStateToProps = ({firestore}, {ids}) => {
    const categories = {};
    firestore.ordered.associations && firestore.ordered.associations.forEach(association => {
        categories[itemStripper(association.name)] = {...association};
    });
    const firestoreItems = ids
        .reduce((acc, _, index) => acc.concat(firestore.ordered[`list${index}`]), [])
        .filter(Boolean);

    return {
        items: firestoreItems
            .map(item => ({
                ...item,
                ...getCategory(categories, item.name)
            }))
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [{collection: 'associations', where: ['userId', '==', props.userId]}]
        .concat(props.ids.map((id, index) => ({collection: 'items', where: ['userId', '==', id], storeAs: `list${index}`})))
    ),
    withFirestore
)(ItemList);
