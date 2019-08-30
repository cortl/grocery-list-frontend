import { shallow } from "enzyme/build";
import React from "react";
import { expect } from "../utils/chai";
import Chance from "chance";
import ItemActions from "../../src/components/items/ItemActions";
import GroceryItem from "../../src/components/items/GroceryItem";
import { List } from "semantic-ui-react";

const chance = new Chance();

describe('Grocery Item', () => {

    let wrapper,
        givenProps;

    beforeEach(() => {
        givenProps = {
            itemId: chance.string(),
            text: chance.string(),
            category: {
                categoryId: chance.string(),
                symbol: chance.string()
            }
        }
        wrapper = shallow(<GroceryItem {...givenProps} />)
    });

    it('should render in a list item', () => {
        expect(wrapper).to.have.type(List.Item);
    });

    it('should render in list content', () => {
        expect(wrapper.find(List.Content)).to.have.prop('size', 'tiny');
        expect(wrapper.find(List.Content)).to.have.prop('verticalAlign', 'middle');

        expect(wrapper.find(List.Content).childAt(0)).to.have.text(`${givenProps.category.symbol} ${givenProps.text}`);
    });

    it('should render ItemActions', () => {
        expect(wrapper.find(ItemActions)).to.have.prop('category', givenProps.category);
        expect(wrapper.find(ItemActions)).to.have.prop('categoryId', givenProps.category.categoryId);
        expect(wrapper.find(ItemActions)).to.have.prop('itemId', givenProps.itemId);
        expect(wrapper.find(ItemActions)).to.have.prop('name', givenProps.text);
    })
});
