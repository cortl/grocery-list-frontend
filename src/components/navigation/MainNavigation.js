import React from 'react'
import SignOut from "../security/SignOut";
import * as PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react';

export const MainNavigation = () => {
    return (
        <Menu secondary>
            <SignOut />
        </Menu>
    )
};

MainNavigation.defaultProps = {
    offMainPage: false
};

MainNavigation.propTypes = {
    offMainPage: PropTypes.bool
};
