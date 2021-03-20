import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';

import { ErrorMessageContext } from '../../../../context/ErrorMessageContext';
import { CreateBucketForm } from './CreateBucketForm';

describe('CreateBucketForm', () => {
  const errorMessage = ''
  const setErrorMessage = jest.fn()
  const formDataMock = { name: 'test', location: 'testLocation' }
  const onChangeHandler = jest.fn()
  const onSubmitHandler = jest.fn()

  it('should render without crashing and call methods when triggered', () => {
    const wrapper = mount(
      <ErrorMessageContext.Provider value={{ errorMessage, setErrorMessage }}>
        <CreateBucketForm
          formData={formDataMock}
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
          createBucketErrorMessage={''} />
      </ErrorMessageContext.Provider>)
    wrapper.find('input').simulate('change', { target: { name: "name", value: 'test' } })
    expect(onChangeHandler).toHaveBeenCalled()
    expect(wrapper.find('input').prop('value')).toEqual('test')
    wrapper.find('select').simulate('change', { target: { name: "name", value: 'test' } })
    expect(onChangeHandler).toHaveBeenCalled()
    wrapper.find('form').simulate('submit')
    expect(onSubmitHandler).toHaveBeenCalled()
  });

  it('should fetch data and update state', async () => {
    let wrapper: any;
    const fakeResponse = { locations: [{ id: 'test1', name: 'Name1' }] }
    const mockFetch: any = Promise.resolve({ json: () => Promise.resolve(fakeResponse) });
    const mockedFetch = jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetch)

    await act(async () => {
      await waitFor(() => {
        wrapper = mount(
          <ErrorMessageContext.Provider value={{ errorMessage, setErrorMessage }}>
            <CreateBucketForm
              formData={formDataMock}
              onChangeHandler={onChangeHandler}
              onSubmitHandler={onSubmitHandler}
              createBucketErrorMessage={'Test Error'} />
          </ErrorMessageContext.Provider>)
      })
    })
    wrapper.update();
    expect(wrapper.find('option').at(1).text()).toEqual('Name1')
    expect(wrapper.find('div.alert-danger').text()).toEqual('Test Error')
  });
});