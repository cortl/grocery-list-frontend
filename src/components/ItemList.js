import React from 'react'
import PropTypes from 'prop-types'
import GroceryItem from './items/GroceryItem'
import { List } from 'semantic-ui-react';

export const ItemList = (props) => {
    return (
        <List divided relaxed fluid>
            {props.items && props.items.sort(sortByCategory).map(item => {
                return (<GroceryItem
                    key={item.id}
                    itemId={item.id}
                    text={item.name}
                    category={item.category}
                />)
            }
            )}
        </List>);
};

export const sortByCategory = (itemA, itemB) => {
    const sortComparison = itemA.category.sortOrder - itemB.category.sortOrder;
    return sortComparison === 0
        ? stringSort(itemA, itemB)
        : sortComparison;
};

const stringSort = (itemA, itemB) => {
    if (itemA.name.toUpperCase() < itemB.name.toUpperCase())
        return -1;
    if (itemA.name.toUpperCase() > itemB.name.toUpperCase())
        return 1;
    return 0;
};

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.object.isRequired
    }).isRequired)
};
