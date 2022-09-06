import {useContext} from "react";
import {HomeContext} from "../../../pages";
import dynamic from "next/dynamic";
import classnames from "classnames";
import styles from "../../../styles/home.module.scss";
import {parseImageUrl} from "../../../utils/imageUtils";
import {Col, Divider, Row} from "antd";
import {ExpandAltOutlined, FireOutlined, SafetyCertificateOutlined} from "@ant-design/icons";
import {v4 as uuidv4} from "uuid";

const Carroussel = dynamic(() => import("../featuredImages/featuredImagesCarrousel"), {ssr: false});

export const ValuesSection = () => {
  const homeData = useContext(HomeContext)
  const valuesPageClass = classnames(styles.mainPageSection, styles.valuesPage)
  const featuredImagesClass = classnames(styles.image, styles.featuredImage)


  const slides = homeData.resources.featuredImages.map(image => ({
    key: uuidv4(),
    content: <img className={featuredImagesClass} src={parseImageUrl(image.url)}/>
  }))

  return (
    <>
      <Row align={"middle"} justify={"center"} className={styles.textBanner}>
        <Col span={24}>
          <h3>
            <span> Rimmel Eyewear's most exclusive collection </span>
            <p>Our optical frames and sunglasses are handcrafted with the finest materials
              in the optical field pursuing not solely quality but also a work of art on each frame.</p>
          </h3>
        </Col>
      </Row>
      <div className={valuesPageClass}>
        <Row className={styles.valuesPageContent} align={"middle"}>
          <Col lg={12} md={24} sm={24} xs={24} className={styles.values}>
            <h3>Not only fashion</h3>

            <Row className={styles.value}>
              <Col lg={2} md={4} sm={4} xs={4}>
                <SafetyCertificateOutlined className={styles.valuesIcon}/>
              </Col>
              <Col lg={16} md={18} sm={18} xs={18}>
                <h3> Quality </h3>
                <p>
                  Our Atelier's core values and love relies on handcrafting top
                  of the line with an environmentally friendly perspective.
                </p>
              </Col>
            </Row>

            <Row className={styles.value}>
              <Col lg={2} md={4} sm={4} xs={4}>
                <ExpandAltOutlined className={styles.valuesIcon}/>
              </Col>
              <Col lg={16} md={18} sm={18} xs={18}>
                <h3> Different </h3>
                <p>
                   Our philosophy is to be trendy and different designing from
                  scratch eyewear that is bold and unique.
                </p>
              </Col>
            </Row>

            <Row className={styles.value}>
              <Col lg={2} md={4} sm={4} xs={4}>
                <FireOutlined className={styles.valuesIcon}/>
              </Col>
              <Col lg={16} md={18} sm={18} xs={18}>
                <h3> Fashionable </h3>
                <p>
                 Eyewear is Fashion - plain and simple.
                </p>
              </Col>
            </Row>

          </Col>

          <Col lg={12} md={24} sm={24} xs={24}>
            <Carroussel
              cards={slides}
              height="400px"
              width="100%"
              offset={2}
              showArrows={false}
            />
          </Col>
        </Row>
      </div>
    </>
  )
}
