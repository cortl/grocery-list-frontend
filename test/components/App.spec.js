import {expect} from '../utils/chai'
import {AddItem} from "../../src/components/AddItem";
import React from "react";
import {shallow} from "enzyme";
import App from "../../src/components/App";
import Header from "../../src/components/Header";
import ItemList from "../../src/components/ItemList";

describe('App', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App/>)
    });

    it('should render in a container', () => {
        expect(wrapper).to.have.className('container');
    });

    it('should have a Header', () => {
        expect(wrapper.find(Header)).to.be.present;
    });

    it('should have an ItemList', () => {
        expect(wrapper.find(ItemList)).to.be.present;
    });

    it('should have an AddItem', () => {
        expect(wrapper.find(AddItem)).to.be.present;
    })

});
