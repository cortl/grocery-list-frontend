import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from 'semantic-ui-react';

import Actions from './actions';

const Item = ({categoryId, text, itemId}) => {
    return (
        <Grid.Row style={{paddingTop: '0px', paddingBottom: '0px'}}>
            <Grid.Column verticalAlign='middle'>
                {`${text}`}
            </Grid.Column>
            <Grid.Column>
                <Actions
                    categoryId={categoryId}
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
    categoryId: PropTypes.string.isRequired
};

export default Item;