import React from 'react';
import { mount, shallow } from 'enzyme';
import { BucketDetailsTabsContent } from './BucketDetailsTabsContent';
import { ErrorMessageContext } from '../../../../context/ErrorMessageContext';

describe('BucketDetailsTabsContent', () => {
  const errorMessage = ''
  const setErrorMessage = jest.fn()
  const bucket = { name: 'test', id: 'test', location: { id: 'testId', name: 'testName' } }
  const bucketObjects = [{ name: 'test', size: '1024', last_modified: '01-01-2021' }]
  const updateBucketObjects = jest.fn()
  const showDeleteObjectModal = jest.fn()

  it('should return null', () => {
    const wrapper = shallow(<BucketDetailsTabsContent
      activeTab={2}
      bucket={bucket}
      bucketObjects={bucketObjects}
      updateBucketObjects={updateBucketObjects}
      showDeleteObjectModal={showDeleteObjectModal} />)
    expect(wrapper.type()).toBe(null)
  });

  it('should render BucketDetailsFiles component', () => {
    const wrapper = mount(
      <ErrorMessageContext.Provider value={{ errorMessage, setErrorMessage }}>
        <BucketDetailsTabsContent
          activeTab={0}
          bucket={bucket}
          bucketObjects={bucketObjects}
          updateBucketObjects={updateBucketObjects}
          showDeleteObjectModal={showDeleteObjectModal} />
      </ErrorMessageContext.Provider>)
    expect(wrapper.find('strong').text()).toEqual('All files (1)')
  });

  it('should render BucketDetailsTab component', () => {
    const wrapper = mount(
      <ErrorMessageContext.Provider value={{ errorMessage, setErrorMessage }}>
        <BucketDetailsTabsContent
          activeTab={1}
          bucket={bucket}
          bucketObjects={bucketObjects}
          updateBucketObjects={updateBucketObjects}
          showDeleteObjectModal={showDeleteObjectModal} />
      </ErrorMessageContext.Provider>)
    expect(wrapper.find('p').first().text()).toEqual('Bucket name: test')
  });
});