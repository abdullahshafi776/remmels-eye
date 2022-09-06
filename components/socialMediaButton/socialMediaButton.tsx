import styles from "../../styles/socialMediaButton/socialMediaButton.module.scss"
import {useCallback, useState} from "react";
import classnames from "classnames";
import Goo from 'gooey-react'
import {InstagramOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {useRouter} from "next/router";

export const SocialMediaButton = () => {
  const { push } = useRouter()
  const goToInstagram = useCallback(() => push('https://www.instagram.com/rimmeleyewear/'),[])
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={goToInstagram}>
        <InstagramOutlined className={styles.icon}/>
        <span className={styles.text}>
          Check out our Instagram!
        </span>
      </button>
    </div>
  )
}