import React from 'react';
import PropTypes from 'prop-types';
import GroceryItem from './items/GroceryItem';
import {Loader, Header, Grid, Divider} from 'semantic-ui-react';
import {CATEGORIES} from '../constants/categories';

const sortCategory = (catA, catB) => CATEGORIES[catA].sortOrder - CATEGORIES[catB].sortOrder;

const buildLists = (items) => {
    let categories = Array.from(new Set(items.map(item => item.category.category)));
    categories = categories.sort(sortCategory);
    const byCategory = category => item => item.category.category === category;
    return (
        <>
            {
                categories.map((category, index) => (
                    <div key={`${index}div`}>
                        <Header as='h3' style={{marginBottom: '.75em', marginTop: '1em'}}>
                            {`${category} ${CATEGORIES[category].symbol}`}
                        </Header>
                        <Grid columns={2} style={{marginBottom: '.5em'}}>
                            {items.filter(byCategory(category))
                                .map(item => (
                                    <>
                                        <GroceryItem
                                            category={item.category}
                                            itemId={item.id}
                                            key={item.id}
                                            text={item.name}
                                        />
                                        <Divider fitted key={`${item.id}divider`} style={{marginTop: '0', marginBottom: '0'}} />
                                    </>
                                ))
                            }
                        </Grid>
                    </div>
                ))
            }
        </>
    );
};

export const ItemList = (props) => props.items
    ? buildLists(props.items)
    : <Loader active />;

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.object.isRequired
    }).isRequired)
};
