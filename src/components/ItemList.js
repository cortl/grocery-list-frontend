import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

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
