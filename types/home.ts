import { ICollection } from './collection';
import {IHomeData} from "./home-data";

/**
 * Model definition for Home
 */
export interface IHome {
  id?: string;
  featuredCollections: ICollection[];
  resources?: IHomeData;
}
