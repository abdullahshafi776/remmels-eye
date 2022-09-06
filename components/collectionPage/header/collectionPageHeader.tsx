import { useCollectionPageHeader } from './useCollectionPageHeader'
import { Button } from 'antd'
import { CaretLeftOutlined } from '@ant-design/icons'
import React from 'react'
import styles from '../../../styles/collectionPage/collectionPageHeader/collectionPageHeader.module.scss'

interface CollectionPageHeaderProps {
  backgroundColor: string,
  textColor: string,
  collectionTitle: string
}

export const CollectionPageHeader: React.FC<CollectionPageHeaderProps>= ({ textColor, backgroundColor, collectionTitle }) => {
  const { goHome } = useCollectionPageHeader()

  return (
    <div className={styles.collectionHeader} style={{ backgroundColor }}>
      <div className={styles.back}>
        <Button
          onClick={goHome}
          style={{ backgroundColor, color: textColor, border: `1px solid ${textColor}` }}
          icon={<CaretLeftOutlined />}>
          Back
        </Button>
      </div>

      <div className={styles.title}>
        <p className={styles.subtitle}>COLLECTION</p>
        <p className={styles.collectionTitle}>{ collectionTitle }</p>
      </div>

      <div>
        <p>actions</p>
      </div>
    </div>
  )
}
