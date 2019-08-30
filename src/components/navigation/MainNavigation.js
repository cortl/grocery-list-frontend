import React from 'react'
import SignOut from "../security/SignOut";
import NavButton from "./NavButton";
import * as PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react';

export const MainNavigation = ({ offMainPage }) => {
    return (
        <Menu secondary>
            {offMainPage && <Menu.Item position='right'>
                <NavButton id='goBackButton' location='/' text='Go Back' />
            </Menu.Item>}
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
