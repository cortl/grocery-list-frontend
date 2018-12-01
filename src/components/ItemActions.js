import React from 'react'
import Icon from './Icon';
import {connect} from "react-redux";
import {changeCategory, removeItem} from "../actions";
import Category from "./Category";
import * as CATEGORIES from "../constants/categories";
import PropTypes from "prop-types";

export const ItemActions = (props) => (
    <div className='float-right'>
        <button type='button' className='btn btn-link' id={`${props.id}dropDown`}
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <Icon color={props.color} type='cog'/>
        </button>
        <ul className="dropdown-menu" aria-labelledby={`${props.id}dropDown`}>
            <Category change={props.changeCategory(props.id)} category={CATEGORIES.PRODUCE}/>
            <Category change={props.changeCategory(props.id)} category={CATEGORIES.DAIRY}/>
            <Category change={props.changeCategory(props.id)} category={CATEGORIES.FROZEN}/>
            <Category change={props.changeCategory(props.id)} category={CATEGORIES.GRAINS}/>
            <Category change={props.changeCategory(props.id)} category={CATEGORIES.MEAT}/>
            <Category change={props.changeCategory(props.id)} category={CATEGORIES.CANNED}/>
            <Category change={props.changeCategory(props.id)} category={CATEGORIES.DRYGOODS}/>
            <Category change={props.changeCategory(props.id)} category={CATEGORIES.HOUSEHOLD}/>
            <Category change={props.changeCategory(props.id)} category={CATEGORIES.OTHER}/>
            <Category change={props.changeCategory(props.id)} category={CATEGORIES.NONE}/>
        </ul>
        <button onClick={(e) => props.removeItem(props.id)} type='button' className='btn btn-link'>
            <Icon color={props.color} type='trash'/>
        </button>
    </div>
);

ItemActions.propTypes = {
    id: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    changeCategory: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
};

export const mapDispatchToProps = dispatch => ({
    removeItem: id => dispatch(removeItem(id)),
    changeCategory: id => category => dispatch(changeCategory(id, category))
});

export default connect(null, mapDispatchToProps)(ItemActions);
