import React from "react";
import styles from "../../../styles/navbar/navbar.module.scss";
import { useRouter } from "next/router";
import { Select } from "antd";
import Headroom from "react-headroom";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/store";
import { ICollection } from "../../../types";
const { Option } = Select;
import { Button, Modal } from "antd";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { MenuOutlined } from "@ant-design/icons";

interface Props { }

export const Navbar: React.FC<Props> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { push } = useRouter();
  const collections = useSelector<AppState, ICollection[]>(
    (state) => state.app.collections
  );

  return (
    <Headroom>
      <div className={styles.navbar}>
        <div className={styles.logo} onClick={() => push("/")}>
          <img src={"/rimmel-logo.png"} alt={"LOGO"} />
        </div>

        <div className={styles.rightmenu}>
          <div className={styles.navbarActions}>
            <Select
              className={styles.select}
              style={{ width: 200 }}
              placeholder="Collections"
              suffixIcon={null}
              onChange={(slug) => push(`/collection/${slug}`)}
              autoClearSearchValue
            >
              {collections.map((collection, id) => (
                <Option key={collection.id} value={collection.slug}>
                  {collection.title}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <img
              onClick={showModal}
              src="/image.png"
              className="slimo-image"
              style={{ cursor: "pointer" }}
              alt="LOGO"
              width={200}
            />

            <Modal
              title="Basic Modal"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div className="modal-content">
                <img width="100%" src="/image.png" alt="LOGO" />
                <img width="100%" src="/rimmel-popup-img.JPG" alt="" />
                <h2 className={styles.headerText}>YOU ARE INVITED</h2>
                <p>
                  Designed in Italy, we're thrilled to present a unique
                  collection that will revolutionize the optical world for
                  women's sunglasses & optical frames.
                </p>
                <p>
                  We would be delighted to meet you personally during this time.
                </p>
                <p>
                  Venue: Silmo Paris Paris-Nord Villepinte Parc des Expositions{" "}
                </p>
                <p>Dates: September 23 - 26, 2022 </p>
                <p>Hall: 5</p>
                <p className={styles.bodyText}>STAND: A53 / RIMMEL EYEWEAR</p>
              </div>
            </Modal>
          </div>
          <div style={{ marginTop: "10px", marginLeft: "16px" }}>
            <a
              className="catalogue-link"
              href="https://rimmel-eyewear-pictures.s3.us-east-2.amazonaws.com/RIMMEL_EYEWEAR_VISION_EXPO_68690e1bdc.pdf"
              target="_blank"
            >
              Catalogue
            </a>
          </div>
          <Link href="/store">
            <a className="store-btn">Store</a>
          </Link>
          <div className="contact-text">
            <a className="contact-us-link" href="mailto:info@rimmeleyewear.com">
              Contact us{" "}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="mobile_menu">
        <img onClick={() => push("/")} src="/rimmel-logo.png" alt="" />
        <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
          <Menu.SubMenu
            key="SubMenu"
            icon={
              <MenuOutlined
                style={{ fontSize: "25px", color: "000 !important" }}
              />
            }
          >
            <Menu key="seven">
              <div className={styles.navbarActions}>
                <Select
                  className={styles.select}
                  style={{ width: 200 }}
                  placeholder="Collections"
                  suffixIcon={null}
                  onChange={(slug) => push(`/collection/${slug}`)}
                  autoClearSearchValue
                >
                  {collections.map((collection, id) => (
                    <Option key={collection.id} value={collection.slug}>
                      {collection.title}
                    </Option>
                  ))}
                </Select>
              </div>
            </Menu>
            <Menu.Item key="three">
              <a className="mobile-menu" onClick={showModal}>
                Silmo
              </a>
            </Menu.Item>
            <Menu.Item key="four">
              <a
                className="mobile-menu"
                href="https://rimmel-eyewear-pictures.s3.us-east-2.amazonaws.com/RIMMEL_EYEWEAR_VISION_EXPO_68690e1bdc.pdf"
                target="_blank"
              >
                Catalogue
              </a>
            </Menu.Item>
            <Menu.Item key="five">
              <a className="mobile-menu" href="mailto:info@rimmeleyewear.com">
                Contact us
              </a>
            </Menu.Item>
            <Menu.Item key="six">
              <Link href="/store-locator">
                <a className="mobile-menu">Stores</a>
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    </Headroom>
  );
};
