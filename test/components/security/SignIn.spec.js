import {expect} from '../../utils/chai';
import React from 'react';
import {mount, shallow} from 'enzyme';
import Chance from 'chance';
import * as sinon from 'sinon';
import {SignIn, mapStateToProps} from '../../../src/components/security/SignIn';
import {Header, Container, Image, Loader, Card} from 'semantic-ui-react';

const sandbox = sinon.createSandbox();
const chance = new Chance();

describe('Sign In', () => {
    let wrapper,
        givenProps,
        context;

    const whenComponentIsRendered = () => {
        wrapper = shallow(<SignIn
            {...givenProps}
        />, {context});
    };

    beforeEach(() => {
        context = {
            router: {
                history: {
                    push: sandbox.spy()
                }
            }
        };
        givenProps = {
            login: sandbox.spy(),
            auth: {
                [chance.word()]: chance.word(),
                isEmpty: true
            }
        };

        whenComponentIsRendered();
    });

    afterEach(() => sandbox.restore());

    it('should be in a container', () => {
        expect(wrapper).to.have.type(Container);
    });

    it('should have a logo', () => {
        expect(wrapper.find(Image).props().src).to.be.eql({});
        expect(wrapper.find(Image)).to.have.prop('alt', 'logo');
    });

    it('should have a header', () => {
        expect(wrapper.find(Header)).to.have.prop('textAlign', 'center');
        expect(wrapper.find(Header)).to.have.prop('size', 'large');
        expect(wrapper.find(Header)).to.have.prop('icon', true);

        expect(wrapper.find(Header.Content).childAt(0)).to.have.text('Grocery List');
    });

    describe('when the auth is not loaded', () => {
        beforeEach(() => {
            givenProps.auth.isLoaded = false;
            whenComponentIsRendered();
        });

        it('should have a loader', () => {
            expect(wrapper.find(Loader)).to.have.prop('active', true);
        });
    });

    describe('when the auth is loaded', () => {
        beforeEach(() => {
            givenProps.auth.isLoaded = true;
            whenComponentIsRendered();
        });

        it('should not have a loader', () => {
            expect(wrapper.find(Loader)).to.not.exist;
        });

        it('should have a card', () => {
            expect(wrapper.find(Card)).to.have.prop('centered', true);
            expect(wrapper.find(Card).props().style).to.eql({marginTop: '5em'});
        });
    });

    describe('when auth is not empty', () => {
        const whenComponentIsMounted = () => {
            wrapper = mount(<SignIn
                {...givenProps}
            />, {context});
        };

        beforeEach(() => {
            givenProps.auth.isEmpty = true;
            whenComponentIsMounted();
        });

        it('should not push the user to the home page', () => {
            expect(context.router.history.push).to.have.not.been.calledWith('/');
        });

        describe('when the auth is empty', () => {
            beforeEach(() => {
                givenProps.auth.isEmpty = false;

                wrapper.setProps({...givenProps});
            });

            it('should push the user to the home page', () => {
                expect(context.router.history.push).to.have.been.calledWith('/');
            });
        });
    });

    describe('Redux', () => {
        let state,
            props;

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
