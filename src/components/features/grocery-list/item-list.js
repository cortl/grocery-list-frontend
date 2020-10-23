import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Message, Grid, Card } from 'semantic-ui-react';

import Item from './item';
import { CATEGORIES } from '../../../constants/categories';

const sortCategory = (catA, catB) => CATEGORIES[catA].sortOrder - CATEGORIES[catB].sortOrder;
const sortAlphabetically = (itemA, itemB) => itemA.name.localeCompare(itemB.name)
const byCategory = category => item => item.category === category;

const buildLists = (items) => {
    let categories = Array.from(new Set(items.map(item => item.category)));
    categories = categories.sort(sortCategory);
    return (
        <>
            {
                categories.map((category, index) => (
                    <Card fluid key={`${index}div`}>
                        <Card.Content header={`${category} ${CATEGORIES[category].symbol}`} />
                        <Card.Content>
                            <Grid columns={2} style={{ marginBottom: '.5em' }}>
                                {items.filter(byCategory(category))
                                    .sort(sortAlphabetically)
                                    .map((item, i) => (
                                        <Fragment key={`${i}`}>
                                            <Item
                                                category={item.category}
                                                categoryId={item.categoryId}
                                                itemId={item.id}
                                                key={item.id}
                                                text={item.name}
                                            />
                                        </Fragment>
                                    ))
                                }
                            </Grid>
                        </Card.Content>
                    </Card>
                ))
            }
        </>
    );
};

export const ItemList = (props) =>
    props.items.length
        ? buildLists(props.items)
        : <Message>{'Try adding your first item below 😁'}</Message>;

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        categoryId: PropTypes.string.isRequired
    }).isRequired)
};
