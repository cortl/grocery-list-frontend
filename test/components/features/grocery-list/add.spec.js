import {expect} from '../../../chai';
import Chance from 'chance';
import sinon from 'sinon';
import React from 'react';
import {shallow} from 'enzyme';
import {Input} from 'semantic-ui-react';

import {Add, mapDispatchToProps} from '../../../../src/components/features/grocery-list/add';
import * as Actions from '../../../../src/actions';

const chance = new Chance();
const sandbox = sinon.createSandbox();

describe('Add Item', () => {

    let wrapper,
        item,
        addItemSpy;

    beforeEach(() => {
        addItemSpy = sandbox.spy();
        item = chance.word();
        wrapper = shallow(<Add
            addItem={addItemSpy}
        />);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should be an input', () => {
        expect(wrapper).to.have.type(Input);

        expect(wrapper.props().action.content).to.be.equal('+');

        expect(wrapper).to.have.prop('fluid', true);
        expect(wrapper.props().style).to.be.eql({marginTop: '1em'});
        expect(wrapper).to.have.prop('placeholder', 'Add item...');
        expect(wrapper).to.have.prop('maxLength', 50);
    });

    describe('when an item is entered', () => {
        beforeEach(() => {
            item = chance.word();
            wrapper.simulate('change', {target: {value: item}});
        });

        describe('when enter is pressed', () => {
            beforeEach(() => {
                wrapper.simulate('keyPress', {key: 'Enter'});
            });

            it('should add the item', () => {
                expect(addItemSpy).to.have.been.calledWith(item);
            });
        });

        describe('when the add button action is clicked', () => {
            beforeEach(() => {
                wrapper.props().action.onClick();
            });

            it('should add the item', () => {
                expect(addItemSpy).to.have.been.calledWith(item);
            });
        });
    });

    describe('when an item has more than 50 characters', () => {
        beforeEach(() => {
            item = chance.string({length: 51});
            wrapper.simulate('change', {target: {value: item}});
        });

        describe('when enter is pressed', () => {
            beforeEach(() => {
                wrapper.simulate('keyPress', {key: 'Enter'});
            });

            it('should not add the item', () => {
                expect(addItemSpy).to.have.not.been.calledWith(item);
            });
        });

        describe('when the add button action is clicked', () => {
            beforeEach(() => {
                wrapper.props().action.onClick();
            });

            it('should not add the item', () => {
                expect(addItemSpy).to.have.not.been.calledWith(item);
            });
        });
    });

    describe('when no text is entered', () => {
        beforeEach(() => {
            item = '';
            wrapper.simulate('change', {target: {value: item}});
        });

        describe('when enter is pressed', () => {
            beforeEach(() => {
                wrapper.simulate('keyPress', {key: 'Enter'});
            });

            it('should not add the item', () => {
                expect(addItemSpy).to.have.not.been.calledWith(item);
            });
        });

        describe('when the add button action is clicked', () => {
            beforeEach(() => {
                wrapper.props().action.onClick();
            });

            it('should not add the item', () => {
                expect(addItemSpy).to.have.not.been.calledWith(item);
            });
        });
    });

    describe('Redux', () => {
        let dispatchSpy;

        beforeEach(() => {
            addItemSpy = sandbox.spy();
            dispatchSpy = sandbox.spy();
        });

        it('should map dispatch to props', () => {
            const actualProps = mapDispatchToProps(dispatchSpy);
            sandbox.stub(Actions, 'addItem');

            actualProps.addItem(item);

            expect(dispatchSpy).to.have.been.calledWith(Actions.addItem(item));
        });
    });
});
