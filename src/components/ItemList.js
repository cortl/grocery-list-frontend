import React from 'react';
import PropTypes from 'prop-types';
import GroceryItem from './items/GroceryItem';
import { List } from 'semantic-ui-react';

const stringSort = (itemA, itemB) => {
    if (itemA.name.toUpperCase() < itemB.name.toUpperCase())
        return -1;
    if (itemA.name.toUpperCase() > itemB.name.toUpperCase())
        return 1;
    return 0;
};

export const sortByCategory = (itemA, itemB) => {
    const sortComparison = itemA.category.sortOrder - itemB.category.sortOrder;
    return sortComparison === 0
        ? stringSort(itemA, itemB)
        : sortComparison;
};

export const ItemList = (props) => {
    return (
        <List divided fluid relaxed>
            {props.items && props.items.sort(sortByCategory).map(item => {
                return (
                    <GroceryItem
                        category={item.category}
                        itemId={item.id}
                        key={item.id}
                        text={item.name}
                    />
                );
            }
            )}
        </List>
    );
};

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.object.isRequired
    }).isRequired)
};
