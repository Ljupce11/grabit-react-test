import { BucketObject } from "../interfaces/interfaces"

export const calculateBucketStorageSize = (bucketObjects: BucketObject[]) => {
  let totalStorageSize = 0
  if (bucketObjects && bucketObjects.length > 0) {
    bucketObjects.forEach(object => {
      totalStorageSize += Number(object.size)
    })
  } else {
    totalStorageSize = 0
  }
  return totalStorageSize
}