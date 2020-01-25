import React from 'react';
import {Menu, Responsive, Dropdown} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import SignOut from './sign-out';

export class Navigation extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    };

    navigateTo = url => () => this.context.router.history.push(url)

    leftLinks = [
        {
            text: 'Home',
            icon: 'home',
            active: this.props.active === 'home',
            onClick: this.navigateTo('/')
        }
    ];

    rightLinks = [
        {
            text: 'Settings',
            icon: 'cog',
            active: this.props.active === 'settings',
            onClick: this.navigateTo('/settings')
        }
    ]

    render = () => {
        return (
            <>
                <Responsive as={Menu} minWidth={768} secondary>
                    <Menu.Menu position='left'>
                        {
                            this.leftLinks.map((page, i) => (
                                <Menu.Item
                                    active={page.active}
                                    content={page.text}
                                    icon={page.icon}
                                    key={`${i}menu`}
                                    onClick={page.onClick}
                                />
                            ))
                        }
                    </Menu.Menu>
                    <Menu.Menu position='right'>
                        {
                            this.rightLinks.map((page, i) => (
                                <Menu.Item
                                    active={page.active}
                                    content={page.text}
                                    icon={page.icon}
                                    key={`${i}menu`}
                                    onClick={page.onClick}
                                />
                            ))
                        }
                        <SignOut />
                    </Menu.Menu>
                </Responsive>
                <Responsive as={Menu} maxWidth={767} secondary>
                    <Menu.Menu position='right'>
                        <Dropdown icon='bars' item simple>
                            <Dropdown.Menu>
                                {
                                    this.leftLinks.concat(this.rightLinks).map((page, i) => (
                                        <Dropdown.Item
                                            active={page.active}
                                            content={page.text}
                                            icon={page.icon}
                                            key={`${i}mobile`}
                                            onClick={page.onClick}
                                        />
                                    ))
                                }
                                <SignOut />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Responsive>
            </>
        );
    }
}

Navigation.propTypes = {
    active: PropTypes.string
};
