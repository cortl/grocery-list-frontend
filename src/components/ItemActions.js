import React from 'react'
import Icon from './Icon';
import {connect} from "react-redux";
import {changeCategory, removeItem} from "../actions";
import {BLUE, GRAY, GREEN, LIGHT_BLUE, PINK, PURPLE, RED, TAN, WHITE, YELLOW} from "../constants/colors";
import Category from "./Category";
import * as CATEGORIES from "../constants/categories";

const ItemActions = (props) => (
    <div className='float-right'>
        <button type='button' className='btn btn-link' id={`${props.id}dropDown`}
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <Icon color={props.color} type='cog'/>
        </button>
        <ul className="dropdown-menu" aria-labelledby={`${props.id}dropDown`}>
            <Category textColor={'white'} change={props.changeCategory(props.id)} color={GREEN} text={CATEGORIES.PRODUCE}/>
            <Category textColor={'white'} change={props.changeCategory(props.id)} color={PINK} text={CATEGORIES.DAIRY}/>
            <Category textColor={'white'} change={props.changeCategory(props.id)} color={LIGHT_BLUE} text={CATEGORIES.FROZEN}/>
            <Category textColor={'white'} change={props.changeCategory(props.id)} color={TAN} text={CATEGORIES.GRAINS}/>
            <Category textColor={'white'} change={props.changeCategory(props.id)} color={RED} text={CATEGORIES.MEAT}/>
            <Category textColor={'white'} change={props.changeCategory(props.id)} color={GRAY} text={CATEGORIES.CANNED}/>
            <Category textColor={'white'} change={props.changeCategory(props.id)} color={BLUE} text={CATEGORIES.DRYGOODS}/>
            <Category textColor={'white'} change={props.changeCategory(props.id)} color={PURPLE} text={CATEGORIES.HOUSEHOLD}/>
            <Category textColor={'white'} change={props.changeCategory(props.id)} color={YELLOW} text={CATEGORIES.OTHER}/>
            <Category textColor={'black'} change={props.changeCategory(props.id)} color={WHITE} text={CATEGORIES.NONE}/>
        </ul>
        <button onClick={(e) => props.removeItem(props.id)} type='button' className='btn btn-link'>
            <Icon color={props.color} type='trash'/>
        </button>
    </div>
);

const mapDispatchToProps = dispatch => ({
    removeItem: id => dispatch(removeItem(id)),
    changeCategory: id => category => dispatch(changeCategory(id, category))
});

export default connect(null, mapDispatchToProps)(ItemActions);
