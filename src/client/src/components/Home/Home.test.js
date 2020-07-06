import React from 'react';
import {shallow} from 'enzyme';
import Home from './Home';

describe('<Home>', () => {
    let wrapper;
    
    beforeEach(() => {
      wrapper = shallow(<Home loggedIn={true} loaded={true} />);
    });

    test('Renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Show inital info message if not logged in', () => {
        let wrapper1 = shallow(<Home loggedIn={false} loaded={true}/>);
        expect(wrapper1.find('#infoMsg').exists()).toBeTruthy();
    });

    test('Show New Receipt button when logged in', () => {
        expect(wrapper.find('#newReceipt').exists()).toBeTruthy();
    });

    test('Show new receipt dialog box if new receipt button is toggled', () => {
        expect(wrapper.find("NewReceipt").exists()).toBeFalsy();
        wrapper.find('#newReceipt').simulate('click');
        expect(wrapper.find("NewReceipt").exists()).toBeTruthy();
        wrapper.find('#newReceipt').simulate('click');
        expect(wrapper.find("NewReceipt").exists()).toBeFalsy();
    });

    test('Check Receipts show', () => {
        let wrapper1 = shallow(<Home loggedIn={true} loaded={true}/>);
        wrapper1.setState({
            receipts: [{_id: 1},{_id: 2}, {_id: 3}]
        });
        expect(wrapper1.find("Receipt")).toHaveLength(3);
    });
  
});