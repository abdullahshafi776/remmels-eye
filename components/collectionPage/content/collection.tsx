import styles from '../../../styles/collections/collection.module.scss'
import { parseImageUrl } from '../../../utils/imageUtils'
import React from 'react'
import {ICollection, ICollectionComponent} from '../../../types'
import classnames from 'classnames'
import { Button } from 'antd'
import { useRouter } from 'next/router'

interface CollectionProps {
  collection: ICollection,
  reverse?: boolean
}

export const CollectionComponent = ({ collection, reverse = false }: CollectionProps) => {
  const { push } = useRouter()

  const background = collection.theme.backgroundColor
  const textColor = collection.theme.textColor
  const imageUrl = collection.thumbnail.url
  const buttonBorder = `2px solid ${textColor}`
  const wrapperClassName = classnames([styles.collecionsWrapper, { [styles.reverse]: reverse }])
  const description = collection.description

  return (
    <div className={wrapperClassName} style={{ background }}>
      <div className={styles.collectionsTitle}>
        <div className={styles.titleContainer}>
          <h1> NEW COLLECTION </h1>
          <h2 style={{ color: textColor }}> {collection.title} </h2>
        </div>

        <div className={styles.descriptionContainer}>
          <div className={styles.description}>
            <p style={{ color: textColor }}>{description}</p>

            <Button
              style={{ color: textColor, border: buttonBorder }}
              onClick={() => document.getElementById('product-catalog')?.scrollIntoView({behavior: "smooth"})}
            >
              See collection
            </Button>
          </div>
        </div>

      </div>
      <div className={styles.collectionsImages}>
        <img src={parseImageUrl(imageUrl)}/>
      </div>
    </div>
  )
}
