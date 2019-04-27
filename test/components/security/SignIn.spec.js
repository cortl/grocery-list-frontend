import { expect } from '../../utils/chai'
import React from "react";
import { mount, shallow } from "enzyme";
import Chance from "chance";
import * as sinon from "sinon";
import { backgroundStyle, SignIn, mapStateToProps } from "../../../src/components/security/SignIn";
import { Spinner } from '../../../src/components/Spinner';

const sandbox = sinon.createSandbox();
const chance = new Chance();

describe('Sign In', () => {
    let wrapper,
        signInSpy = sandbox.spy(),
        givenProps = {
            signIn: signInSpy,
            auth: {
                isLoaded: false,
                isEmpty: true
            }
        }

    beforeEach(() => {
        whenComponentIsRendered(givenProps);
    });

    const whenComponentIsRendered = (props) => {
        wrapper = shallow(<SignIn
            {...props}
        />)
    }

    it('should have a blurry background image', () => {
        expect(wrapper.childAt(0)).to.have.style(backgroundStyle);
    });

    it('should have a spinner when authentication has not been loaded', () => {
        expect(wrapper.find(Spinner)).to.be.present();
    });

    it('should have a sign in header', () => {
        expect(wrapper.find('h1')).to.have.className('display-3 mt-5 mb-5 text-white');
        expect(wrapper.find('h1')).to.have.text('Grocery List');
    });

    it('should have a sign in link', () => {
        givenProps.auth.isEmpty = false;
        givenProps.auth.isLoaded = true;
        
        whenComponentIsRendered(givenProps);

        expect(wrapper.find('button')).to.have.prop('onClick', signInSpy);
        expect(wrapper.find('button')).to.have.text('Sign In With Google');
        expect(wrapper.find('button').childAt(0)).to.have.className('fab fa-google mr-2')
    });

    it('should call sign in spy when link is clicked', () => {
        givenProps.auth.isEmpty = false;
        givenProps.auth.isLoaded = true;
        
        whenComponentIsRendered(givenProps);
        
        wrapper.find('button').simulate('click');

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
        />, { context: contextStub });

        auth = {
            isEmpty: false
        };

        wrapper.setProps({ auth: auth });


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
