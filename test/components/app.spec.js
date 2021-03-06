import {expect} from '../chai';
import React from 'react';
import {shallow} from 'enzyme';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import SignIn from '../../src/components/pages/sign-in';
import App from '../../src/components/app';

describe('App', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App />);
    });

    it('should render in a BrowserRouter', () => {
        expect(wrapper).to.have.type(BrowserRouter);
    });

    it('should render in a switch', () => {
        expect(wrapper.find(Switch)).to.be.present;
    });

    it('should have a login route', () => {
        expect(wrapper.find(Route).at(0)).to.have.prop('exact');
        expect(wrapper.find(Route).at(0)).to.have.prop('path', '/');
    });

    it('should have a settings route', () => {
        expect(wrapper.find(Route).at(1)).to.have.prop('exact');
        expect(wrapper.find(Route).at(1)).to.have.prop('path', '/settings');
    });

    it('should have an app route', () => {
        expect(wrapper.find(Route).at(2)).to.have.prop('exact');
        expect(wrapper.find(Route).at(2)).to.have.prop('path', '/login');
        expect(wrapper.find(Route).at(2)).to.have.prop('component', SignIn);
    });

    it('should have a catch all route', () => {
        expect(wrapper.find(Redirect)).to.have.prop('from', '/*');
        expect(wrapper.find(Redirect)).to.have.prop('to', '/');
    });
});
