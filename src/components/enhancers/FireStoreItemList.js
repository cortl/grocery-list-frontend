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

const collectItems = (items) => {
    let itemList = [];
    Object.keys(items).forEach(key => {
        if(items[key]) {
            itemList.push({
                ...items[key],
                id: key
            });
        }
    });
    return itemList;
};

export const mapStateToProps = state => {
    const items = collectItems(returnEmptyIfUndefined(state.firestore.data.items));
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
        let queries = [];
        props.listIds && props.listIds.forEach(listId => {
            queries.push({
                collection: 'items',
                where: ['listId', '==', listId],
                storeAs: 'items'
            });
        });
        queries.push({collection: 'associations', where: ['userId', '==', props.auth]});
        return queries
    }))(ItemList)
