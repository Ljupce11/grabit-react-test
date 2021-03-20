import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { fetchDelete } from '../../../../../services/services';
import { Bucket, BucketObject } from '../../../../../interfaces/interfaces';
import { getReadableFileSizeString } from '../../../../../helpers/getReadableFileSizeString';
import { calculateBucketStorageSize } from '../../../../../helpers/calculateBucketStorageSize';
import { DeleteConfirmationModal } from '../../../../shared/DeleteConfirmationModal/DeleteConfirmationModal';

interface Props {
  bucket: Bucket
  bucketObjects: BucketObject[]
}

export const BucketDetailsTab: React.FC<Props> = ({ bucket, bucketObjects }) => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showDeleteBucketModal, setShowDeleteBucketModal] = useState<boolean>(false)

  const bucketStorageSize = getReadableFileSizeString(calculateBucketStorageSize(bucketObjects))

  const onDeleteHandler = async () => {
    setIsLoading(true)
    const res = await fetchDelete(`/buckets/${bucket.id}`)
    if (res) {
      setIsLoading(false)
      if (res.status === 200) {
        history.push('/')
      } else {
        setErrorMessage('Something went wrong, please try again!')
      }
    }
  }

  return (
    <React.Fragment>
      {
        showDeleteBucketModal &&
        <DeleteConfirmationModal
          itemType={"bucket"}
          isLoading={isLoading}
          errorMessage={errorMessage}
          show={showDeleteBucketModal}
          onDeleteHandler={onDeleteHandler}
          onHide={() => setShowDeleteBucketModal(false)} />
      }
      <p>Bucket name: {bucket.name}</p>
      <p>Location: {bucket.location.name}</p>
      <p>Storage size: {bucketStorageSize}</p>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => setShowDeleteBucketModal(true)}>
        Delete Bucket
      </button>
    </React.Fragment>
  )
}