import React from 'react'
import PropTypes from "prop-types";

const Category = (props) => (
    // eslint-disable-next-line
    <a href='#' onClick={(e) => props.change(props.category.category)}
       style={{color: props.category.textColor}}>
        <li style={{backgroundColor: props.category.backgroundColor}}
            className='p-2'>{props.category.category}</li>
    </a>
);

Category.propTypes = {
    category: PropTypes.shape({
        category: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        textColor: PropTypes.string.isRequired
    }),
    change: PropTypes.func.isRequired
};

export default Category
