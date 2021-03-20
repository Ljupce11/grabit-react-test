import { BucketObject } from "../interfaces/interfaces";
import { calculateBucketStorageSize } from "./calculateBucketStorageSize";

describe('calculateBucketStorageSize', () => {
  it('should return total size', () => {
    const bucketObjectsMockData: BucketObject[] = [{ name: '', size: '2500', last_modified: '' }, { name: '', size: '1000', last_modified: '' }]
    const totalSize = calculateBucketStorageSize(bucketObjectsMockData)
    expect(totalSize).toEqual(3500)
  });

  it('should return 0', () => {
    const totalSize = calculateBucketStorageSize([])
    expect(totalSize).toEqual(0)
  });
});