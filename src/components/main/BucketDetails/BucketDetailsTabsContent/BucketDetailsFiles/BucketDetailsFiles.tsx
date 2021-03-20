import React, { useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';

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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Upload selected file when file input onChange is triggered
  const onChangeHandler = async (e: any) => {
    if (!isLoading) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)

      setIsLoading(true)
      const res: any = await fetchPostFile(`buckets/${bucket.id}/objects`, formData)
      if (res) {
        setIsLoading(false)
        if (document.querySelector("input")) {
          document.querySelector("input")!.value = "";
        }

        if (res.message) {
          setErrorMessage(res.message)
        } else {
          updateBucketObjects()
        }
      }
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

          <label htmlFor="file-upload" className={`btn btn-outline-primary m-0 ${isLoading ? 'disabled' : ''}`}>
            {
              isLoading &&
              <Spinner size="sm" className="mr-2" animation="border" />
            }
            Upload Object
          </label>
          <input onChange={(e) => onChangeHandler(e)} id="file-upload" type="file" className="d-none" />
        </div>
      </div>

      {/* Display bucket objects in a table */}
      <BucketObjectsTable
        bucketObjects={bucketObjects}
        checked={checked}
        setChecked={(value) => setChecked(value)} />

    </React.Fragment>
  )
}