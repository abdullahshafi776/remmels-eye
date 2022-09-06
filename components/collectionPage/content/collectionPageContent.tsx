import styles from '../../../styles/collectionPage/collectionPageContent/collectionPageContent.module.scss'
import React from 'react'
import {ICollection} from '../../../types'
import {CollectionProduct} from './collectionProduct/collectionProduct'
import {CollectionComponent} from "./collection";

export const CollectionPageContent = ({ collection }: { collection: ICollection }) => {
  return (
    <>
      <CollectionComponent collection={collection}/>

      <div className={styles.content} id={'product-catalog'}>
        {collection.products.map( product => <CollectionProduct product={product}/>)}
      </div>
    </>
  )
}
