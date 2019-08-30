import {shallow} from "enzyme/build";
import React from "react";
import {expect} from "../utils/chai";
import Chance from "chance";
import {ItemList} from "../../src/components/ItemList";
import GroceryItem from "../../src/components/items/GroceryItem";
import {NONE} from "../../src/constants/categories";
import { List } from "semantic-ui-react";

const chance = new Chance();

describe('Item List', () => {

    const buildItem = () => ({
        id: chance.string(),
        name: chance.word(),
        userId: chance.string(),
        category: NONE
    });

    const whenComponentIsRendered = () => {
        wrapper = shallow(<ItemList
            items={items}
        />)
    };

    let wrapper,
        items = chance.n(buildItem, chance.d10());

    beforeEach(() => {
        whenComponentIsRendered();
    });

    it('should have a list', () => {
        expect(wrapper).to.have.type(List);
        expect(wrapper).to.have.prop('divided', true);
        expect(wrapper).to.have.prop('relaxed', true);
        expect(wrapper).to.have.prop('fluid', true);
    });

    it('should have an Item for every item', () => {
        items.forEach((item, index) => {
            expect(wrapper.find(GroceryItem).at(index).key()).to.be.equal(item.id.toString());
            expect(wrapper.find(GroceryItem).at(index).props().itemId).to.be.equal(item.id);
            expect(wrapper.find(GroceryItem).at(index).props().text).to.be.equal(item.name);
            expect(wrapper.find(GroceryItem).at(index).props().category).to.be.equal(item.category);
        })
    });

    it('should sort items based off of category sort order', () => {
        items = [{
            ...buildItem(),
            category: {
                sortOrder: 1
            }
        }, {
            ...buildItem(),
            category: {
                sortOrder: 0
            }
        }];
        const originalItems = [items[0], items[1]];

        whenComponentIsRendered();

        expect(wrapper.find(GroceryItem).at(0).props().itemId).to.be.equal(originalItems[1].id);
        expect(wrapper.find(GroceryItem).at(1).props().itemId).to.be.equal(originalItems[0].id);
    });

    it('should sort items based on name after sorting by category', () => {
        items = [{
            ...buildItem(),
            name: 'b',
            category: {
                sortOrder: 1
            }
        }, {
            ...buildItem(),
            name: 'a',
            category: {
                sortOrder: 1
            }
        }];
        const originalItems = [items[0], items[1]];

        whenComponentIsRendered();

        expect(wrapper.find(GroceryItem).at(0).props().itemId).to.be.equal(originalItems[1].id);
        expect(wrapper.find(GroceryItem).at(1).props().itemId).to.be.equal(originalItems[0].id);
    });
});
