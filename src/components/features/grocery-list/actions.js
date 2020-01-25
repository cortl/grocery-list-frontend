import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Menu, Dropdown} from 'semantic-ui-react';

import {changeAssociation, newAssociation, removeItem} from '../../../actions';
import {CATEGORIES} from '../../../constants/categories';
import {itemStripper} from '../../../utils/category-matching';


export const Actions = (props) => {
    const removeOnClick = () => () => props.removeItem(props.itemId);
    const changeOnClick = (key) => () => {
        props.categoryId
            ? props.changeAssociation(props.categoryId, props.userId, props.name)(CATEGORIES[key].category)
            : props.newAssociation(props.userId, props.name)(CATEGORIES[key].category);
    };

    return (
        <Menu
            floated='right'
            icon
            secondary>
            <Dropdown
                button
                compact
                icon='tag'
                item>
                <Dropdown.Menu>
                    {Object.keys(CATEGORIES).map((key) => (
                        <Dropdown.Item
                            key={key}
                            onClick={changeOnClick(key)}
                            text={`${CATEGORIES[key].symbol} ${CATEGORIES[key].category}`}
                        />
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Menu.Item
                icon='trash'
                onClick={removeOnClick()}
            />
        </Menu>
    );
};

Actions.propTypes = {
    itemId: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    changeAssociation: PropTypes.func.isRequired,
    newAssociation: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
    userId: state.firebase.auth.uid
});

export const mapDispatchToProps = dispatch => ({
    removeItem: id => dispatch(removeItem(id)),
    changeAssociation: (id, userId, name) => category => dispatch(changeAssociation(id, userId, itemStripper(name), category)),
    newAssociation: (userId, name) => category => dispatch(newAssociation(userId, itemStripper(name), category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
