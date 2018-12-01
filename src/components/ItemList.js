import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import {connect} from "react-redux";

const ItemList = (props) => (
    <ul className='list-group'>
        {props.items.map(item =>
            <Item
                key={item.id}
                {...item}
                remove={props.removeItem}
            />
        )}
    </ul>
);

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        category: PropTypes.string
    }).isRequired).isRequired,
};

const mapStateToProps = state => ({
    items: state.items
});

export default connect(mapStateToProps)(ItemList)
