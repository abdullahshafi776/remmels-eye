import { IFile } from './file';
import { IProducts } from './products';
import { ITheme } from './theme';

/**
 * Model definition for Collection
 */
export interface ICollection {
  id: string;
  title?: string;
  thumbnail?: IFile;
  products: IProducts[];
  theme: ITheme;
  slug: string;
  description: string;
}