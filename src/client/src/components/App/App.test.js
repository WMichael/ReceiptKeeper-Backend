import React from 'react';
import App from './App';
import {shallow} from 'enzyme';
let wrapper;

describe('<App>', () => {

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Failed to Communicate message showing when authError', () => {
    wrapper.setState({
      authError: true
    });
    expect(wrapper.contains(<h2>Failed to communicate with the backend.</h2>)).toBeTruthy();
  })

  it('Show correct links when logged in', () => {
    wrapper.setState({
      loggedIn: true
    });
    expect(wrapper.find('#homeButton')).toBeTruthy();
  })
});