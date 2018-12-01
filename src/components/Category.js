import React from 'react'

const Category = ({textColor, color, text, change}) => (
    <a href='#' onClick={(e) => change(text)} style={{color: textColor}}>
        <li style={{backgroundColor: color}} className='p-2'>{text}</li>
    </a>
);

export default Category
