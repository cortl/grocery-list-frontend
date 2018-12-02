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

const zipItemsAndAssociations = (item, categories) => {
    let foundCategory = categories
        ? categories.find(category => category.name === item.name)
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

export const mapStateToProps = state => {
    return {
        items: state.firestore.data.items && state.firestore.ordered.items.map((item) => {
            return zipItemsAndAssociations(item, state.firestore.ordered.associations)
        })
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'items'},
        {collection: 'associations'}
    ]))(ItemList)
