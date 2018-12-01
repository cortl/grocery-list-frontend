import Chance from 'chance';
import {expect} from "chai";
import sinon from 'sinon'
import {AddItem} from "../../src/components/AddItem";
import React from "react";
import {shallow} from "enzyme";

const chance = new Chance();
const sandbox = sinon.sandbox.create();

describe('Add Item', () => {

    let wrapper,
        addItemSpy;

    beforeEach(() => {
        addItemSpy = sandbox.spy();
        wrapper = shallow(<AddItem
            addItem={addItemSpy}
        />)
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should render in a div', () => {
        expect(wrapper).to.have.type('div');
        expect(wrapper).to.have.className('input-group mb-3 mt-3');
    });

    describe('Redux', () => {

    });
});
