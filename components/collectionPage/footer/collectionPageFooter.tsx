import React from 'react'
import styles from '../../../styles/collectionPage/collectionPageFooter/collectionPageFooter.module.scss'

interface CollectionPageFooterProps {
  backgroundColor: string,
  textColor: string
}

export const CollectionPageFooter: React.FC<CollectionPageFooterProps>= ({ textColor, backgroundColor }) => {

  return (
    <footer
      className={styles.footer}
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <div className={styles.contact}>
        <span> CONTACT: </span>
        <p> info@rimmeleyewear.com </p>
      </div>
    </footer>
  )
}
