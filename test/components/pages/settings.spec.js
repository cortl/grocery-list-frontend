import {expect} from '../../chai';
import React from 'react';
import {shallow} from 'enzyme';
import {Grid, Header} from 'semantic-ui-react';

import Navigation from '../../../src/components/features/navigation';
import Shares from '../../../src/components/features/settings/shares';
import {Settings} from '../../../src/components/pages/settings';

describe('Settings Page', () => {
    let wrapper,
        givenProps;

    const whenComponentIsRendered = () => {
        wrapper = shallow(<Settings {...givenProps} />);
    };

    beforeEach(() => {
        givenProps = {};
        whenComponentIsRendered();
    });

    it('should render in a grid', () => {
        expect(wrapper).to.have.type(Grid);
        expect(wrapper.find(Grid)).to.have.prop('centered', true);
        expect(wrapper.find(Grid)).to.have.prop('columns', 1);
        expect(wrapper.find(Grid)).to.have.prop('container', true);

        expect(wrapper.find(Grid.Column)).to.have.prop('computer', '10');
        expect(wrapper.find(Grid.Column)).to.have.prop('mobile', '16');
    });

    it('should have a navigation', () => {
        expect(wrapper.find(Navigation)).to.be.present();
    });

    it('should have a header', () => {
        expect(wrapper.find(Header).childAt(0)).to.have.text('Settings');
        expect(wrapper.find(Header)).to.have.prop('as', 'h1');
    });

    it('should have a shares component', () => {
        expect(wrapper.find(Shares)).to.be.present;
    });
});
