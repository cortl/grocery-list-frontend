import {shallow} from 'enzyme/build';
import React from 'react';
import {expect} from '../../utils/chai';
import Chance from 'chance';
import ItemActions from '../../../src/components/items/ItemActions';
import GroceryItem from '../../../src/components/items/GroceryItem';
import {Grid} from 'semantic-ui-react';

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
        };
        wrapper = shallow(<GroceryItem {...givenProps} />);
    });

    it('should render in a list item', () => {
        expect(wrapper).to.have.type(Grid.Row);
        expect(wrapper.props().style).to.be.eql({paddingTop: '0px', paddingBottom: '0px'});
    });

    it('should render in list content', () => {
        expect(wrapper.find(Grid.Column).at(0)).to.have.prop('verticalAlign', 'middle');
        expect(wrapper.find(Grid.Column).at(0).childAt(0)).to.have.text(givenProps.text);
    });

    it('should render ItemActions', () => {
        expect(wrapper.find(ItemActions)).to.have.prop('category', givenProps.category);
        expect(wrapper.find(ItemActions)).to.have.prop('categoryId', givenProps.category.categoryId);
        expect(wrapper.find(ItemActions)).to.have.prop('itemId', givenProps.itemId);
        expect(wrapper.find(ItemActions)).to.have.prop('name', givenProps.text);
    });
});
