import { expect } from '../../../chai';
import { shallow } from 'enzyme/build';
import React from 'react';
import Chance from 'chance';
import { Grid } from 'semantic-ui-react';

import Actions from '../../../../src/components/features/grocery-list/actions';
import Item from '../../../../src/components/features/grocery-list/item';

const chance = new Chance();

describe('Item', () => {

    let wrapper,
        givenProps;

    beforeEach(() => {
        givenProps = {
            itemId: chance.string(),
            text: chance.string(),
            categoryId: chance.string(),
            symbol: chance.string()
        };
        wrapper = shallow(<Item {...givenProps} />);
    });

    it('should render in a list item', () => {
        expect(wrapper).to.have.type(Grid.Row);
        expect(wrapper.props().style).to.be.eql({ paddingTop: '0px', paddingBottom: '0px' });
    });

    it('should render in list content', () => {
        expect(wrapper.find(Grid.Column).at(0)).to.have.prop('verticalAlign', 'middle');
        expect(wrapper.find(Grid.Column).at(0).childAt(0)).to.have.text(givenProps.text);
    });

    it('should render Actions', () => {
        expect(wrapper.find(Actions)).to.have.prop('categoryId', givenProps.categoryId);
        expect(wrapper.find(Actions)).to.have.prop('itemId', givenProps.itemId);
        expect(wrapper.find(Actions)).to.have.prop('name', givenProps.text);
    });
});
