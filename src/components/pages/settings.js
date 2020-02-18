import React from 'react';
import {Grid, Header} from 'semantic-ui-react';

import Navigation from '../features/navigation';
import Shares from '../features/settings/shares';

export const Settings = () => (
    <>
        <Navigation active='settings' />
        <Grid centered columns={1} container>
            <Grid.Column computer='10' mobile='16'>
                <Header as='h1'>{'Settings'}</Header>
                <Shares />
            </Grid.Column>
        </Grid>
    </>
);

export default Settings;