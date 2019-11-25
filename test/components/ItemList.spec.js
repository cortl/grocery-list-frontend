import {shallow} from 'enzyme/build';
import React from 'react';
import {expect} from '../utils/chai';
import Chance from 'chance';
import {ItemList} from '../../src/components/ItemList';
import GroceryItem from '../../src/components/items/GroceryItem';
import {CATEGORIES} from '../../src/constants/categories';
import {Loader, Header, Grid, Divider} from 'semantic-ui-react';

const chance = new Chance();

describe('Item List', () => {

    const buildItem = () => ({
        id: chance.string(),
        name: chance.word(),
        userId: chance.string(),
        category: CATEGORIES[chance.pickone(Object.keys(CATEGORIES))]
    });

    let wrapper,
        givenProps;

    const whenComponentIsRendered = () => {
        wrapper = shallow(<ItemList {...givenProps} />);
    };

    beforeEach(() => {
        givenProps = {
            items: []
        };

        whenComponentIsRendered();
    });

    describe('when items exist', () => {
        let categories;

        const byCategory = category => item => item.category.category === category;

        beforeEach(() => {
            givenProps.items = chance.n(buildItem, chance.d10());

            categories = Array.from(new Set(givenProps.items.map(item => item.category)));
            categories = categories.sort((catA, catB) => catA.sortOrder - catB.sortOrder);

            whenComponentIsRendered();
        });

        it('should have a grid for each category', () => {
            categories.forEach((category, index) => {
                expect(wrapper.find(Header).at(index)).to.have.prop('as', 'h3');
                expect(wrapper.find(Header).at(index).childAt(0)).to.have.text(`${category.category} ${category.symbol}`);
                expect(wrapper.find(Grid).at(index)).to.have.prop('columns', 2);
            });
        });

        it('should have items in each category', () => {
            categories.forEach((category, listIndex) => {
                const items = givenProps.items.filter(byCategory(category.category));
                const grid = wrapper.find(Grid).at(listIndex);
                items.forEach((item, index) => {
                    expect(grid.find(GroceryItem).at(index)).to.have.prop('category', item.category);
                    expect(grid.find(GroceryItem).at(index)).to.have.prop('itemId', item.id);
                    expect(grid.find(GroceryItem).at(index)).to.have.prop('text', item.name);
                    expect(grid.find(Divider).at(index)).to.have.prop('fitted', true);
                });
            });
        });
    });

    describe('when items do not exist', () => {
        beforeEach(() => {
            givenProps.items = undefined;
            whenComponentIsRendered();
        });

        it('should have a loader', () => {
            expect(wrapper).to.have.type(Loader);
        });
    });
});
