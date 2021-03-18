import React, { useState } from 'react';

import { useFetchJson } from '../../../customHooks/useFetchJson';
import { Bucket, BucketFormData } from '../../../interfaces/interfaces';
import { fetchPostJson as createBucket } from '../../../services/services';
import { BucketsTable } from '../../shared/BucketsTable/BucketsTable';
import { CreateBucketForm } from './CreateBucketForm/CreateBucketForm';

export const Dashboard: React.FC = () => {
  const [buckets, setBuckets] = useState<Bucket[]>([])
  const [shouldFetch, setShouldFetch] = useState<boolean>(true)
  const [showCreateBucket, setShowCreateBucket] = useState<boolean>(false)
  const [createBucketErrorMessage, setCreateBucketErrorMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState<BucketFormData>({ name: '', location: '' })

  useFetchJson((data) => setBuckets(data), shouldFetch, (value) => setShouldFetch(value), 'buckets')

  const onChangeHandler = (e: { target: { name: string, value: string } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitHandler = async (e: any) => {
    e.preventDefault()
    const response: any = await createBucket('buckets', formData)
    if (response.message) {
      setCreateBucketErrorMessage(response.message)
    } else {
      setShouldFetch(true)
      setShowCreateBucket(false)
      setCreateBucketErrorMessage(null)
      setFormData({ name: '', location: '' })
    }
  }

  return (
    <div className="container">
      <h1 className="w-100 py-4 m-0">Bucket list</h1>
      {
        showCreateBucket &&
        <CreateBucketForm
          formData={formData}
          onSubmitHandler={onSubmitHandler}
          onChangeHandler={onChangeHandler}
          createBucketErrorMessage={createBucketErrorMessage} />
      }
      <div className="row bg-light p-3">
        <div className="col-md-12">
          <div className="d-flex justify-content-between align-items-center w-100">
            <strong className="m-0">All buckets ({buckets.length})</strong>
            {
              !showCreateBucket &&
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowCreateBucket(true)}>Create New Bucket
              </button>
            }
          </div>
          {
            buckets.length > 0 ?
              <BucketsTable buckets={buckets} />
              :
              <h4 className="w-100 text-center">No buckets found!</h4>
          }
        </div>
      </div>
    </div>
  )
}