import Chance from 'chance';
import sinon from 'sinon'
import {expect} from '../utils/chai'
import {AddItem, mapDispatchToProps} from "../../src/components/AddItem";
import React from "react";
import {shallow} from "enzyme";
import {addItem} from "../../src/actions";

const chance = new Chance();
const sandbox = sinon.createSandbox();

describe('Add Item', () => {

    let wrapper,
        inputText = chance.string(),
        dispatchSpy,
        addItemSpy;

    beforeEach(() => {
        addItemSpy = sandbox.spy();
        dispatchSpy = sandbox.spy();
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

    describe('Input', () => {
        it('should have an input', () => {
            expect(wrapper.find('input')).to.have.prop('type', 'text');
            expect(wrapper.find('input')).to.have.className('form-control');
            expect(wrapper.find('input')).to.have.prop('placeholder', 'Apples...');
            expect(wrapper.find('input')).to.have.prop('aria-label', 'Grocery Item');
            expect(wrapper.find('input')).to.have.prop('aria-describedby', 'itemAddField');
        });

        it('should handle on enter key press', () => {
            wrapper.find('input').simulate('change', {target: {value: inputText}});
            wrapper.find('input').simulate('keyPress', {key: 'Enter'});

            expect(addItemSpy).to.have.been.calledWith(inputText);
        });

    });

    describe('Button', () => {
        it('should have a button', () => {
            expect(wrapper.find('button')).to.have.style({zIndex: 0});
            expect(wrapper.find('button')).to.have.className('btn btn-outline-secondary');
            expect(wrapper.find('button')).to.have.prop('type', 'button');
            expect(wrapper.find('button')).to.have.text('+');
        });

        it('should add item if button is clicked', () => {
            wrapper.find('input').simulate('change', {target: {value: inputText}});
            wrapper.find('button').simulate('click');

            expect(addItemSpy).to.have.been.calledWith(inputText);

        })
    });

    describe('Redux', () => {
        it('should map dispatch to props', () => {
            const actualProps = mapDispatchToProps(dispatchSpy);

            actualProps.addItem(inputText);

            expect(dispatchSpy).to.have.been.calledWith(addItem(inputText))
        });
    });
});