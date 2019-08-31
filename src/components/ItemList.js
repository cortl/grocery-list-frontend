import React from 'react';
import PropTypes from 'prop-types';
import GroceryItem from './items/GroceryItem';
import { List, Loader, Header } from 'semantic-ui-react';
import { CATEGORIES } from '../constants/categories';

const sortCategory = (catA, catB) => CATEGORIES[catA].sortOrder - CATEGORIES[catB].sortOrder;

const buildLists = (items) => {
    let categories = Array.from(new Set(items.map(item => item.category.category)));
    categories = categories.sort(sortCategory);
    const byCategory = category => item => item.category.category === category;
    return (
        <>
            {
                categories.map((category, index) => (
                    <div key={index}>
                        <Header as='h3' style={{marginBottom: '.25em'}}>
                            {`${category} ${CATEGORIES[category].symbol}`}
                        </Header>
                        <List bulleted style={{marginTop: '0px', marginBottom: '1.5em'}}>
                            {items.filter(byCategory(category))
                                .map(item => (
                                    <GroceryItem
                                        category={item.category}
                                        itemId={item.id}
                                        key={item.id}
                                        text={item.name}
                                    />
                                ))
                            }
                        </List>
                    </div>
                ))
            }
        </>
    );
};

export const ItemList = (props) => {
    return (
        props.items
            ? buildLists(props.items)
            : <Loader active/>

    );
};

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.object.isRequired
    }).isRequired)
};
