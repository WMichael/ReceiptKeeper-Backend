import React from 'react';
import NewReceipt from './NewReceipt';
import {shallow} from 'enzyme';

describe('<NewReceipt>', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<NewReceipt />);
  });

  test('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Correct labels rendering', () => {
    expect(wrapper.find('#nameLbl').exists()).toBeTruthy();
    expect(wrapper.find('#descriptionLbl').exists()).toBeTruthy();
    expect(wrapper.find('#priceLbl').exists()).toBeTruthy();
    expect(wrapper.find('#imageUrlLbl').exists()).toBeTruthy();
    expect(wrapper.find('#purchaseDateLbl').exists()).toBeTruthy();
  });

  test('Correct inputs rendering', () => {
    expect(wrapper.find({name: 'name'}).exists()).toBeTruthy();
    expect(wrapper.find({name: 'description'}).exists()).toBeTruthy();
    expect(wrapper.find({name: 'price'}).exists()).toBeTruthy();
    expect(wrapper.find({name: 'image_url'}).exists()).toBeTruthy();
    expect(wrapper.find({name: 'purchaseDate'}).exists()).toBeTruthy();
  });

  test('Name is Untitled Receipt', () => {
    expect(wrapper.state('name')).toBe("Untitled Receipt");
  })
});