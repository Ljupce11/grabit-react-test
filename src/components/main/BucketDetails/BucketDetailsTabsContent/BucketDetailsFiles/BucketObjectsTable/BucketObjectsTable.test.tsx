import React from 'react';
import { mount } from 'enzyme';
import { BucketObjectsTable } from './BucketObjectsTable';

describe('BucketObjectsTable', () => {
  it('should render h4 text element', () => {
    const setChecked = jest.fn()
    const wrapper = mount(<BucketObjectsTable checked={0} bucketObjects={[]} setChecked={setChecked} />)
    expect(wrapper.find('h4').text()).toEqual('No bucket objects found!')
  });

  it('should render table with objects without crashing', () => {
    const bucketObjectsMockData = [{ name: 'test', size: '1024', last_modified: '01-01-2021' }]
    const setChecked = jest.fn()
    const wrapper = mount(<BucketObjectsTable checked={0} bucketObjects={bucketObjectsMockData} setChecked={setChecked} />)
    wrapper.find('input').simulate('change')
    expect(setChecked).toHaveBeenCalledWith(null)

    const wrapper2 = mount(<BucketObjectsTable checked={1} bucketObjects={bucketObjectsMockData} setChecked={setChecked} />)
    wrapper2.find('input').simulate('change')
    expect(setChecked).toHaveBeenCalledWith(0)
  });
});