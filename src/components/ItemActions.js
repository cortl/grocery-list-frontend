import React, { Component } from 'react'
import Icon from './Icon';
import { connect } from "react-redux";
import { changeCategory, removeItem } from "../actions";
import Category from "./Category";
import PropTypes from "prop-types";
import { CATEGORIES } from "../constants/categories";
import { itemStripper } from "../utils/categoryMatching";

export class ItemActions extends Component {
    render() {
        return (
            <div className='float-right'>
                {this.props.category.categoryId
                    && <button type='button' className='btn btn-link' id={`${this.props.itemId}dropDown`}
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        <Icon color={this.props.category.textColor} type='cog' />
                    </button>}
                <ul className="dropdown-menu" aria-labelledby={`${this.props.itemId}dropDown`}>
                    {Object.keys(CATEGORIES).map((key) => {
                        return <Category
                            key={key}
                            change={this.props.changeCategory(this.props.categoryId, this.props.userId, this.props.name)}
                            category={CATEGORIES[key]} />
                    })}
                </ul>
                <button
                    onClick={(e) => this.props.removeItem(this.props.itemId)}
                    type='button' className='btn btn-link'>
                    <Icon color={this.props.category.textColor} type='trash' />
                </button>
            </div>
        )
    }
}

ItemActions.propTypes = {
    itemId: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.shape({
        associationId: PropTypes.string
    }),
    changeCategory: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
    userId: state.firebase.auth.uid
});

export const mapDispatchToProps = dispatch => ({
    removeItem: id => dispatch(removeItem(id)),
    changeCategory: (id, userId, name) => category => dispatch(changeCategory(id, userId, itemStripper(name), category))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemActions);
