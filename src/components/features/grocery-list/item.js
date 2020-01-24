import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from 'semantic-ui-react';

import Actions from './actions';

const Item = ({category, text, itemId}) => {
    return (
        <Grid.Row style={{paddingTop: '0px', paddingBottom: '0px'}}>
            <Grid.Column verticalAlign='middle'>
                {`${text}`}
            </Grid.Column>
            <Grid.Column>
                <Actions
                    category={category}
                    categoryId={category.categoryId}
                    itemId={itemId}
                    name={text}
                />
            </Grid.Column>
        </Grid.Row>
    );
};

Item.propTypes = {
    itemId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.object.isRequired
};

export default Item;