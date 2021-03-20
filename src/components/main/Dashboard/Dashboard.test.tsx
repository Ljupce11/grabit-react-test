import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Dashboard } from './Dashboard';
import { ErrorMessageContext } from '../../../context/ErrorMessageContext';

describe('Dashboard', () => {
  const errorMessage = ''
  const setErrorMessage = jest.fn()

  it('should render without crashing', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init: any) => [init, setState])

    const wrapper = mount(
      <ErrorMessageContext.Provider value={{ errorMessage, setErrorMessage }}>
        <Dashboard />
      </ErrorMessageContext.Provider>)

    wrapper.find('.btn-primary').simulate('click')
    wrapper.find('input').simulate('change', { target: { name: 'name', value: 'test' } })
    expect(wrapper.find('input').prop('value')).toEqual('test')
  });

  it('should fetch data and update buckets state', async () => {
    let wrapper: any;
    const fakeResponse = { buckets: [{ id: 'test1', name: 'Name1', location: { id: 'test', name: 'Test' } }] }
    const mockFetch: any = Promise.resolve({ json: () => Promise.resolve(fakeResponse) });
    const mockedFetch = jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetch)

    await act(async () => {
      await waitFor(() => {
        wrapper = mount(
          <BrowserRouter>
            <ErrorMessageContext.Provider value={{ errorMessage, setErrorMessage }}>
              <Dashboard />
            </ErrorMessageContext.Provider>
          </BrowserRouter>)
      })
    })
    wrapper.update();
    wrapper.find('.btn-primary').simulate('click')

    const fakeResponse2 = { test: 'test' }
    const mockFetch2: any = Promise.resolve({ json: () => Promise.resolve(fakeResponse2) });
    const mockedFetch2 = jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetch2)

    await act(async () => {
      wrapper.find('form').simulate('submit')
    })

    const fakeResponse3 = { message: 'error' }
    const mockFetch3: any = Promise.resolve({ json: () => Promise.resolve(fakeResponse3) });
    const mockedFetch3 = jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetch3)

    await act(async () => {
      wrapper.find('form').simulate('submit')
    })

  });
});

