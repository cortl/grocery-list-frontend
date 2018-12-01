import React from 'react'
import PropTypes from "prop-types";

const Category = (props) => (
    <a href='#' onClick={(e) => props.change(props.category)}
       style={{color: props.category.textColor}}>
        <li style={{backgroundColor: props.category.backgroundColor}}
            className='p-2'>{props.category.name}</li>
    </a>
);

Category.propTypes = {
    category: PropTypes.shape({
        name: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        textColor: PropTypes.string.isRequired
    }),
    change: PropTypes.func.isRequired
};

export default Category
