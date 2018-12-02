import {expect} from '../utils/chai'
import {AddItem} from "../../src/components/AddItem";
import React from "react";
import {shallow} from "enzyme";
import App from "../../src/components/App";
import Header from "../../src/components/Header";
import ItemList from "../../src/components/ItemList";
import Category from "../../src/components/Category";
import Chance from "chance";
import sinon from "sinon";

const chance = new Chance();
const sandbox = sinon.createSandbox();

describe('Category', () => {

    let wrapper,
        changeSpy = sandbox.spy(),
        category = {
            category: chance.string(),
            backgroundColor: chance.string(),
            textColor: chance.string()
        };

    beforeEach(() => {
        wrapper = shallow(<Category
            category={category}
            change={changeSpy}
        />)
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should render a link', () => {
        expect(wrapper).to.have.type('a');
        expect(wrapper).to.have.style({color: category.textColor});
    });

    it('should call change if link is clicked', () => {
        wrapper.simulate('click');

        expect(changeSpy).to.have.been.calledWith(category.category);
    });

    it('should render a list item', () => {
        expect(wrapper.find('li')).to.have.style({backgroundColor: category.backgroundColor});
        expect(wrapper.find('li')).to.have.className('p-2');
        expect(wrapper.find('li')).to.have.text(category.name);
    });

});
