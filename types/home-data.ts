import { IFile } from './file';

/**
 * Model definition for homeData
 */
export interface IHomeData {
  id: string;
  background?: IFile;
  featuredImages: IFile[];
}