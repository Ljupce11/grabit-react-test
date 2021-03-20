import { mount } from "enzyme";
import React from "react";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

describe('DeleteConfirmationModal', () => {
  const onHide = jest.fn()
  const onDeleteHandler = jest.fn()
  it('should render without crashing', () => {
    const wrapper = mount(
      <DeleteConfirmationModal
        show={true}
        onHide={onHide}
        itemType={'bucket'}
        errorMessage={'Test'}
        onDeleteHandler={onDeleteHandler} />)
    expect(wrapper.find('div.modal-title').text()).toEqual('Delete bucket')
    expect(wrapper.find('p').text()).toEqual('Are you sure you would like to delete this bucket?')
  });

  it('should call onHide and onDeleteHandler when buttons are clicked', () => {
    const wrapper = mount(
      <DeleteConfirmationModal
        show={true}
        onHide={onHide}
        itemType={'bucket'}
        errorMessage={'Test'}
        onDeleteHandler={onDeleteHandler} />)
    wrapper.find('.btn-danger').simulate('click')
    expect(onDeleteHandler).toHaveBeenCalled()
    wrapper.find('.btn-secondary').simulate('click')
    expect(onHide).toHaveBeenCalled()
  });
});