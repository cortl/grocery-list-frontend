import React from 'react';
import {MainNavigation} from './navigation/MainNavigation';
import {Grid, Header} from 'semantic-ui-react';

export const Settings = () => (
    <Grid centered columns={1} container>
        <Grid.Column computer='10' mobile='16'>
            <MainNavigation active='settings' />
            <Header as='h1'>{'Settings'}</Header>
            <p>{'To be continued...'}</p>
        </Grid.Column>
    </Grid>
);

export default Settings;