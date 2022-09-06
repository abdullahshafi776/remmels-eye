import '../styles/globals.css'
import {AppProps} from 'next/app'
import 'antd/dist/antd.css'
import React from 'react'
import {Layout} from 'antd'
import styles from '../styles/index.module.scss'
import {AppFooter} from "../components/footer/footer";
import {SocialMediaButton} from "../components/socialMediaButton/socialMediaButton";
import {Provider} from "react-redux";
import store from "../redux/store";
import {PersistGate} from "redux-persist/integration/react";
import { persistor } from "../redux/persistor";
import {Navbar} from "../components/homePage/navbar/navbar";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={ persistor }>
        <Layout className={styles.main}>
          <SocialMediaButton/>
          <Navbar/>
          <Component {...pageProps} />
          <AppFooter/>
        </Layout>
      </PersistGate>
    </Provider>
  )
}

export default App;
