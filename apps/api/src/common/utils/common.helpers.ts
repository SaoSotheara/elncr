export const getFileExtension = (filename: string) => {
  const ext = /^.+\.([^.]+)$/.exec(filename);
  return ext === null ? '' : ext[1];
};
