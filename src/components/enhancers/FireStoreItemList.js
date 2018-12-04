import {matchingCategory} from "../../utils/categoryMatching";
import {CATEGORIES, NONE} from "../../constants/categories";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {ItemList} from "../ItemList";
import {connect} from "react-redux";

const zipItemsAndAssociations = (item, categories) => {
    let foundCategory = categories
        ? categories.find(matchingCategory(item))
        : NONE;
    foundCategory = foundCategory !== undefined ? {
        ...CATEGORIES[foundCategory.category],
        associationId: foundCategory.id
    } : NONE;
    return {
        ...item,
        category: foundCategory
    }
};

const getItemsFromList = (collection, userId) => {
    const getItemsForUserId = (collection, userId) => {
        return collection.filter((item) => item.userId === userId)
    };

    return collection
        ? getItemsForUserId(collection, userId)
        : [];
};

export const mapStateToProps = state => {
    const items = getItemsFromList(state.firestore.ordered.items, state.firebase.auth.uid);
    const associations = getItemsFromList(state.firestore.ordered.associations, state.firebase.auth.uid);
    return {
        items: items.map((item) => {
            return zipItemsAndAssociations(item, associations)
        })
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'items'},
        {collection: 'associations'}
    ]))(ItemList)
