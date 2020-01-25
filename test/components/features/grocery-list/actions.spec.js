import { expect } from '../../../chai';
import { shallow } from 'enzyme/build';
import React from 'react';
import Chance from 'chance';
import * as sinon from 'sinon';
import { Menu, Dropdown } from 'semantic-ui-react';

import { Actions, mapDispatchToProps } from '../../../../src/components/features/grocery-list/actions';
import * as ReduxActions from '../../../../src/actions';
import { CATEGORIES } from '../../../../src/constants/categories';

const chance = new Chance();
const sandbox = sinon.createSandbox();

describe('Item Actions', () => {

    let wrapper,
        givenProps;

    const whenComponentIsRendered = () => {
        wrapper = shallow(<Actions
            {...givenProps}
        />);
    };

    beforeEach(() => {
        givenProps = {
            itemId: chance.guid(),
            categoryId: chance.pickone([chance.guid(), '']),
            name: chance.string(),
            userId: chance.guid(),
            changeAssociation: sandbox.stub().returns(sandbox.stub()),
            newAssociation: sandbox.stub().returns(sandbox.stub()),
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
        let index,
            category;

        const pickRandomCategory = () => {
            const pickedId = chance.pickone(Object.keys(CATEGORIES));
            category = CATEGORIES[pickedId];
            index = Object.keys(CATEGORIES).findIndex((id) => id === pickedId);
        };

        beforeEach(() => {
            pickRandomCategory();
        });

        describe('when a category id is given', () => {
            beforeEach(() => {
                givenProps.categoryId = chance.guid();
                whenComponentIsRendered();
                wrapper.find(Dropdown.Item).at(index).simulate('click');
            });

            it('should call the change category', () => {
                expect(givenProps.changeAssociation).to.have.been.calledOnceWithExactly(givenProps.categoryId, givenProps.userId, givenProps.name);
                expect(givenProps.changeAssociation()).to.have.been.calledWith(category.category);
            });
        });

        describe('when a category id is not given', () => {
            beforeEach(() => {
                givenProps.categoryId = '';
                whenComponentIsRendered();

                wrapper.find(Dropdown.Item).at(index).simulate('click');
            });

            it('should call the change category', () => {
                expect(givenProps.newAssociation).to.have.been.calledOnceWithExactly(givenProps.userId, givenProps.name);
                expect(givenProps.newAssociation()).to.have.been.calledWith(category.category);

            });
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
            sandbox.stub(ReduxActions, 'removeItem');
            sandbox.stub(ReduxActions, 'changeAssociation');
            sandbox.stub(ReduxActions, 'newAssociation');
            dispatchSpy = sandbox.spy();

            actualProps = mapDispatchToProps(dispatchSpy);
        });

        afterEach(() => {
            sandbox.restore();
        });
        it('should map removeItem', () => {
            actualProps.removeItem(id);
            expect(dispatchSpy).to.have.been.calledWith(ReduxActions.removeItem());
        });

        it('should map newAssociation', () => {
            actualProps.removeItem(userId, name);
            expect(dispatchSpy).to.have.been.calledWith(ReduxActions.newAssociation());
        });

        it('should map changeAssocation', () => {
            actualProps.changeAssociation(id, userId, name)(category);
            expect(dispatchSpy).to.have.been.calledWith(ReduxActions.changeAssociation());
        });
    });
});
