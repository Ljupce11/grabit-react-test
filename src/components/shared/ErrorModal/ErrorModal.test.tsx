import React from 'react';
import { mount } from 'enzyme';
import { ErrorModal } from './ErrorModal';

describe('ErrorModal', () => {
  it('should render without crashing', () => {
    const onHide = jest.fn()
    const wrapper = mount(<ErrorModal show={true} onHide={onHide} errorMessage={'Test error'} />)
    expect(wrapper.find('h4').text()).toEqual('Test error')
    wrapper.find('.btn-secondary').simulate('click')
    expect(onHide).toHaveBeenCalled()
  });
});