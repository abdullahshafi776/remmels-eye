import styles from '../../../styles/home.module.scss'
import {parseImageUrl} from '../../../utils/imageUtils'
import {Col, Divider, Image, Row, Typography} from "antd";
import classnames from "classnames";
import {useCallback, useContext} from "react";
import {HomeContext} from "../../../pages";
import {useRouter} from "next/router";

export const Main = () => {
  const homeData = useContext(HomeContext)
  const { push } = useRouter()
  const contentClassName = classnames(styles.content, styles.centeredContent)
  const route = useCallback((str: string) => () => push(str,undefined, {shallow: false}),[])
 const collectionData = homeData.featuredCollections.reverse();
  return (
    <div className={styles.mainPageSection}>
      <Row className={contentClassName} wrap={true}>
        <Col lg={5} md={24} sm={24} xs={24} style={{ height: '100%' }}>
          <div className={styles.featuredCollections}>
            <div>
              <h2> New </h2>
              <h2> Collections </h2>
              <Divider/>
            </div>
            <div className={styles.featuredCollectionsContainer}>
              { collectionData.map( collection => (
                <div className={styles.featuredCollection}>
                  <h3>{collection.title}</h3>
                  <p>{collection.description}</p>
                  <button onClick={route(`/collection/${collection.slug}`)}> Browse {collection.title} </button>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col lg={16} md={24} sm={24} xs={24}>
          <Image className={styles.image} src={parseImageUrl(homeData.resources.background.url)} preview={false}/>
        </Col>
      </Row>
    </div>
  )
}
