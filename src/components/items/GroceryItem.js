import React from 'react';
import PropTypes from 'prop-types';
import ItemActions from './ItemActions';
import {List} from 'semantic-ui-react';

const GroceryItem = ({category, text, itemId}) => {
    return (
        <List.Item>
            <List.Content
                size='tiny'
                verticalAlign='middle'
            >
                {`${category.symbol} ${text}`}
                <ItemActions
                    category={category}
                    categoryId={category.categoryId}
                    itemId={itemId}
                    name={text}
                />
            </List.Content>
        </List.Item>
);
};

GroceryItem.propTypes = {
    itemId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.object.isRequired
};

export default GroceryItem;