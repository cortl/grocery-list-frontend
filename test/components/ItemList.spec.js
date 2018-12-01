import {shallow} from "enzyme/build";
import React from "react";
import {expect} from "../utils/chai";
import Chance from "chance";
import * as sinon from "sinon";
import {ItemList, mapStateToProps, sortByCategory} from "../../src/components/ItemList";
import Item from "../../src/components/Item";

const chance = new Chance();
const sandbox = sinon.createSandbox();

describe('Item List', () => {

    const buildItem = (sortOrder) => () => ({
        id: chance.natural(),
        text: chance.string(),
        category: {
            name: chance.string(),
            sortOrder: sortOrder
        }
    });

    const whenComponentIsRendered = () => {
        wrapper = shallow(<ItemList
            items={items}
        />)
    };

    let wrapper,
        items = chance.n(buildItem(0), chance.d10());

    beforeEach(() => {
        whenComponentIsRendered();
    });

    it('should have a list', () => {
        expect(wrapper).to.have.type('ul');
        expect(wrapper).to.have.className('list-group');
    });

    it('should have an Item for every item', () => {
        items.forEach((item, index) => {
            expect(wrapper.find(Item).at(index).key()).to.be.equal(item.id.toString());
            expect(wrapper.find(Item).at(index).props().id).to.be.equal(item.id);
            expect(wrapper.find(Item).at(index).props().text).to.be.equal( item.text);
            expect(wrapper.find(Item).at(index).props().category).to.be.equal(item.category);
        })
    });

    it('should sort items based off of category sort order', () => {
        items = [buildItem(1)(), buildItem(0)()];
        const originalItems = [items[0], items[1]];

        whenComponentIsRendered();

        expect(wrapper.find(Item).at(0).props().id).to.be.equal(originalItems[1].id);
        expect(wrapper.find(Item).at(1).props().id).to.be.equal(originalItems[0].id);
    });

    describe('Redux', () => {
        it('should map state to props', () => {
            const state = {
                items
            };

            const actualProps = mapStateToProps(state);

            expect(actualProps.items).to.be.equal(state.items);
        })
    });

});
