import styles from '../../../../styles/collectionPage/collectionPageContent/collectionPageContent.module.scss'
import {Affix, Button, Col, Divider, Image, Row} from 'antd'
import { parseImageUrl } from '../../../../utils/imageUtils'
import React, { useState } from 'react'
import {IProducts, IVariants} from '../../../../types'
import classnames from 'classnames'
import Gallery from "react-photo-gallery";
import { useEffect } from "react";

interface CollectionProductProps {
  product: IProducts
}

export const CollectionProduct: React.FC<CollectionProductProps> = ({ product }) => {
  const [variant, setVariant] = useState<IVariants>(product.variants[0])
  const variantClass = (variantId) => classnames([styles.variantName, {[styles.selected]: variantId === variant.id}])
  const photos = variant.image.map(({ url, width, height }) => ({
    src: parseImageUrl(url),
    width,
    height
  }))

   useEffect(() => {
    setVariant(product.variants[0]);
  }, [product.variants]);
  
  return (
    <Row className={styles.collectionProductRow} justify={"space-around"} align={"top"} style={{ padding: '4rem 0'}}>
      <Col span={6} lg={6} md={24} sm={24} xs={24} className={styles.itemDescription}>
          <div className={styles.productTitle}>
              <span className={styles.productName}>{product.name}</span>
              <span className={styles.productVariantName}>{variant.name}</span>
          </div>
          <div className={styles.productDescription}>
              <p>{variant.description}</p>
          </div>
          <Divider> Details </Divider>
          <div className={styles.productDetails}>
              {product.productDetails.map( detail => (
                  <div className={styles.detailContainer}>
                      <span className={styles.detailName}>{detail.name}:</span>
                      <span className={styles.detailValue}>{detail.value}</span>
                  </div>
              ))}
          </div>
          <Divider> Variants </Divider>
          <div className={styles.productVariants}>
              {product.variants.map( variant => (
                  <Button
                      className={variantClass(variant.id)} size={"large"}
                      onClick={() => setVariant(variant)}
                  >
                      {variant.name}
                  </Button>
              ))}
          </div>
      </Col>
      <Col span={14} lg={14} md={24} sm={24} xs={24} className={styles.gallery}>
        <Gallery
          photos={photos}
          direction={'column'}
          margin={10}
          columns={() => 1}
        />
      </Col>
    </Row>
  )
}


