import Chance from 'chance';
import {expect} from "chai";
import items from "../../src/reducers/items";
import {NONE} from "../../src/constants/categories";
import {ADD_ITEM, CHANGE_CATEGORY, REMOVE_ITEM} from "../../src/actions";

const chance = new Chance();

describe('Reducers', () => {

    let action;

    beforeEach(() => {
        action = {
            id: chance.natural(),
            text: chance.string(),
            category: chance.string()
        };
    });

    it('should handle ADD ITEM', () => {
        const actualState = items([], {type: ADD_ITEM, ...action});

        expect(actualState[0].id).to.be.equal(action.id);
        expect(actualState[0].text).to.be.equal(action.text);
        expect(actualState[0].category).to.be.equal(NONE);
    });

    it('should handle REMOVE_ITEM', () => {
        const actualState = items([action], {type: REMOVE_ITEM, id: action.id});

        expect(actualState).to.have.length(0);
    });

    it('should handle CHANGE_CATEGORY', () => {
        const actualState = items([{category: NONE, ...action}], {type: CHANGE_CATEGORY, ...action});

        expect(actualState[0].id).to.be.equal(action.id);
        expect(actualState[0].text).to.be.equal(action.text);
        expect(actualState[0].category).to.be.equal(action.category);
    });

    it('should handle default', () => {
        const expectedState = [];
        const actualState = items(expectedState, {});
        expect(actualState).to.be.equal(expectedState)
    })
});
