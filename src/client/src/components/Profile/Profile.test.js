import React from 'react';
import Profile from './Profile';
import {shallow} from 'enzyme';

describe('<Profile>', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<Profile />);
  });

  test('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Dont show profile info is not loaded', () => {
    expect(wrapper.find('.profile').exists()).toBeFalsy();
  });

  test('Show profile info & labels when loaded', () => {
    wrapper.setState({loaded: true})
    expect(wrapper.find('#profileHeader').contains('Profile')).toBeTruthy();
    expect(wrapper.find('#profileHeader').exists()).toBeTruthy();
    expect(wrapper.find('#usernameLbl').contains('Username')).toBeTruthy();
    expect(wrapper.find('#usernameLbl').exists()).toBeTruthy();
    expect(wrapper.find('#createdOnLbl').contains('Created on')).toBeTruthy();
    expect(wrapper.find('#createdOnLbl').exists()).toBeTruthy();
    expect(wrapper.find('#numOfReceiptsLbl').contains('Number of receipts')).toBeTruthy();
    expect(wrapper.find('#numOfReceiptsLbl').exists()).toBeTruthy();
  });

  test('Correct info showing', () => {
    wrapper.setState({loaded: true, username: 'MockUser', createdAt: '2020-07-04T21:19:50.018+00:00', receipts: 3});
    expect(wrapper.find('#usernameValue').contains('MockUser'));
    expect(wrapper.find('#createdOnValue').contains('01/07/2020'));
    expect(wrapper.find('#numOfReceiptsValue').contains(3));
  });
});