import React from 'react';
import PropTypes from 'prop-types';
import ItemActions from './ItemActions';
import { Grid } from 'semantic-ui-react';

const GroceryItem = ({ category, text, itemId }) => {
    return (
        <Grid.Row style={{paddingTop: '0px', paddingBottom: '0px'}}>
            <Grid.Column verticalAlign='middle'>
                {`${text}`}
            </Grid.Column>
            <Grid.Column>
                <ItemActions
                    category={category}
                    categoryId={category.categoryId}
                    itemId={itemId}
                    name={text}
                />
            </Grid.Column>
        </Grid.Row>
    );
};

GroceryItem.propTypes = {
    itemId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.object.isRequired
};

export default GroceryItem;