import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import {connect} from "react-redux";
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase';
import {CATEGORIES, NONE} from "../constants/categories";

export const ItemList = (props) => {
    return (
        <ul className='list-group'>
            {props.items && props.items.sort(sortByCategory).map(item => {
                    return (<Item
                        key={item.id}
                        id={item.id}
                        text={item.name}
                        category={item.category}
                    />)
                }
            )}
        </ul>)
};

export const sortByCategory = (itemA, itemB) => itemA.category.sortOrder - itemB.category.sortOrder;

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.object.isRequired
    }).isRequired)
};

const matchingCategory = (item) => (category) => {
    return category.name.toUpperCase() === item.name.toUpperCase();
};

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

const getItemsForUserId = (collection, userId) => {
    return collection.filter((item) => item.userId === userId)
};

export const mapStateToProps = state => {
    const items = state.firestore.ordered.items
        ? getItemsForUserId(state.firestore.ordered.items, state.firebase.auth.uid)
        : [];
    const associations = state.firestore.ordered.associations
        ? getItemsForUserId(state.firestore.ordered.associations, state.firebase.auth.uid)
        : [];
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
