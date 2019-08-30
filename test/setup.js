import { configure } from 'enzyme';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

export const authRefStub = sinon.stub();
export const settingsStub = {
    settings: () => { }
};

sinon.stub(firebase, 'initializeApp');
sinon.stub(firebase, 'firestore').returns(settingsStub);
sinon.stub(firebase, 'auth').returns(authRefStub);