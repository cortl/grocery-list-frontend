import {expect} from '../utils/chai'
import React from "react";
import {shallow} from "enzyme";
import {AddItem} from "../../src/components/AddItem";
import Header from "../../src/components/Header";
import {GroceryList} from "../../src/components/GroceryList";
import SignOut from "../../src/components/security/SignOut";
import Chance from "chance";
import ItemList from "../../src/components/enhancers/FireStoreItemList";
import {Spinner} from "../../src/components/Spinner";
import * as sinon from "sinon";

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
            auth={auth}/>)
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

    it('should have a sign out', () => {
        expect(wrapper.find(SignOut)).to.be.present;
    });

    it('should have a header', () => {
        expect(wrapper.find(Header)).to.be.present;
        expect(wrapper.find(Header)).to.have.prop('text', 'Grocery List');
    });

    it('should have an item list if uid exists', () => {
        auth = {
            uid: chance.string()
        };

        whenComponentIsRendered();

        expect(wrapper.find(ItemList)).to.be.present;
        expect(wrapper.find(ItemList)).to.have.prop('listIds', profile.lists);
        expect(wrapper.find(ItemList)).to.have.prop('auth', auth.uid);
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
