import {Col, Row} from "antd";
import {InstagramOutlined} from "@ant-design/icons";
import React from "react";
import {Footer} from "antd/lib/layout/layout";
import styles from "../../styles/socialMediaButton/socialMediaButton.module.scss";

export const AppFooter = () => {
  return (
    <Footer>
      <Row align={"middle"} justify={"center"}>
        <Col span={24}>
          <Row align={"middle"} justify={"center"}>
            <InstagramOutlined className={styles.icon}/>
          </Row>
          <Row align={"middle"} justify={"center"}>
             <span>© {new Date().getFullYear()} Rimmeleyewear</span>
          </Row>
        </Col>
      </Row>
    </Footer>
  )
}
