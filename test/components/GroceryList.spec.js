import { expect } from '../utils/chai'
import React from "react";
import { shallow } from "enzyme";
import AddItem from "../../src/components/AddItem";
import { GroceryList } from "../../src/components/GroceryList";
import Chance from "chance";
import ItemList from "../../src/enhancers/FireStoreItemList";
import { Grid, Loader, Container } from 'semantic-ui-react';
import { MainNavigation } from '../../src/components/navigation/MainNavigation';

const chance = new Chance();

describe('Grocery List', () => {

    let wrapper,
        givenProps;

    const whenComponentIsRendered = () => {
        wrapper = shallow(<GroceryList {...givenProps} />)
    };

    beforeEach(() => {
        givenProps = {
            auth: {
                uid: chance.pickone([chance.guid(), ''])
            }
        }
        whenComponentIsRendered();
    });

    it('should render in a container', () => {
        expect(wrapper).to.have.type(Container);
    })

    it('should have a navigation', () => {
        expect(wrapper.childAt(0)).to.have.type(MainNavigation);
    });

    describe('when auth is not loaded', () => {
        beforeEach(() => {
            givenProps.auth.uid = '';
            whenComponentIsRendered();
        });

        it('should have a loader', () => {
            expect(wrapper.find(Loader)).to.have.prop('active', true);
        });
    });

    describe('when auth is loaded', () => {
        beforeEach(() => {
            givenProps.auth.uid = chance.string();
            whenComponentIsRendered();
        });

        it('should not have a loader', () => {
            expect(wrapper.find(Loader)).to.not.be.present;
        });

        it('should render a grocery list', () => {
            expect(wrapper.find(Grid)).to.have.prop('centered', true);
            expect(wrapper.find(Grid)).to.have.prop('columns', 1);

            expect(wrapper.find(Grid.Column)).to.have.prop('computer', '8');
            expect(wrapper.find(Grid.Column)).to.have.prop('mobile', '16');
        });

        it('should have an item list', () => {
            expect(wrapper.find(ItemList)).to.have.prop('auth', givenProps.auth);
        });

        it('should have an add item', () => {
            expect(wrapper.find(AddItem)).to.be.present;
        });
    });
});
