
export interface StorageFile {
  id: string | null;
  filename: string | null;
  checksum: string | null;
  isUploaded: boolean | null;
  mediaType: string | null;
  message: string | null;
  size: number | null;
  creationTime: string | null;
  modificationTime: string | null;
}
