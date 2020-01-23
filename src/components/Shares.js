import React from 'react';
import {Card, Input} from 'semantic-ui-react';

export const Shares = () => (
    <Card fluid>
        <Card.Content header='Share your list' />
        <Card.Content>
            <Input
                action={{
                    content: '+',
                    color: 'teal',
                    onClick: () => {}
                }}
                fluid
                maxLength={50}
                placeholder='your.name@email.com'
                style={{marginTop: '1em'}}
            />
        </Card.Content>
    </Card>
);