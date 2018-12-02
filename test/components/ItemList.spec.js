import {shallow} from "enzyme/build";
import React from "react";
import {expect} from "../utils/chai";
import Chance from "chance";
import {ItemList, mapStateToProps} from "../../src/components/ItemList";
import Item from "../../src/components/Item";
import {MEAT, NONE, PRODUCE} from "../../src/constants/categories";

const chance = new Chance();

describe('Item List', () => {

    const buildItem = (sortOrder) => () => ({
        id: chance.natural(),
        name: chance.string(),
        category: {
            ...NONE,
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
            expect(wrapper.find(Item).at(index).props().text).to.be.equal(item.name);
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
        let associations,
            state;

        beforeEach(() => {
            items = [buildItem(-1)(), buildItem(-1)()];
            associations = [{
                category: 'Produce',
                name: chance.string()
            }];
            state = {firestore: {ordered: {items, associations}}};
        });

        it('should map state to props', () => {
            const actualProps = mapStateToProps(state);

            expect(actualProps.items).to.deep.equal(state.firestore.ordered.items);
        });

        it('should put together matching category and item', () => {
            items = [buildItem(0)()];
            associations = [{
                category: 'Produce',
                name: items[0].name
            }];

            state = {firestore: {ordered: {items, associations}}};

            const actualProps = mapStateToProps(state);

            expect(actualProps.items[0].category).to.be.equal(PRODUCE);
        });

        it('should use none if it is unable to match category and name', () => {
            items = [buildItem(0)()];
            associations = [{
                category: 'Produce',
                name: chance.string()
            }];

            state = {firestore: {ordered: {items, associations}}};

            const actualProps = mapStateToProps(state);

            expect(actualProps.items[0].category).to.be.equal(NONE);
        });

        it('should map multiple items and categories', () => {
            items = [buildItem(0)(), buildItem(0)()];
            associations = [{
                category: 'Produce',
                name: items[0].name
            }, {
                category: 'Meat',
                name: items[1].name
            }];

            state = {firestore: {ordered: {items, associations}}};

            const actualProps = mapStateToProps(state);

            expect(actualProps.items[0].category).to.be.equal(PRODUCE);
            expect(actualProps.items[1].category).to.be.equal(MEAT);
        })
    });

});
