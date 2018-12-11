import React from "react";
import {shallow} from "enzyme";
import Chance from "chance";
import * as sinon from "sinon";
import {Settings} from "../../../src/components/settings/Settings";
import Header from "../../../src/components/Header";
import {expect} from '../../utils/chai';
import {MainNavigation} from "../../../src/components/navigation/MainNavigation";

const sandbox = sinon.createSandbox();
const chance = new Chance();

describe('Settings', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Settings/>);
    });

    it('should have a main navigation', () => {
       expect(wrapper.find(MainNavigation)).to.have.prop('offMainPage', true);
    });

    it('should have a Header', () => {
        expect(wrapper.find(Header)).to.have.prop('text', 'Settings');
    })
});
