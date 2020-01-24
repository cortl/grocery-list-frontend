import {configure} from 'enzyme';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';
import sinon from 'sinon';

configure({adapter: new Adapter()});

sinon.stub(firebase, 'initializeApp');
export const firestore = {
    settings: sinon.stub(),
    collection: sinon.stub()
};
sinon.stub(firebase, 'firestore').returns(firestore);
sinon.stub(firebase, 'auth').returns(sinon.stub());