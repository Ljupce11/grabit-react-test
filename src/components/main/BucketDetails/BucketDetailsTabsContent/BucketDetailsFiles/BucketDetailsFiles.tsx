import React, { useContext, useState } from 'react';

import { fetchPostFile } from '../../../../../services/services';
import { Bucket, BucketObject } from '../../../../../interfaces/interfaces';
import { ErrorMessageContext } from '../../../../../context/ErrorMessageContext';
import { BucketObjectsTable } from './BucketObjectsTable/BucketObjectsTable';

interface Props {
  bucket: Bucket
  bucketObjects: BucketObject[]
  updateBucketObjects: () => void
  showDeleteObjectModal: (show: boolean, object: BucketObject) => void
}

export const BucketDetailsFiles: React.FC<Props> = ({ bucket, bucketObjects, updateBucketObjects, showDeleteObjectModal }) => {
  const { setErrorMessage } = useContext(ErrorMessageContext)
  const [checked, setChecked] = useState<number | null>(null)

  const onChangeHandler = async (e: any) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)

    const res: any = await fetchPostFile(`buckets/${bucket.id}/objects`, formData)
    document.querySelector("input")!.value = "";

    if (res.message) {
      setErrorMessage(res.message)
    } else {
      updateBucketObjects()
    }
  }

  const showDeleteModalHandler = () => {
    if (checked !== null) {
      showDeleteObjectModal(true, bucketObjects[checked])
    }
  }

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between align-items-center w-100">
        <strong className="m-0">All files ({bucketObjects.length})</strong>
        <div>
          <button
            type="button"
            disabled={checked === null}
            onClick={showDeleteModalHandler}
            className="btn btn-outline-danger mr-2">Delete Object
          </button>
          <label htmlFor="file-upload" className="btn btn-outline-primary m-0">
            Upload Object
          </label>
          <input onChange={(e) => onChangeHandler(e)} id="file-upload" type="file" className="d-none" />
        </div>
      </div>

      <BucketObjectsTable
        bucketObjects={bucketObjects}
        checked={checked}
        setChecked={(value) => setChecked(value)} />

    </React.Fragment>
  )
}