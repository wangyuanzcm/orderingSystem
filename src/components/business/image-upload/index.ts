export { default as ImageUpload } from './index.vue';
type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

export interface ImageFileType {
  uid: string;
  name: string;
  url?: string;
  status: UploadFileStatus;
}
