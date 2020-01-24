import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Loader, Grid, Card} from 'semantic-ui-react';

import Item from './item';
import {CATEGORIES} from '../../../constants/categories';

const sortCategory = (catA, catB) => CATEGORIES[catA].sortOrder - CATEGORIES[catB].sortOrder;

const buildLists = (items) => {
    let categories = Array.from(new Set(items.map(item => item.category.category)));
    categories = categories.sort(sortCategory);
    const byCategory = category => item => item.category.category === category;
    return (
        <>
            {
                categories.map((category, index) => (
                    <Card fluid key={`${index}div`}>
                        <Card.Content header={`${category} ${CATEGORIES[category].symbol}`} />
                        <Card.Content description>
                            <Grid columns={2} style={{marginBottom: '.5em'}}>
                                {items.filter(byCategory(category))
                                    .map((item, i) => (
                                        <Fragment key={`${i}`}>
                                            <Item
                                                category={item.category}
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
