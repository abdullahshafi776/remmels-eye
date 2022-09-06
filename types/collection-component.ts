import { IFile } from './file';
import {ICollection} from "./collection";

/**
 * Model definition for CollectionComponent
 */
export interface ICollectionComponent {
  id: string;
  image?: IFile;
  collectionRef?: ICollection;
}