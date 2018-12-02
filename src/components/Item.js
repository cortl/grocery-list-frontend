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
                <span className='float-left mt-2'>{props.text}</span>
                <ItemActions
                    category={props.category}
                    id={props.id}
                    name={props.text}
                />
            </div>
        </li>)
};

Item.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    category: PropTypes.object
};

export default Item
