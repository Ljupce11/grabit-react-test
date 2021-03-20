import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useFetchJson } from '../../../../customHooks/useFetchJson';

import { BucketFormData, Location } from '../../../../interfaces/interfaces';

interface Props {
  formData: BucketFormData
  onSubmitHandler: (e: any) => void
  onChangeHandler: (e: any) => void
  createBucketErrorMessage: string | null
}

export const CreateBucketForm: React.FC<Props> = ({ formData, onSubmitHandler, onChangeHandler, createBucketErrorMessage }) => {
  const [locations, setLocations] = useState<Location[]>([])
  const [shouldFetch, setShouldFetch] = useState<boolean>(true)

  useFetchJson((data) => setLocations(data), shouldFetch, (value) => setShouldFetch(value), 'locations')

  return (
    <React.Fragment>
      <h5>Create new bucket</h5>
      <div className="row bg-light p-3 mb-3">
        <form onSubmit={onSubmitHandler} className="w-100">
          <div className="form-group">
            <label>Name</label>
            <input
              required
              autoFocus
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter name"
              value={formData.name}
              onChange={onChangeHandler} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <select name="location" required className="custom-select" onChange={onChangeHandler}>
              <option value="">Choose...</option>
              {
                locations.map((location, key) => (
                  <option key={key} value={location.id}>{location.name}</option>
                ))
              }
            </select>
          </div>
          {
            createBucketErrorMessage &&
            <Alert variant='danger'>
              {createBucketErrorMessage}
            </Alert>
          }
          <button type="submit" className="btn btn-primary">Create Bucket</button>
        </form>
      </div>
    </React.Fragment>
  )
}