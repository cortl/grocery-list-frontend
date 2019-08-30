import React, { Component } from 'react'
// import Icon from '../Icon';
import { connect } from "react-redux";
import { changeCategory, removeItem } from "../../actions";
import PropTypes from "prop-types";
import { CATEGORIES } from "../../constants/categories";
import { itemStripper } from "../../utils/categoryMatching";
import { Menu, Dropdown, Loader } from 'semantic-ui-react';

export class ItemActions extends Component {
    render() {
        return (
            <React.Fragment>
                <Menu
                    secondary
                    icon
                    floated='right'>
                    {this.props.categoryId
                        ? <Dropdown
                            button
                            item
                            icon='cog'
                            compact>
                            <Dropdown.Menu>
                                {Object.keys(CATEGORIES).map((key) => (
                                    <Dropdown.Item
                                        key={key}
                                        onClick={() => {
                                            this.props.changeCategory(this.props.categoryId, this.props.userId, this.props.name)(CATEGORIES[key].category)
                                        }}
                                        text={`${CATEGORIES[key].symbol} ${CATEGORIES[key].category}`}
                                    />
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        : <Loader active inline size='small' style={{marginTop: '.5em'}}/>
                    }
                    <Menu.Item
                        icon='trash'
                        onClick={() => this.props.removeItem(this.props.itemId)}
                    />
                </Menu>
            </React.Fragment>
        )
    }
}

ItemActions.propTypes = {
    itemId: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.shape({
        associationId: PropTypes.string,
        textColor: PropTypes.string,
        categoryId: PropTypes.string
    }),
    userId: PropTypes.string.isRequired,
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
