import React from 'react'
import SignOut from "../security/SignOut";
import NavButton from "./NavButton";
import * as PropTypes from 'prop-types'

export const MainNavigation = ({offMainPage}) => {
    return (
        <ul className="nav justify-content-end">
            {offMainPage && <li className="nav-item">
                <NavButton id='goBackButton' location='/' text='Go Back'/>
            </li>}
            {!offMainPage && <li className="nav-item">
                <NavButton id='settingsButton' location='/settings' text='Settings'/>
            </li>}
            <li className="nav-item">
                <SignOut/>
            </li>
        </ul>
    )
};

MainNavigation.defaultProps = {
    offMainPage: false
};

MainNavigation.propTypes = {
    offMainPage: PropTypes.bool
};
