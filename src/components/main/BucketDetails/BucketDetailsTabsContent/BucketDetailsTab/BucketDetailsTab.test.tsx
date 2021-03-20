import React from 'react';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { BucketDetailsTab } from './BucketDetailsTab';

describe('BucketDetailsTab', () => {
  const bucket = { name: 'test', id: 'test', location: { name: 'testLocation', id: 'testId' } }
  const bucketObjects = [{ name: 'test', size: '1024', last_modified: '01-01-2021' }]

  it('should render without crashing', async () => {
    mount(<BucketDetailsTab
      bucket={bucket}
      bucketObjects={bucketObjects} />)
  });

  it('should call onDeleteHandler', async () => {
    jest.mock('react-router-dom', () => ({
      useHistory: () => ({
        push: jest.fn(),
      }),
    }));

    const wrapper = mount(
      <BrowserRouter>
        <BucketDetailsTab
          bucket={bucket}
          bucketObjects={bucketObjects} />
      </BrowserRouter>)
    wrapper.find('.btn-danger').simulate('click')

    const fakeResponse = { status: 200 }
    const mockFetch: any = Promise.resolve(fakeResponse);
    const mockedFetch = jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetch)

    await act(async () => {
      wrapper.find('.btn-danger').first().simulate('click')
    })

    const fakeResponse2 = { status: 400 }
    const mockFetch2: any = Promise.resolve(fakeResponse2);
    const mockedFetch2 = jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetch2)

    await act(async () => {
      wrapper.find('.btn-danger').first().simulate('click')
    })

  });
});