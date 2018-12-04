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

const returnEmptyIfUndefined = (collection) => {
    return collection
        ? collection
        : [];
};

export const mapStateToProps = state => {
    const items = returnEmptyIfUndefined(state.firestore.ordered.items);
    const associations = returnEmptyIfUndefined(state.firestore.ordered.associations);
    return {
        items: items.map((item) => {
            return zipItemsAndAssociations(item, associations)
        })
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [{collection: 'items', where: ['userId', '==', props.auth]},
            {collection: 'associations', where: ['userId', '==', props.auth]}]
    }))(ItemList)
