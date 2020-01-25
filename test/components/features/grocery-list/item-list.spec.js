import {expect} from '../../../chai';
import {shallow} from 'enzyme/build';
import React from 'react';
import Chance from 'chance';
import {Loader, Card} from 'semantic-ui-react';

import {ItemList} from '../../../../src/components/features/grocery-list/item-list';
import Item from '../../../../src/components/features/grocery-list/item';
import {CATEGORIES} from '../../../../src/constants/categories';

const chance = new Chance();

describe('Item List', () => {

    const buildItem = () => ({
        id: chance.string(),
        name: chance.word(),
        userId: chance.string(),
        categoryId: chance.guid(),
        ...CATEGORIES[chance.pickone(Object.keys(CATEGORIES))]
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

        const byCategory = category => item => item.category === category;

        beforeEach(() => {
            givenProps.items = chance.n(buildItem, chance.d10());

            categories = Array.from(new Set(givenProps.items.map(item => item.category)));
            categories = categories.sort((catA, catB) => CATEGORIES[catA].sortOrder - CATEGORIES[catB].sortOrder);

            whenComponentIsRendered();
        });

        it('should have a card for each category', () => {
            categories.forEach((category, index) => {
                const card = wrapper.find(Card).at(index);
                expect(card).to.have.prop('fluid', true);
                expect(card.childAt(0)).to.have.prop('header', `${category} ${CATEGORIES[category].symbol}`);
            });
        });

        it('should have items in each category', () => {
            categories.forEach((category, listIndex) => {
                const items = givenProps.items.filter(byCategory(category.category));
                const card = wrapper.find(Card).at(listIndex);
                items.forEach((item, index) => {
                    expect(card.find(Item).at(index)).to.have.prop('category', item.category);
                    expect(card.find(Item).at(index)).to.have.prop('itemId', item.id);
                    expect(card.find(Item).at(index)).to.have.prop('text', item.name);
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
