import { getReadableFileSizeString } from "./getReadableFileSizeString";

describe('getReadableFileSizeString', () => {
  it('should return string as readable file size in KB', () => {
    const fileSize = getReadableFileSizeString(10024)
    expect(fileSize).toEqual('9.8 KB')
  });
});