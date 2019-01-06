import React from 'react'
import PropTypes from 'prop-types'
import ItemActions from './ItemActions'

const Item = (props) => {
    return (
        <li style={{
            backgroundColor: props.category.backgroundColor,
            color: props.category.textColor
        }} className='list-group-item'>
            <div className='clearfix'>
                <span className='float-left mt-2 mr-2'>{props.category.symbol}</span>
                <span className='float-left mt-2'>{props.text}</span>
                <ItemActions
                    category={props.category}
                    categoryId={props.category.categoryId}
                    itemId={props.itemId}
                    name={props.text}
                />
            </div>
        </li>)
};

Item.propTypes = {
    itemId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.object.isRequired
};

export default Item