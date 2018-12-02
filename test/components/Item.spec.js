import {shallow} from "enzyme/build";
import React from "react";
import {expect} from "../utils/chai";
import Chance from "chance";
import Item from "../../src/components/Item";
import ItemActions from "../../src/components/ItemActions";

const chance = new Chance();

describe('Item', () => {

    let wrapper,
        text = chance.string(),
        id = chance.natural(),
        category = {
            textColor: chance.string(),
            backgroundColor: chance.string()
        };

    beforeEach(() => {
        wrapper = shallow(<Item
            category={category}
            id={id}
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

    it('should render the item text', () => {
        expect(wrapper.find('span')).to.have.className('float-left mt-2');
        expect(wrapper.find('span')).to.have.text(text);
    });

    it('should render ItemActions', () => {
        expect(wrapper.find(ItemActions)).to.have.prop('category', category);
        expect(wrapper.find(ItemActions)).to.have.prop('id', id);
        expect(wrapper.find(ItemActions)).to.have.prop('name', text);
    })
});
