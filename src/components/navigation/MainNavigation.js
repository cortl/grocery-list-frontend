import React from 'react';
import SignOut from '../security/SignOut';
import {Menu} from 'semantic-ui-react';

export const MainNavigation = () => {
    return (
        <Menu secondary>
            <SignOut />
        </Menu>
    );
};
