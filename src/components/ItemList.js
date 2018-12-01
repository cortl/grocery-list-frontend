import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import {connect} from "react-redux";

const ItemList = (props) => (
    <ul className='list-group'>
        {props.items.sort(sortByCategory).map(item =>
            <Item
                key={item.id}
                id={item.id}
                text={item.text}
                category={item.category}
            />
        )}
    </ul>
);

const sortByCategory = (itemA, itemB) => itemA.category.sortOrder - itemB.category.sortOrder;

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        category: PropTypes.object.isRequired
    }).isRequired).isRequired,
};

const mapStateToProps = state => ({
    items: state.items
});

export default connect(mapStateToProps)(ItemList)
