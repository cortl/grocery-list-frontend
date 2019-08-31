import {shallow} from 'enzyme/build';
import React from 'react';
import {expect} from '../utils/chai';
import Chance from 'chance';
import {ItemActions, mapDispatchToProps} from '../../src/components/items/ItemActions';
import * as sinon from 'sinon';
import * as Actions from '../../src/actions';
import {CATEGORIES} from '../../src/constants/categories';
import {Menu, Dropdown, Loader} from 'semantic-ui-react';

const chance = new Chance();
const sandbox = sinon.createSandbox();

describe('Item Actions', () => {

    let wrapper,
        givenProps;

    const whenComponentIsRendered = () => {
        wrapper = shallow(<ItemActions
            {...givenProps}
        />);
    };

    beforeEach(() => {
        givenProps = {
            itemId: chance.guid(),
            categoryId: chance.pickone([chance.guid(), '']),
            name: chance.string(),
            category: {
                associationId: chance.guid(),
                categoryId: chance.string()
            },
            userId: chance.guid(),
            changeCategory: sandbox.stub(),
            removeItem: sandbox.spy()
        };

        whenComponentIsRendered();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should render a menu', () => {
        expect(wrapper).to.have.type(Menu);
        expect(wrapper).to.have.prop('secondary', true);
        expect(wrapper).to.have.prop('icon', true);
        expect(wrapper).to.have.prop('floated', 'right');
    });

    it('should render a trash button', () => {
        expect(wrapper.find(Menu.Item)).to.have.prop('icon', 'trash');
    });

    describe('when trash button is clicked', () => {
        beforeEach(() => {
            wrapper.find(Menu.Item).simulate('click');
        });

        it('should call the remove item action', () => {
            expect(givenProps.removeItem).to.have.been.calledOnceWithExactly(givenProps.itemId);
        });
    });

    describe('when a category id is given', () => {
        beforeEach(() => {
            givenProps.categoryId = chance.guid();
            whenComponentIsRendered();
        });

        it('should not have a loader', () => {
            expect(wrapper.find(Loader)).to.not.exist;
        });

        it('should have a dropdown', () => {
            expect(wrapper.find(Dropdown)).to.have.prop('button', true);
            expect(wrapper.find(Dropdown)).to.have.prop('item', true);
            expect(wrapper.find(Dropdown)).to.have.prop('icon', 'tag');
            expect(wrapper.find(Dropdown)).to.have.prop('compact', true);
        });

        it('should have a dropdown menu', () => {
            expect(wrapper.find(Dropdown.Menu)).to.be.present;

            Object.keys(CATEGORIES).forEach((key, index) => {
                expect(wrapper.find(Dropdown.Item).at(index)).to.have.prop('text', `${CATEGORIES[key].symbol} ${CATEGORIES[key].category}`);
            });
        });

        describe('when one of the categories is picked', () => {
            let category,
                index,
                categoryChange;

            beforeEach(() => {
                categoryChange = sandbox.spy();
                givenProps.changeCategory.returns(categoryChange);
                
                const pickedId = chance.pickone(Object.keys(CATEGORIES));
                category = CATEGORIES[pickedId];
                index = Object.keys(CATEGORIES).findIndex((id) => id === pickedId);

                whenComponentIsRendered();

                wrapper.find(Dropdown.Item).at(index).simulate('click');
            });

            it('should call the change category', () => {
                expect(givenProps.changeCategory).to.have.been.calledOnceWithExactly(givenProps.categoryId, givenProps.userId, givenProps.name);
                expect(categoryChange).to.have.been.calledOnceWithExactly(category.category);
            });
        });
    });

    describe('when a category id is not given', () => {
        beforeEach(() => {
            givenProps.categoryId = '';
            whenComponentIsRendered();
        });

        it('should have a loader', () => {
            expect(wrapper.find(Loader)).to.have.prop('active', true);
        });

        it('should not have a category dropdown', () => {
            expect(wrapper.find(Dropdown)).to.not.be.present;
        });
    });

    describe('Redux', () => {
        let dispatchSpy,
            id,
            userId,
            category,
            name,
            actualProps;

        beforeEach(() => {
            id = chance.guid();
            userId = chance.guid();
            name = chance.string();
            category = chance.string();
            sandbox.stub(Actions, 'removeItem');
            sandbox.stub(Actions, 'changeCategory');
            dispatchSpy = sandbox.spy();

            actualProps = mapDispatchToProps(dispatchSpy);
        });

        afterEach(() => {
            sandbox.restore();
        });
        it('should map removeItem', () => {
            actualProps.removeItem(id);
            expect(dispatchSpy).to.have.been.calledWith(Actions.removeItem());
        });

        it('should map changeCategory', () => {
            actualProps.changeCategory(id, userId, name)(category);
            expect(dispatchSpy).to.have.been.calledWith(Actions.changeCategory());
        });
    });
});
