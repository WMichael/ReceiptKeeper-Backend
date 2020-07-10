import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

describe('<App>', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Failed to Communicate message showing when authError', () => {
    wrapper.setState({
      authError: true
    });
    expect(wrapper.contains(<h2>Failed to communicate with the backend.</h2>)).toBeTruthy();
  })

  test('Show correct links when logged in', () => {
    wrapper.setState({
      loggedIn: true,
      loaded: true
    });

    expect(wrapper.find('#homeButton').exists()).toBeTruthy();
    expect(wrapper.find('#aboutButton').exists()).toBeTruthy();
    expect(wrapper.find('#profileButton').exists()).toBeTruthy();
    expect(wrapper.find('#logoutButton').exists()).toBeTruthy();
    expect(wrapper.find('#loginButton').exists()).toBeFalsy();
  });

  test('Show correct links when logged out', () => {
    wrapper.setState({
      loggedIn: false,
      loaded: true
    });

    expect(wrapper.find('#homeButton').exists()).toBeTruthy();
    expect(wrapper.find('#aboutButton').exists()).toBeTruthy();
    expect(wrapper.find('#profileButton').exists()).toBeFalsy();
    expect(wrapper.find('#logoutButton').exists()).toBeFalsy();
    expect(wrapper.find('#loginButton').exists()).toBeTruthy();
  });
});