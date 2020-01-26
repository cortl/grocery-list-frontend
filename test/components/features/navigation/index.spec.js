import {expect} from '../../../chai';
import React from 'react';
import {shallow} from 'enzyme';
import {Menu, Responsive, Dropdown} from 'semantic-ui-react';

import SignOut from '../../../../src/components/features/navigation/sign-out';
import {Navigation} from '../../../../src/components/features/navigation';

describe('Navigation', () => {

    let wrapper,
        desktopMenu,
        mobileMenu;

    const whenComponentIsRendered = () => {
        wrapper = shallow(<Navigation />);

        desktopMenu = wrapper.childAt(0);
        mobileMenu = wrapper.childAt(1);
    };

    beforeEach(() => {
        whenComponentIsRendered();
    });

    describe('Desktop Menu Composition', () => {
        it('should render a menu for desktop', () => {
            expect(desktopMenu).to.have.type(Responsive);
            expect(desktopMenu).to.have.prop('as', Menu);
            expect(desktopMenu).to.have.prop('minWidth', 768);
            expect(desktopMenu).to.have.prop('secondary', true);
        });

        it('should have a left hand menu', () => {
            const leftMenu = desktopMenu.childAt(0);

            expect(leftMenu).to.have.type(Menu.Menu);
            expect(leftMenu).to.have.prop('position', 'left');

            expect(leftMenu.childAt(0)).to.have.type(Menu.Item);
            expect(leftMenu.childAt(0)).to.have.prop('content', 'Home');
        });

        it('should have a right hand menu', () => {
            const rightMenu = desktopMenu.childAt(1);

            expect(rightMenu).to.have.type(Menu.Menu);
            expect(rightMenu).to.have.prop('position', 'right');

            expect(rightMenu.childAt(0)).to.have.type(Menu.Item);
            expect(rightMenu.childAt(0)).to.have.prop('content', 'Settings');

            expect(rightMenu.childAt(1)).to.have.type(SignOut);
        });
    });

    describe('Mobile Menu Composition', () => {
        let menu,
            dropdown,
            dropdownMenu;

        beforeEach(() => {
            menu = mobileMenu.childAt(0);
            dropdown = menu.childAt(0);
            dropdownMenu = dropdown.childAt(0);
        });

        it('should render a menu for mobile', () => {
            expect(mobileMenu).to.have.type(Responsive);
            expect(mobileMenu).to.have.prop('as', Menu);
            expect(mobileMenu).to.have.prop('size', 'massive');
            expect(mobileMenu).to.have.prop('maxWidth', 767);
            expect(mobileMenu).to.have.prop('secondary', true);
        });

        it('should have a dropdown menu', () => {
            expect(menu).to.have.type(Menu.Menu);
            expect(menu).to.have.prop('position', 'right');

            expect(dropdown).to.have.type(Dropdown);
            expect(dropdown).to.have.prop('icon', 'bars');
            expect(dropdown).to.have.prop('item');
        });

        it('should have all links', () => {
            expect(dropdownMenu.childAt(0)).to.have.type(Dropdown.Item);
            expect(dropdownMenu.childAt(0)).to.have.prop('content', 'Home');

            expect(dropdownMenu.childAt(1)).to.have.type(Dropdown.Item);
            expect(dropdownMenu.childAt(1)).to.have.prop('content', 'Settings');

            expect(dropdownMenu.childAt(2)).to.have.type(SignOut);
        });
    });
});
