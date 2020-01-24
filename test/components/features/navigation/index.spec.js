import {expect} from '../../../chai';
import React from 'react';
import {shallow} from 'enzyme';
import {Menu} from 'semantic-ui-react';

import {SignOut} from '../../../../src/components/features/navigation/sign-out';
import {Navigation} from '../../../../src/components/features/navigation';

describe('Navigation', () => {

    let wrapper;

    const whenComponentIsRendered = () => {
        wrapper = shallow(<Navigation />);
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
