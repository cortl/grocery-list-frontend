import { expect } from '../utils/chai'
import React from "react";
import { shallow } from "enzyme";
import { AddItem } from "../../src/components/AddItem";
import { GroceryList } from "../../src/components/GroceryList";
import Chance from "chance";
import ItemList from "../../src/components/enhancers/FireStoreItemList";
import { Spinner } from "../../src/components/Spinner";
import * as sinon from "sinon";
import { MainNavigation } from "../../src/components/navigation/MainNavigation";

const chance = new Chance();
const sandbox = sinon.createSandbox();
describe('Grocery List', () => {

    let wrapper,
        auth = {},
        profile = {
            lists: [chance.word()]
        },
        loadUserSpy = sandbox.spy();

    const whenComponentIsRendered = () => {
        wrapper = shallow(<GroceryList
            loadUser={loadUserSpy}
            profile={profile}
            auth={auth} />)
    };

    beforeEach(() => {
        whenComponentIsRendered();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should render in a div', () => {
        expect(wrapper).to.have.type('div');
    });

    it('should have a main navigation', () => {
        expect(wrapper.find(MainNavigation)).to.be.present;
    });

    it('should have an item list if uid exists', () => {
        auth = {
            uid: chance.string()
        };

        whenComponentIsRendered();

        expect(wrapper.find(ItemList)).to.be.present;
        expect(wrapper.find(ItemList)).to.have.prop('auth', auth);
        expect(wrapper.find(Spinner)).to.not.be.present;
    });

    it('should have a spinner if uid does not exist', () => {
        auth = {};
        whenComponentIsRendered();

        expect(wrapper.find(ItemList)).to.not.be.present;
        expect(wrapper.find(Spinner)).to.be.present;
    });

    it('should have an add item', () => {
        expect(wrapper.find(AddItem)).to.be.present;
    });

});
