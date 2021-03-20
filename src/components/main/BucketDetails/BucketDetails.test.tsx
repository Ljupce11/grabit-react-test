import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { act, waitFor } from '@testing-library/react';

import { BucketDetails } from './BucketDetails';
import { ErrorMessageContext } from '../../../context/ErrorMessageContext';

describe('BucketDetails', () => {
  const errorMessage = ''
  const setErrorMessage = jest.fn()

  const NewBucketDetails = () => {
    return (
      <ErrorMessageContext.Provider value={{ errorMessage, setErrorMessage }}>
        <BucketDetails />
      </ErrorMessageContext.Provider>
    )
  }

  it('should render without crashing', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
      useParams: () => ({
        bucketId: 'test1'
      }),
      useRouteMatch: () => ({ url: '/buckets/test1' }),
    }));

    mount(<BrowserRouter><NewBucketDetails /></BrowserRouter>)
  });

  it('should fetch bucket data and update state', async () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
      useParams: () => ({
        bucketId: 'test1'
      }),
      useRouteMatch: () => ({ url: '/buckets/test1' }),
    }));

    let wrapper: any;
    const fakeResponse = { bucket: { id: 'test1', name: 'Name1', location: { id: 'test', name: 'Test' } } }
    const mockFetch: any = Promise.resolve({ json: () => Promise.resolve(fakeResponse) });
    const mockedFetch = jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetch)

    const fakeResponse2 = { objects: [{ name: 'test', size: '1024', last_modified: '01-01-2021' }] }
    const mockFetch2: any = Promise.resolve({ json: () => Promise.resolve(fakeResponse2) });
    const mockedFetch2 = jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetch2)

    await act(async () => {
      await waitFor(() => {
        wrapper = mount(
          <BrowserRouter>
            <NewBucketDetails />
          </BrowserRouter>
        )
      })
    })
    wrapper.update();
    expect(wrapper.find('h1').text()).toEqual('Name1')
    expect(wrapper.find('strong').text()).toEqual('All files (1)')
    expect(wrapper.find('td').at(1).text()).toEqual('test')
  });
});