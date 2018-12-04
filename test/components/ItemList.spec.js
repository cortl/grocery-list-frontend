import {shallow} from "enzyme/build";
import React from "react";
import {expect} from "../utils/chai";
import Chance from "chance";
import {ItemList, mapStateToProps} from "../../src/components/ItemList";
import Item from "../../src/components/Item";
import {MEAT, NONE, PRODUCE} from "../../src/constants/categories";

const chance = new Chance();

describe('Item List', () => {

    const buildItem = () => ({
        id: chance.string(),
        name: chance.string(),
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

        expect(wrapper.find(Item).at(0).props().id).to.be.equal(originalItems[1].id);
        expect(wrapper.find(Item).at(1).props().id).to.be.equal(originalItems[0].id);
    });

    describe('Redux', () => {
        let associations,
            auth,
            userId = chance.string(),
            state;

        const buildItemWithUserId = (uid) => ({
            ...buildItem(),
            userId: uid
        });

        const whenStateIsCreated = () => {
            state = {
                firestore: {
                    data: {
                        items,
                        associations
                    },
                    ordered: {
                        items,
                        associations
                    }
                },
                firebase: {
                    auth
                }
            };
        };

        beforeEach(() => {
            items = [buildItemWithUserId(userId), buildItemWithUserId(userId)];
            associations = [{
                category: 'Produce',
                name: chance.string(),
                userId: userId
            }];
            auth = {uid: userId};
            whenStateIsCreated();
        });

        it('should map state to props', () => {
            const actualProps = mapStateToProps(state);

            expect(actualProps.items).to.deep.equal(state.firestore.data.items);
        });

        it('should put together matching category and item', () => {
            items = [buildItemWithUserId(userId)];
            associations = [{
                category: 'Produce',
                name: items[0].name,
                id: chance.string(),
                userId
            }];

            whenStateIsCreated();

            const actualProps = mapStateToProps(state);

            expect(actualProps.items[0].category).to.deep.equal({...PRODUCE, associationId: associations[0].id});
        });

        it('should use none if it is unable to match category and name', () => {
            items = [buildItemWithUserId(userId)];
            associations = [{
                category: 'Produce',
                name: chance.string(),
                userId
            }];

            whenStateIsCreated();

            const actualProps = mapStateToProps(state);

            expect(actualProps.items[0].category).to.be.equal(NONE);
        });

        it('should map multiple items and categories', () => {
            items = [buildItemWithUserId(userId), buildItemWithUserId(userId)];
            associations = [{
                category: 'Produce',
                name: items[0].name,
                id: chance.string(),
                userId
            }, {
                category: 'Meat',
                name: items[1].name,
                id: chance.string(),
                userId
            }];

            whenStateIsCreated();

            const actualProps = mapStateToProps(state);

            expect(actualProps.items[0].category).to.deep.equal({...PRODUCE, associationId: associations[0].id});
            expect(actualProps.items[1].category).to.deep.equal({...MEAT, associationId: associations[1].id});
        });

        it('should only return items that belong to the logged in user', () => {
            items = [buildItemWithUserId(userId), buildItemWithUserId(chance.string())];

            whenStateIsCreated();
            const actualProps = mapStateToProps(state);

            expect(actualProps.items).to.have.length(1);
            expect(actualProps.items[0]).to.deep.equal(items[0]);
        });

        it('should only build items with associations that belong to the logged in user', () => {
            associations = [{
                category: 'Produce',
                name: items[0].name,
                id: chance.string(),
                userId
            }, {
                category: 'Produce',
                name: items[1].name,
                id: chance.string(),
                userId: chance.string()
            }];

            whenStateIsCreated();
            const actualProps = mapStateToProps(state);

            expect(actualProps.items[0].category).to.deep.equal({...PRODUCE, associationId: associations[0].id});
            expect(actualProps.items[1].category).to.deep.equal({...NONE});
        });
    });

});
