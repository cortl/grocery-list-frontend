import React from 'react';
import PropTypes from 'prop-types';
import GroceryItem from './items/GroceryItem';
import { Loader, Header, Grid, Divider, Segment } from 'semantic-ui-react';
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
                        <Header as='h3' attached='top'>
                            {`${category} ${CATEGORIES[category].symbol}`}
                        </Header>
                        {/* <Grid columns={2} padded={false} style={{ marginBottom: '.5em' }}> */}
                        {items.filter(byCategory(category))
                            .map((item, index) => {
                                const isNotBottom = items.filter(byCategory(category)).length !== index + 1;
                                const style = {
                                    marginBottom: isNotBottom ? '0px' : '1em'
                                };
                                return (
                                    <Segment
                                        compact
                                        attached={isNotBottom ? 'middle' : 'bottom'}
                                        style={style}
                                    >
                                        <GroceryItem
                                            category={item.category}
                                            itemId={item.id}
                                            key={item.id}
                                            text={item.name}
                                        />
                                    </Segment>
                                )
                            })
                        }
                        {/* </Grid> */}
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
            : <Loader active />

    );
};

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.object.isRequired
    }).isRequired)
};
