import {expect} from '../../utils/chai'
import React from "react";
import {mount, shallow} from "enzyme";
import {mapStateToProps, SignOut} from "../../../src/components/security/SignOut";
import Chance from "chance";
import * as sinon from "sinon";

const sandbox = sinon.createSandbox();
const chance = new Chance();

describe('Sign Out', () => {

    let wrapper,
        signOutSpy = sandbox.spy();

    beforeEach(() => {
        wrapper = shallow(<SignOut
            signOut={signOutSpy}
        />)
    });

    it('should have a sign out link', () => {
        expect(wrapper.find('a')).to.have.className('float-right mt-2');
        expect(wrapper.find('a')).to.have.prop('href', '#');
        expect(wrapper.find('a')).to.have.prop('onClick', signOutSpy);
        expect(wrapper.find('a')).to.have.text('Sign Out');
    });

    it('should call sign out spy when link is clicked', () => {
        wrapper.find('a').simulate('click');

        expect(signOutSpy).to.have.been.calledOnce;
    });

    it('should move the page to sign in if auth is empty', () => {
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

        wrapper = mount(<SignOut
            auth
        />, {context: contextStub});

        auth = {
            isEmpty: true
        };

        wrapper.setProps({auth: auth});


        expect(contextStub.router.history.push).to.have.been.calledWith('/signIn')
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
