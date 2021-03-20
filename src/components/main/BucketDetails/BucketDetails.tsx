import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useParams } from 'react-router';

import { fetchDelete } from '../../../services/services';
import { Bucket, BucketObject, ShowDeleteObjectModal } from '../../../interfaces/interfaces';
import { BucketDetailsTabsContent } from './BucketDetailsTabsContent/BucketDetailsTabsContent';
import { DeleteConfirmationModal } from '../../shared/DeleteConfirmationModal/DeleteConfirmationModal';
import { useFetchJson as fetchBucket, useFetchJson as fetchBucketObjects } from '../../../customHooks/useFetchJson';

export const BucketDetails: React.FC = () => {
  const params: { bucketId?: string } = useParams()
  const [activeTab, setActiveTab] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [bucketObjects, setBucketObjects] = useState<BucketObject[]>([])
  const [shouldFetchBucketnName, setShouldFetchBucketName] = useState<boolean>(true)
  const [shouldFetchBucketObjects, setShouldFetchBucketObjects] = useState<boolean>(true)
  const [showDeleteObjectModal, setShowDeleteObjectModal] = useState<ShowDeleteObjectModal>({ show: false, object: null })
  const [bucket, setBucket] = useState<Bucket>({ id: '', name: '', location: { id: '', name: '' } })

  fetchBucket((data) => setBucket(data), shouldFetchBucketnName, (value) => setShouldFetchBucketName(value), `buckets/${params.bucketId}`)

  fetchBucketObjects((data) => setBucketObjects(data), shouldFetchBucketObjects, (value) => setShouldFetchBucketObjects(value), `buckets/${params.bucketId}/objects`)

  const onDeleteObjectHandler = async () => {
    if (showDeleteObjectModal.object?.name) {
      setIsLoading(true)
      const res: any = await fetchDelete(`buckets/${bucket.id}/objects/${showDeleteObjectModal.object.name}`)
      if (res) {
        setIsLoading(false)
        if (res.status === 200) {
          setShowDeleteObjectModal({ show: false, object: null })
          setShouldFetchBucketObjects(true)
        } else {
          setErrorMessage('Something went wrong, please try again!')
        }
      }
    }
  }

  return (
    <React.Fragment>
      {
        showDeleteObjectModal &&
        <DeleteConfirmationModal
          itemType="object"
          isLoading={isLoading}
          errorMessage={errorMessage}
          show={showDeleteObjectModal.show}
          onDeleteHandler={onDeleteObjectHandler}
          onHide={() => setShowDeleteObjectModal({ show: false, object: null })} />
      }
      <div className="container">
        <h1 className="w-100 py-4 m-0">{bucket.name}</h1>
        <div className="row bg-light p-3">
          <div className="col-md-12">
            {/* Display tabs for files and details */}
            <Nav variant="tabs" defaultActiveKey={activeTab} onSelect={(selectedKey) => setActiveTab(Number(selectedKey))}>
              <Nav.Item>
                <Nav.Link eventKey={0}>Files</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={1}>Details</Nav.Link>
              </Nav.Item>
            </Nav>
            {/* Display content for the active tab */}
            <div className="bg-white border border-top-0 p-3">
              <BucketDetailsTabsContent
                bucket={bucket}
                activeTab={activeTab}
                bucketObjects={bucketObjects}
                updateBucketObjects={() => setShouldFetchBucketObjects(true)}
                showDeleteObjectModal={(show: boolean, object: BucketObject) => setShowDeleteObjectModal({ show: show, object: object })} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}