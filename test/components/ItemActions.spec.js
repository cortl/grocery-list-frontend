import {shallow} from "enzyme/build";
import React from "react";
import {expect} from "../utils/chai";
import Chance from "chance";
import {ItemActions, mapDispatchToProps} from "../../src/components/ItemActions";
import * as sinon from "sinon";
import Category from "../../src/components/Category";
import * as CATEGORIES from "../../src/constants/categories";
import Icon from "../../src/components/Icon";
import {changeNewCategory, removeItem} from "../../src/actions";

const chance = new Chance();
const sandbox = sinon.createSandbox();

describe('Item Actions', () => {

    let wrapper,
        id = chance.natural(),
        color = chance.string(),
        category = chance.string(),
        categoryChange = chance.string,
        changeCategorySpy,
        removeItemSpy,
        dispatchSpy;

    beforeEach(() => {
        changeCategorySpy = sandbox.stub().returns(categoryChange);
        removeItemSpy = sandbox.spy();
        dispatchSpy = sandbox.spy();

        wrapper = shallow(<ItemActions
            id={id}
            color={color}
            changeCategory={changeCategorySpy}
            removeItem={removeItemSpy}
        />)
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should render in a div', () => {
        expect(wrapper).to.have.type('div');
        expect(wrapper).to.have.className('float-right');
    });

    describe('Category Button', () => {

        it('should have a button', () => {
            expect(wrapper.find('button').at(0)).to.have.prop('type', 'button');
            expect(wrapper.find('button').at(0)).to.have.className('btn btn-link');
            expect(wrapper.find('button').at(0)).to.have.prop('id', `${id}dropDown`);
            expect(wrapper.find('button').at(0)).to.have.prop('data-toggle', 'dropdown');
            expect(wrapper.find('button').at(0)).to.have.prop('aria-haspopup', 'true');
            expect(wrapper.find('button').at(0)).to.have.prop('aria-expanded', 'true');
        });

        it('should have an Icon', () => {
            expect(wrapper.find(Icon).at(0)).to.have.prop('color', color);
            expect(wrapper.find(Icon).at(0)).to.have.prop('type', 'cog');
        });

        it('should have a dropdown', () => {
            expect(wrapper.find('ul')).to.have.className('dropdown-menu');
            expect(wrapper.find('ul')).to.have.prop('aria-labelledby', `${id}dropDown`);
        });

        it('should have a Produce Category', () => {
            expect(wrapper.find(Category).at(0)).to.have.prop('change', categoryChange);
            expect(wrapper.find(Category).at(0)).to.have.prop('category', CATEGORIES.PRODUCE);
        });

        it('should have a Dairy Category', () => {
            expect(wrapper.find(Category).at(1)).to.have.prop('change', categoryChange);
            expect(wrapper.find(Category).at(1)).to.have.prop('category', CATEGORIES.DAIRY);
        });

        it('should have a Frozen Category', () => {
            expect(wrapper.find(Category).at(2)).to.have.prop('change', categoryChange);
            expect(wrapper.find(Category).at(2)).to.have.prop('category', CATEGORIES.FROZEN);
        });

        it('should have a Grains Category', () => {
            expect(wrapper.find(Category).at(3)).to.have.prop('change', categoryChange);
            expect(wrapper.find(Category).at(3)).to.have.prop('category', CATEGORIES.GRAINS);
        });

        it('should have a Meat Category', () => {
            expect(wrapper.find(Category).at(4)).to.have.prop('change', categoryChange);
            expect(wrapper.find(Category).at(4)).to.have.prop('category', CATEGORIES.MEAT);
        });

        it('should have a Canned Category', () => {
            expect(wrapper.find(Category).at(5)).to.have.prop('change', categoryChange);
            expect(wrapper.find(Category).at(5)).to.have.prop('category', CATEGORIES.CANNED);
        });

        it('should have a Dry Goods Category', () => {
            expect(wrapper.find(Category).at(6)).to.have.prop('change', categoryChange);
            expect(wrapper.find(Category).at(6)).to.have.prop('category', CATEGORIES.DRYGOODS);
        });

        it('should have a Household Category', () => {
            expect(wrapper.find(Category).at(7)).to.have.prop('change', categoryChange);
            expect(wrapper.find(Category).at(7)).to.have.prop('category', CATEGORIES.HOUSEHOLD);
        });

        it('should have an Other Category', () => {
            expect(wrapper.find(Category).at(8)).to.have.prop('change', categoryChange);
            expect(wrapper.find(Category).at(8)).to.have.prop('category', CATEGORIES.OTHER);
        });

        it('should have a None Category', () => {
            expect(wrapper.find(Category).at(9)).to.have.prop('change', categoryChange);
            expect(wrapper.find(Category).at(9)).to.have.prop('category', CATEGORIES.NONE);
        });
    });

    describe('Delete Button', () => {
        it('should have a button', () => {
            expect(wrapper.find('button').at(1)).to.have.prop('type', 'button');
            expect(wrapper.find('button').at(1)).to.have.className('btn btn-link');
        });

        it('should call removeItem when clicked', () => {
            wrapper.find('button').at(1).simulate('click');

            expect(removeItemSpy).to.have.been.calledWith(id);
        });

        it('should have an icon', () => {
            expect(wrapper.find(Icon).at(1)).to.have.prop('color', color);
            expect(wrapper.find(Icon).at(1)).to.have.prop('type', 'trash');
        });
    });

    describe('Redux', () => {
        it('should map dispatch to props', () => {
            const actualProps = mapDispatchToProps(dispatchSpy);

            actualProps.removeItem(id);
            expect(dispatchSpy).to.have.been.calledWith(removeItem(id));
            sandbox.restore();

            actualProps.changeCategory(id)(category);
            expect(dispatchSpy).to.have.been.calledWith(changeNewCategory(id, category));
            sandbox.restore();
        })
    });
});
