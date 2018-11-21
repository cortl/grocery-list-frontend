import React from 'react'
import PropTypes from 'prop-types'

const Item = ({category, text}) => (
    <li className='list-group-item mt-1'>
        {text}
    </li>);

Item.propTypes = {
    category: PropTypes.string,
    text: PropTypes.string.isRequired
};

export default Item
