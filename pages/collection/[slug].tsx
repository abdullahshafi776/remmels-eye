import { GetServerSideProps } from 'next'
import { ICollection } from '../../types'
import React, { useEffect } from 'react'
import { CollectionPageContent } from '../../components/collectionPage/content/collectionPageContent'
import { useDispatch } from "react-redux";
import { setCollections } from "../../redux/slices/appSlice";
import { useRouter } from "next/router";


interface CollectionPageProps {
  collection: ICollection
  collections: ICollection[]
}

export default function CollectionPage({ collection, collections }: CollectionPageProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCollections(collections))
  }, [])

  return (
    <div>
      <CollectionPageContent collection={collection} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apiUrl = process.env.HOST
  const { slug } = context.query
  const collection: ICollection = await fetch(`https://api.rimmeleyewear.com/collections/slug/${slug}`).then(res => res.json())
  const collections: ICollection[] = await fetch(`https://api.rimmeleyewear.com/collections`).then(res => res.json())

  if (!collection?.products?.length || !collections.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      collection,
      collections
    },
  }
}
