import {expect} from '../../utils/chai'
import React from "react";
import {shallow} from "enzyme";
import Chance from "chance";
import * as sinon from "sinon";
import NavButton from "../../../src/components/navigation/NavButton";

const sandbox = sinon.createSandbox();
const chance = new Chance();

describe('Nav Button', () => {

    let wrapper,
        contextStub,
        text,
        active,
        location;

    beforeEach(() => {
        contextStub = {
            router: {
                history: {
                    push: sandbox.spy()
                }
            }
        };

        text = chance.string();
        location = chance.word();
        active = false;

        whenComponentIsRendered();
    });

    afterEach(() => {
        sandbox.restore();
    });

    const whenComponentIsRendered = () => {
        wrapper = shallow(<NavButton
            text={text}
            location={location}
            active={active}
        />, {context: contextStub})
    };

    it('should have a link', () => {
        expect(wrapper.find('a')).to.have.className('nav-link');
        expect(wrapper.find('a')).to.have.prop('href', '#');
        expect(wrapper.find('a')).to.have.text(text);
    });

    it('should move page to new location when link is clicked', () => {
        wrapper.find('a').props().onClick();

        expect(contextStub.router.history.push).to.have.been.calledWith(location);
    });

    it('should have active as class if prop active', () => {
        active = true;

        whenComponentIsRendered();

        expect(wrapper.find('a')).to.have.className('nav-link active');
    })
});
