import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon';
import ItemActions from './ItemActions'
import * as Categories from "../constants/categories";
import {BLUE, GRAY, GREEN, LIGHT_BLUE, PINK, PURPLE, RED, TAN, WHITE, YELLOW} from "../constants/colors";

const Item = (props) => {
    const color = props.category === Categories.NONE ? 'black' : 'white';
    const backgroundColor = determineColor(props.category);

    return(
    <li style={{backgroundColor, color}} className='list-group-item'>
        <div className='clearfix'>
            <span className='float-left mt-2'>{props.text}</span>
            <ItemActions
                color={color}
                id={props.id}
            />
        </div>
    </li>)};

const determineColor = category => {
    switch (category) {
        case Categories.PRODUCE:
            return GREEN;
        case Categories.DAIRY:
            return PINK;
        case Categories.FROZEN:
            return LIGHT_BLUE;
        case Categories.GRAINS:
            return TAN;
        case Categories.MEAT:
            return RED;
        case Categories.CANNED:
            return GRAY;
        case Categories.DRYGOODS:
            return BLUE;
        case Categories.HOUSEHOLD:
            return PURPLE;
        case Categories.OTHER:
            return YELLOW;
        default:
            return WHITE;
    }
};

Item.propTypes = {
    text: PropTypes.string.isRequired
};

export default Item
