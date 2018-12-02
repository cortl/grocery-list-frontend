import Chance from 'chance';
import {expect} from "chai";
import sinon from 'sinon'
import {ADD_ITEM, addItem, CHANGE_CATEGORY, changeNewCategory, REMOVE_ITEM, removeItem} from "../../src/actions";

const chance = new Chance();
const sandbox = sinon.createSandbox();

describe('Actions', () => {

    const id = chance.natural(),
        category = chance.string(),
        text = chance.string(),
        now = new Date();

    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(now.getTime());
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should have an addItem action', () => {
        const actualItem = addItem(text);

        expect(actualItem.type).to.be.equal(ADD_ITEM);
        expect(actualItem.id).to.be.equal(now.getTime());
        expect(actualItem.text).to.be.equal(text);
    });

    it('should have an removeItem action', () => {
        const actualItem = removeItem(id);

        expect(actualItem.type).to.be.equal(REMOVE_ITEM);
        expect(actualItem.id).to.be.equal(id);
    });

    it('should have a changeNewCategory action', () => {
        const actualItem = changeNewCategory(id, category);

        expect(actualItem.type).to.be.equal(CHANGE_CATEGORY);
        expect(actualItem.id).to.be.equal(id);
        expect(actualItem.category).to.be.equal(category);
    });
});
