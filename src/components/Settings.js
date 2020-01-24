import React from 'react';
import {Grid, Header} from 'semantic-ui-react';

import {MainNavigation} from './navigation/MainNavigation';
import Shares from './Shares';

export const Settings = () => (
    <Grid centered columns={1} container>
        <Grid.Column computer='10' mobile='16'>
            <MainNavigation active='settings' />
            <Header as='h1'>{'Settings'}</Header>
            <Shares />
        </Grid.Column>
    </Grid>
);

export default Settings;