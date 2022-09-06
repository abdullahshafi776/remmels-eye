import { useRouter } from 'next/router'

export const useCollectionPageHeader = () => {
  const { push } = useRouter()

  const goHome = () => push('/',undefined, {shallow: true})

  return {
    goHome
  }
}
