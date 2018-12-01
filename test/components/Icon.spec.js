import {shallow} from "enzyme/build";
import React from "react";
import {expect} from "../utils/chai";
import Icon from "../../src/components/Icon";
import Chance from "chance";

const chance = new Chance();

describe('Icon', () => {

    let wrapper,
        color = chance.string(),
        type = chance.string();

    beforeEach(() => {
        wrapper = shallow(<Icon
            color={color}
            type={type}
        />)
    });

    it('should render an icon', () => {
        expect(wrapper).to.have.type('i');

        expect(wrapper).to.have.style({color});
        expect(wrapper).to.have.className(`align-middle fas fa-${type}`)
    });
});
