import {matchingCategory} from "../../src/utils/categoryMatching";
import {expect} from "./chai";

describe('Category Matching', () => {

    let result;

    const whenMatchIsCalled = (item, association) => {
        return matchingCategory({name: item})({name: association});
    };

    it('should match on any case', () => {
        result = whenMatchIsCalled('Apples', 'APPLES');

        expect(result).to.be.true;
    });

    it('should match with quantifiers ex. 32lbs chicken, 2x chicken', () => {
        result = whenMatchIsCalled('Apples', '32x Apples');

        expect(result).to.be.true;

        result = whenMatchIsCalled('Apples', '32lbs Apples');

        expect(result).to.be.true;
    });

    it('spacing on quantifiers should not matter', () => {
        result = whenMatchIsCalled('Apples', '32 x Apples');

        expect(result).to.be.true;

        result = whenMatchIsCalled('Apples', 'Apples x 32');

        expect(result).to.be.true;

        result = whenMatchIsCalled('Apples', '16ozApples');

        expect(result).to.be.true;
    });

    it('should not match on non-matching names', () => {
        result = whenMatchIsCalled('Apples', 'Bananas');

        expect(result).to.be.false;
    });

    it('should not match on non-matching names with quantifiers', () => {
        result = whenMatchIsCalled('Apples', '32x Bananas');

        expect(result).to.be.false;
    });

    it('should not match if the items are not the same', () => {
        result = whenMatchIsCalled('Canned Milk', 'Milk');

        expect(result).to.be.false;
    });

    it('should not match if the items are not the same', () => {
        result = whenMatchIsCalled('CannedMilk', 'Milk');

        expect(result).to.be.false;
    });

});
