import {expect} from '../utils/chai';
import React from 'react';
import {shallow} from 'enzyme';
import App from '../../src/components/App';
import {BrowserRouter, Route} from 'react-router-dom';
import SignIn from '../../src/components/security/SignIn';

describe('App', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App />);
    });

    it('should render in a BrowserRouter', () => {
        expect(wrapper).to.have.type(BrowserRouter);
    });

    it('should have a login route', () => {
        expect(wrapper.find(Route).at(0)).to.have.prop('exact');
        expect(wrapper.find(Route).at(0)).to.have.prop('path', '/');
    });

    it('should have an app route', () => {
        expect(wrapper.find(Route).at(1)).to.have.prop('exact');
        expect(wrapper.find(Route).at(1)).to.have.prop('path', '/login');
        expect(wrapper.find(Route).at(1)).to.have.prop('component', SignIn);
    });

});
