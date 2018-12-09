import {expect} from "../../utils/chai";
import {MEAT, NONE, PRODUCE} from "../../../src/constants/categories";
import Chance from "chance";
import {mapStateToProps} from "../../../src/components/enhancers/FireStoreItemList";

const chance = new Chance();

describe('Firestore Enhanced Item List', () => {
    let associations,
        auth,
        items,
        userId = chance.string(),
        id1,
        id2,
        state;

    const buildItem = () => ({
        id: chance.string(),
        name: chance.word(),
        listId: chance.string(),
        category: NONE
    });

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
        items = {};
        id1 = chance.word();
        id2 = chance.word();
        items[id1] = buildItemWithUserId(userId);
        items[id2] = buildItemWithUserId(userId);
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

        expect(actualProps.items).to.deep.equal([{
            ...items[id1],
            id: id1
        }, {
            ...items[id2],
            id: id2
        }]);
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

    it('should match uppercase categories', () => {
        items = [buildItemWithUserId(userId)];
        associations = [{
            category: 'Produce',
            name: items[0].name.toUpperCase(),
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
});
