import React from 'react';

import { BucketDetailsTab } from './BucketDetailsTab/BucketDetailsTab';
import { BucketDetailsFiles } from './BucketDetailsFiles/BucketDetailsFiles';
import { Bucket, BucketObject } from '../../../../interfaces/interfaces';

interface Props {
  bucket: Bucket
  activeTab: number
  bucketObjects: BucketObject[]
  updateBucketObjects: () => void
  showDeleteObjectModal: (show: boolean, object: BucketObject) => void
}

export const BucketDetailsTabsContent: React.FC<Props> = ({ bucket, activeTab, bucketObjects, updateBucketObjects, showDeleteObjectModal }) => {
  if (activeTab === 0) {
    return (
      <BucketDetailsFiles
        bucket={bucket}
        bucketObjects={bucketObjects}
        updateBucketObjects={updateBucketObjects}
        showDeleteObjectModal={showDeleteObjectModal} />
    )
  } else if (activeTab === 1) {
    return (
      <BucketDetailsTab
        bucket={bucket}
        bucketObjects={bucketObjects} />
    )
  } else return null
}