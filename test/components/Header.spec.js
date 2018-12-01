import {shallow} from "enzyme/build";
import React from "react";
import Header from "../../src/components/Header";
import {expect} from "../utils/chai";

describe('Header', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Header
        />)
    });

    it('should be a header', () => {
        expect(wrapper).to.have.type('div');
        expect(wrapper).to.have.className('mt-5 mb-5');
        expect(wrapper.childAt(0)).to.have.text('Grocery List');
    });
});
