import React from 'react';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';

import { ErrorMessageContext } from '../../../../../context/ErrorMessageContext';
import { BucketDetailsFiles } from './BucketDetailsFiles';

describe('BucketDetailsFiles', () => {
  const errorMessage = ''
  const setErrorMessage = jest.fn()
  const bucket = { name: 'test', id: 'test', location: { id: 'testId', name: 'testName' } }
  const bucketObjects = [{ name: 'test', size: '1024', last_modified: '01-01-2021' }]
  const updateBucketObjects = jest.fn()
  const showDeleteObjectModal = jest.fn()

  it('should render without crashing', () => {
    mount(
      <ErrorMessageContext.Provider value={{ errorMessage, setErrorMessage }}>
        <BucketDetailsFiles
          bucket={bucket}
          bucketObjects={bucketObjects}
          updateBucketObjects={updateBucketObjects}
          showDeleteObjectModal={showDeleteObjectModal} />
      </ErrorMessageContext.Provider>)
  });

  it('should call onChangeHandler for file upload', async () => {
    const wrapper = mount(
      <ErrorMessageContext.Provider value={{ errorMessage, setErrorMessage }}>
        <BucketDetailsFiles
          bucket={bucket}
          bucketObjects={bucketObjects}
          updateBucketObjects={updateBucketObjects}
          showDeleteObjectModal={showDeleteObjectModal} />
      </ErrorMessageContext.Provider>)


    const fakeResponse = { status: 'success' }
    const mockFetch: any = Promise.resolve({ json: () => Promise.resolve(fakeResponse) });
    const mockedFetch = jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetch)

    await act(async () => {
      wrapper.find('input').first().simulate('change')
    })

    expect(updateBucketObjects).toHaveBeenCalled()

    const fakeResponse2 = { message: 'error' }
    const mockFetch2: any = Promise.resolve({ json: () => Promise.resolve(fakeResponse2) });
    const mockedFetch2 = jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetch2)

    await act(async () => {
      wrapper.find('input').first().simulate('change')
    })

    expect(setErrorMessage).toHaveBeenCalled()

  });

  it('should call handler on Delete Object button click', () => {
    const wrapper = mount(
      <ErrorMessageContext.Provider value={{ errorMessage, setErrorMessage }}>
        <BucketDetailsFiles
          bucket={bucket}
          bucketObjects={bucketObjects}
          updateBucketObjects={updateBucketObjects}
          showDeleteObjectModal={showDeleteObjectModal} />
      </ErrorMessageContext.Provider>)
    wrapper.find('input.form-check-input').simulate('change')
    wrapper.find('.btn-outline-danger').simulate('click')
    expect(showDeleteObjectModal).toHaveBeenCalled()
  });
});