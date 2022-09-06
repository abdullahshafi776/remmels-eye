import { Image } from './image'
import { ICollection } from './collection'
/**
 * Model definition for products
 */
export interface IProducts {
  id: string;
  name?: string;
  images: Image[];
  description?: string;
  collectionType?: ICollection;
  spotlight: Image
}
