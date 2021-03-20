import { shallow } from 'enzyme';
import React from 'react';
import { Bucket } from '../../../interfaces/interfaces';
import { BucketsTable } from './BucketsTable';

describe('BucketsTable', () => {
  const bucketsMockData: Bucket[] = [{ id: 'test', name: 'test', location: { id: 'test', name: 'Test' } }]
  it('should render without crashing', () => {
    const wrapper = shallow(<BucketsTable buckets={bucketsMockData} />)
    expect(wrapper.find('Link').first().prop('to')).toEqual(`/buckets/${bucketsMockData[0].id}`)
    expect(wrapper.find('td').at(1).text()).toEqual(bucketsMockData[0].location.name)
  });
});