import React from 'react';
import About from './About';
import {shallow} from 'enzyme';

describe('<About>', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<About />);
  });

  test('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Info displayed', () => {
    expect(wrapper.find('.info').exists()).toBeTruthy();
  });
});