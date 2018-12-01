import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({color, type}) => {
    const iconClass = `align-middle fas fa-${type}`;

    return (<i style={{color}} className={iconClass}/>);
};

Icon.propTypes = {
    type: PropTypes.string,
};

export default Icon
