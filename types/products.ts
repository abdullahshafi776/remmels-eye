import { ICollection } from './collection';
import { IFile } from './file';
import {IVariants} from "./variants";
import {IProductDetails} from "./product-details";

/**
 * Model definition for products
 */
export interface IProducts {
  id: string;
  name?: string;
  collectionType?: ICollection;
  variants: IVariants[];
  productDetails: IProductDetails[];
}