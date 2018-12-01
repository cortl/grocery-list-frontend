import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonEnzyme from 'sinon-chai';

chai.use(chaiEnzyme());
chai.use(sinonEnzyme());
export const expect = chai.expect;
