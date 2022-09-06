import { IFile } from './file';

/**
 * Model definition for variants
 */
export interface IVariants {
  id: string;
  name: string;
  image: IFile[];
  description: string;
}