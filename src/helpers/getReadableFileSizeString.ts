export const getReadableFileSizeString = (fileSizeInBytes: number) => {
  let i = -1;
  const byteUnits = [' KB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];

  do {
    fileSizeInBytes = fileSizeInBytes / 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0).toFixed(1) + byteUnits[i];
};