import {expect} from '../../chai';
import React from 'react';
import {shallow} from 'enzyme';
import Chance from 'chance';
import sinon from 'sinon';
import {Grid, Loader, Header} from 'semantic-ui-react';

import connectedList from '../../../src/enhancers/firestore-connected-list';
import firebase from '../../../src/config/fbConfig';

import Navigation from '../../../src/components/features/navigation';
import AddItem from '../../../src/components/features/grocery-list/add';
import {Groceries} from '../../../src/components/pages/groceries';

const chance = new Chance();
const sandbox = sinon.createSandbox();

describe('Groceries Page', () => {

    let wrapper,
        givenProps,
        shareCollection,
        otherIds,
        ourIds;

    const whenComponentIsRendered = () => {
        wrapper = shallow(<Groceries {...givenProps} />);
    };

    const givenSharesExist = (ids, field) => {
        shareCollection.where.withArgs(field, '==', givenProps.auth.uid)
            .returns({
                get: sandbox.stub().resolves({
                    docs: ids.map(id => ({
                        id: chance.guid(),
                        data: () => ({[field]: id})
                    }))
                })
            });
    };

    beforeEach(() => {
        givenProps = {
            auth: {
                uid: chance.pickone([chance.guid(), ''])
            },
            fetchSettings: sandbox.spy()
        };
        shareCollection = {
            where: sandbox.stub()
        };
        firebase.firestore().collection.withArgs('shares').returns(shareCollection);

        otherIds = chance.n(chance.guid, chance.d4());
        ourIds = chance.n(chance.guid, chance.d4());

        givenSharesExist(otherIds, 'requestedId');
        givenSharesExist(ourIds, 'senderId');
        whenComponentIsRendered();
    });

    afterEach(() => sandbox.restore());

    it('should render in a grid', () => {
        const grid = wrapper.childAt(1);
        expect(grid).to.have.type(Grid);
        expect(grid.find(Grid)).to.have.prop('centered', true);
        expect(grid.find(Grid)).to.have.prop('columns', 1);

        expect(grid.find(Grid.Column)).to.have.prop('computer', '10');
        expect(grid.find(Grid.Column)).to.have.prop('mobile', '16');
    });

    it('should have a navigation', () => {
        expect(wrapper.childAt(0)).to.have.type(Navigation);
    });

    it('should have a header', () => {
        expect(wrapper.find(Header).childAt(0)).to.have.text('Grocery List');
        expect(wrapper.find(Header)).to.have.prop('as', 'h1');
    });

    describe('when no ids are loaded', () => {
        beforeEach(() => {
            givenProps.auth.uid = '';
            givenSharesExist([], 'requestedId');
            givenSharesExist([], 'senderId');
            whenComponentIsRendered();
        });

        it('should have a loader', () => {
            expect(wrapper.find(Loader)).to.have.prop('active', true);
        });
    });

    describe('when ids are loaded', () => {
        beforeEach(async () => {
            givenProps.auth.uid = chance.string();
            givenSharesExist(otherIds, 'requestedId');
            givenSharesExist(ourIds, 'senderId');

            whenComponentIsRendered();

            await wrapper.instance().busy;
        });

        it('should not have a loader', () => {
            expect(wrapper.find(Loader)).to.not.be.present();
        });

        it('should have an item list', () => {
            expect(wrapper.find(connectedList)).to.have.prop('userId', givenProps.auth.uid);
        });

        it('should have an add item', () => {
            expect(wrapper.find(AddItem)).to.be.present();
        });
    });
});
