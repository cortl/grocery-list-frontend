import {expect} from '../../../chai';
import React from 'react';
import {mount, shallow} from 'enzyme';
import Chance from 'chance';
import {Menu} from 'semantic-ui-react';
import sinon from 'sinon';

import {SignOut, mapStateToProps} from '../../../../src/components/features/navigation/sign-out';

const sandbox = sinon.createSandbox();
const chance = new Chance();

describe('Sign Out', () => {

    let wrapper,
        givenProps;

    beforeEach(() => {
        givenProps = {
            auth: {
                [chance.word]: chance.word()
            },
            signOut: sandbox.spy()
        };
        wrapper = shallow(<SignOut
            {...givenProps}
        />);
    });

    afterEach(() => sandbox.restore());

    it('should be a sign out button', () => {
        expect(wrapper).to.have.type(Menu.Item);
        expect(wrapper).to.have.prop('content', 'Sign Out');
        expect(wrapper).to.have.prop('icon', 'sign-out');
    });

    describe('when sign out is clicked', () => {
        beforeEach(() => {
            wrapper.simulate('click');
        });

        it('should call sign out', () => {
            expect(givenProps.signOut).to.have.been.calledOnce;
        });
    });

    describe('when auth is not empty', () => {
        let context,
            auth;

        beforeEach(() => {
            context = {
                router: {
                    history: {
                        push: sandbox.spy()
                    }
                }
            };
            auth = {
                isEmpty: false
            };

            wrapper = mount(<SignOut
                auth={auth}
            />, {context});
        });

        it('should not push the user to the login page', () => {
            expect(context.router.history.push).to.have.not.been.calledWith('/login');
        });

        describe('when the auth becomes empty', () => {
            beforeEach(() => {
                auth = {
                    isEmpty: true
                };

                wrapper.setProps({auth: auth});
            });

            it('should push the user to the login page', () => {
                expect(context.router.history.push).to.have.been.calledWith('/login');
            });
        });
    });

    describe('Redux', () => {
        let props,
            state;
        beforeEach(() => {
            state = {
                firebase: {
                    auth: chance.string()
                }
            };
            props = mapStateToProps(state);
        });

        it('should map state to props', () => {
            expect(props.auth).to.be.equal(state.firebase.auth);
        });
    });

});
