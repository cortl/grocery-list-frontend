import {shallow} from "enzyme/build";
import React from "react";
import Header from "../../src/components/Header";
import {expect} from "../utils/chai";
import Chance from "chance";

const chance = new Chance();

describe('Header', () => {

    let wrapper,
        text;

    beforeEach(() => {
        text = chance.string();
        wrapper = shallow(<Header
            text={text}
        />)
    });

    it('should be a header', () => {
        expect(wrapper).to.have.type('div');
        expect(wrapper).to.have.className('mt-5 mb-5');
        expect(wrapper.childAt(0)).to.have.text(text);
    });
});
