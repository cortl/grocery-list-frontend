import {shallow} from "enzyme/build";
import React from "react";
import {expect} from "../utils/chai";
import Chance from "chance";
import Item from "../../src/components/items/Item";
import ItemActions from "../../src/components/items/ItemActions";

const chance = new Chance();

describe('Item', () => {

    let wrapper,
        text = chance.string(),
        id = chance.string(),
        category = {
            categoryId: chance.string(),
            textColor: chance.string(),
            backgroundColor: chance.string(),
            symbol: chance.string()
        };

    beforeEach(() => {
        wrapper = shallow(<Item
            category={category}
            itemId={id}
            text={text}
        />)
    });

    it('should render in an li', () => {
        expect(wrapper).to.have.type('li');
        expect(wrapper.props().style).to.deep.equal({
            backgroundColor: category.backgroundColor,
            color: category.textColor
        });
        expect(wrapper).to.have.className('list-group-item');
    });

    it('should render the category symbol', () => {
        expect(wrapper.find('span').at(0)).to.have.className('float-left mt-2');
        expect(wrapper.find('span').at(0)).to.have.text(category.symbol);
    });

    it('should render the item text', () => {
        expect(wrapper.find('span').at(1)).to.have.className('float-left mt-2');
        expect(wrapper.find('span').at(1)).to.have.text(text);
    });

    it('should render ItemActions', () => {
        expect(wrapper.find(ItemActions)).to.have.prop('category', category);
        expect(wrapper.find(ItemActions)).to.have.prop('categoryId', category.categoryId);
        expect(wrapper.find(ItemActions)).to.have.prop('itemId', id);
        expect(wrapper.find(ItemActions)).to.have.prop('name', text);
    })
});
