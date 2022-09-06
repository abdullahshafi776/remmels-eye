import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { Main } from '../components/homePage/sections/main'
import { ICollection, IHome } from '../types'
import React, { useEffect } from 'react'
import { Navbar } from "../components/homePage/navbar/navbar";
import { ValuesSection } from "../components/homePage/sections/valuesSection";
import { useDispatch } from "react-redux";
import { setCollections } from "../redux/slices/appSlice";

interface Props {
  data: {
    homeData: IHome
    collections: ICollection[]
  }
}

export const HomeContext = React.createContext<IHome>({ resources: undefined, featuredCollections: [] })

export default function Home({ data }: Props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCollections(data.collections))
  }, [])

  return (
    <HomeContext.Provider value={data.homeData}>
      <div>
        <Head>
          <title>Rimmel Eyewear</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Main />
        <ValuesSection />
      </div>
    </HomeContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apiUrl = process.env.HOST
  const homeData: IHome = await fetch(`https://api.rimmeleyewear.com/home`).then(res => res.json())
  const collections: ICollection[] = await fetch(`https://api.rimmeleyewear.com/collections`).then(res => res.json())

  if (!homeData || !collections.length) {
    return {
      redirect: {
        destination: '/soon',
        permanent: true,
      },
    }
  }

  return {
    props: {
      data: {
        homeData,
        collections
      }
    },
  }
}
