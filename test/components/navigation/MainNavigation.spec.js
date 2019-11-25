import React from 'react';
import { shallow } from 'enzyme';
import { MainNavigation } from '../../../src/components/navigation/MainNavigation';
import { expect } from '../../utils/chai';
import { SignOut } from '../../../src/components/security/SignOut';
import { Menu } from 'semantic-ui-react';

describe('Main Navigation', () => {

    let wrapper;

    const whenComponentIsRendered = () => {
        wrapper = shallow(<MainNavigation />);
    };

    beforeEach(() => {
        whenComponentIsRendered();
    });

    it('should render a menu', () => {
        expect(wrapper).to.have.type(Menu);
        expect(wrapper).to.have.prop('secondary', true);
    });

    it('should have a link for SignOut', () => {
        expect(wrapper.find(SignOut)).to.be.present;
    });
});
