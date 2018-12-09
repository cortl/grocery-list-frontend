import {expect} from '../../utils/chai'
import React from "react";
import {mount, shallow} from "enzyme";
import Chance from "chance";
import * as sinon from "sinon";
import {SignIn, mapStateToProps} from "../../../src/components/security/SignIn";
import Header from "../../../src/components/Header";

const sandbox = sinon.createSandbox();
const chance = new Chance();

describe('Sign In', () => {

    let wrapper,
        signInSpy = sandbox.spy();

    beforeEach(() => {
        wrapper = shallow(<SignIn
            signIn={signInSpy}
        />)
    });

    it('should have a sign in header', () => {
       expect(wrapper.find(Header)).to.have.prop('text', 'Sign In');
    });

    it('should have a sign in link', () => {
        expect(wrapper.find('a')).to.have.prop('href', '#');
        expect(wrapper.find('a')).to.have.prop('onClick', signInSpy);
        expect(wrapper.find('a')).to.have.text('Sign In With Google');
        expect(wrapper.find('a').childAt(0)).to.have.className('fab fa-google mr-2')
    });

    it('should call sign in spy when link is clicked', () => {
        wrapper.find('a').simulate('click');

        expect(signInSpy).to.have.been.calledOnce;
    });

    it('should move the page to app if page is signed', () => {
        const contextStub = {
            router: {
                history: {
                    push: sinon.spy()
                }
            }
        };

        let auth = {
            isEmpty: false
        };

        wrapper = mount(<SignIn
            auth={auth}
        />, {context: contextStub});

        auth = {
            isEmpty: false
        };

        wrapper.setProps({auth: auth});


        expect(contextStub.router.history.push).to.have.been.calledWith('/')
    });

    describe('Redux', () => {
        it('should map state to props', () => {
            const state = {
                firebase: {
                    auth: chance.string()
                }
            };

            const actualProps = mapStateToProps(state);

            expect(actualProps.auth).to.be.equal(state.firebase.auth)
        });
    });

});
