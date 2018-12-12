import React from "react";
import {shallow} from "enzyme";
import Chance from "chance";
import * as sinon from "sinon";
import {MainNavigation} from "../../../src/components/navigation/MainNavigation";
import NavButton from "../../../src/components/navigation/NavButton";
import {expect} from '../../utils/chai'
import {SignOut} from "../../../src/components/security/SignOut";

const sandbox = sinon.createSandbox();
const chance = new Chance();

describe('Main Navigation', () => {

    let wrapper,
        offMainPage;

    beforeEach(() => {
        offMainPage = false;

        whenComponentIsRendered();
    });

    const whenComponentIsRendered = () => {
        wrapper = shallow(<MainNavigation
            offMainPage={offMainPage}
        />);
    };

    it('should render a nav bar', () => {
        expect(wrapper.find('ul')).to.have.className('nav justify-content-end');
    });

    describe('Go Back', () => {
        it('should not have a link for Go Back if on main page', () => {
            offMainPage = false;
            whenComponentIsRendered();

            expect(wrapper.find('#goBackButton').at(1)).to.not.be.present;

        });

        it('should have a link for Settings if on main page', () => {
            offMainPage = true;
            whenComponentIsRendered();

            expect(wrapper.find('li').at(0)).to.have.className('nav-item');
            expect(wrapper.find('#goBackButton')).to.have.prop('location', '/');
            expect(wrapper.find('#goBackButton')).to.have.prop('text', 'Go Back');
        });
    });

    describe('Settings', () => {
        it('should have a link for Settings if on main page', () => {
            offMainPage = false;
            whenComponentIsRendered();

            expect(wrapper.find('li').at(0)).to.have.className('nav-item');
            expect(wrapper.find(NavButton)).to.have.prop('location', '/settings');
            expect(wrapper.find(NavButton)).to.have.prop('text', 'Settings');
        });

        it('should have a link for Settings if on main page', () => {
            offMainPage = true;
            whenComponentIsRendered();

            expect(wrapper.find('#settingsButton').at(1)).to.not.be.present;
        });
    });


    it('should have a link for SignOut', () => {
        expect(wrapper.find('li').at(1)).to.have.className('nav-item');
        expect(wrapper.find(SignOut)).to.be.present;
    })
});
