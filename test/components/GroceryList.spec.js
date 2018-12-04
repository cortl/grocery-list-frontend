import {expect} from '../utils/chai'
import React from "react";
import {shallow} from "enzyme";
import {AddItem} from "../../src/components/AddItem";
import {ItemList} from "../../src/components/ItemList";
import Header from "../../src/components/Header";
import GroceryList from "../../src/components/GroceryList";
import SignOut from "../../src/components/security/SignOut";

describe('Grocery List', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<GroceryList/>)
    });

    it('should render in a div', () => {
        expect(wrapper).to.have.type('div');
    });

    it('should have a sign out', () => {
        expect(wrapper.find(SignOut)).to.be.present;
    });

    it('should have a header', () => {
        expect(wrapper.find(Header)).to.be.present;
    });

    it('should have an item list', () => {
        expect(wrapper.find(ItemList)).to.be.present;
    });

    it('should have an add item', () => {
        expect(wrapper.find(AddItem)).to.be.present;
    });

});
