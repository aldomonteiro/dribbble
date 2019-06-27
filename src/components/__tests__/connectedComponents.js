import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import { Shots } from '../Shots';
import { Shot } from '../Shot';
import { mockData } from '../../testUtils'

Enzyme.configure({ adapter: new Adapter() });

describe('Check if Connected Components are receiving props', () => {
  it('Shots should renders 3 Card components', () => {
    const wrapper = shallow(<Shots shots={mockData} />);
    expect(wrapper.find('Card')).toHaveLength(3);
  });

  it('Shot should have a responsive image', () => {
    const wrapper = shallow(<Shot location={{ state: {} }} match={{ params: { id: mockData[0].id } }} shot={mockData[0]} />);
    expect(wrapper.find('ResponsiveImg')).toHaveLength(1);
  });
});