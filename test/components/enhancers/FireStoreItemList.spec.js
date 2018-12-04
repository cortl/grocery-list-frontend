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
        state;

    const buildItem = () => ({
        id: chance.string(),
        name: chance.word(),
        userId: chance.string(),
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
