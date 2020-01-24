import {itemStripper} from '../../src/utils/category-matching';
import {expect} from '../chai';

describe('Category Matching', () => {

    describe('Item Stripper', () => {
        it('should remove front quantifiers from name', () => {
            expect(itemStripper('32x Chicken Breast')).to.be.equal('Chicken Breast');
        });

        it('should remove front quantifiers from name', () => {
            expect(itemStripper('32 x Chicken Breast')).to.be.equal('Chicken Breast');
        });

        it('should remove front quantifiers from name', () => {
            expect(itemStripper('32lbs Chicken Breast')).to.be.equal('Chicken Breast');
        });

        it('should remove front quantifiers from name', () => {
            expect(itemStripper('x 3 Chicken Breast')).to.be.equal('Chicken Breast');
        });

        it('should remove front quantifiers from name', () => {
            expect(itemStripper('Chicken Breast')).to.be.equal('Chicken Breast');
        });

        it('should remove rear quantifiers from name', () => {
            expect(itemStripper('Chicken Breast x32')).to.be.equal('Chicken Breast');
        });

        it('should remove rear quantifiers from name', () => {
            expect(itemStripper('Chicken Breast x 32')).to.be.equal('Chicken Breast');
        });

        it('should remove rear quantifiers from name', () => {
            expect(itemStripper('Chicken Breast 32lbs')).to.be.equal('Chicken Breast');
        });

        it('should remove rear quantifiers from name', () => {
            expect(itemStripper('Chicken Breast 3x')).to.be.equal('Chicken Breast');
        });

        it('should not remove important details from name', () => {
            expect(itemStripper('46oz x Evaporated Milk')).to.be.equal('Evaporated Milk');
        });

        it('should not remove important details from name', () => {
            expect(itemStripper('Evaporated Milk')).to.be.equal('Evaporated Milk');
        });

    });

});
