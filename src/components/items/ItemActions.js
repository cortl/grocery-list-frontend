import React from 'react';
import { connect } from 'react-redux';
import { changeCategory, removeItem } from '../../actions';
import PropTypes from 'prop-types';
import { CATEGORIES } from '../../constants/categories';
import { itemStripper } from '../../utils/categoryMatching';
import { Menu, Dropdown, Loader } from 'semantic-ui-react';


export const ItemActions = (props) => {
    const removeOnClick = () => () => props.removeItem(props.itemId);
    const changeOnClick = (key) => () => props.changeCategory(props.categoryId, props.userId, props.name)(CATEGORIES[key].category);

    return (
        <Menu
            floated='right'
            icon
            secondary>
            {props.categoryId
                ? (
                    <Dropdown
                        button
                        compact
                        icon='cog'
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
                )
                : <Loader active inline size='small' style={{ marginTop: '.5em' }}/>
            }
            <Menu.Item
                icon='trash'
                onClick={removeOnClick()}
            />
        </Menu>
    );
};

ItemActions.propTypes = {
    itemId: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.shape({
        associationId: PropTypes.string,
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
