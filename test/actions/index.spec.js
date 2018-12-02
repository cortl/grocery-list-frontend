import Chance from 'chance';
import {expect} from "chai";
import sinon from 'sinon'

const chance = new Chance();
const sandbox = sinon.createSandbox();

describe('Actions', () => {

    const name = chance.string();

    let getFirestoreStub,
        firestoreStub,
        addStub,
        thenStub,
        catchStub,
        getStateSpy,
        dispatchSpy,
        getFirebaseSpy;

    beforeEach(() => {
        getFirestoreStub = sandbox.stub();
        firestoreStub = sandbox.stub();
        addStub = sandbox.spy();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Add Item', () => {
        const firestore = {
            add: sandbox.spy(),
            then: sandbox.spy(),
            catch: sandbox.spy()
        };
        getFirestoreStub = sandbox.stub().returns(firestore);

        // addItem(name)(dispatchSpy, getStateSpy, {getFirebase: getFirebaseSpy, getFirestore: getFirestoreStub})


    });

    describe('Remove Item', () => {

    });

    describe('Change Category', () => {

    });
});
