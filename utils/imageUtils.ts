
export const parseImageUrl = (url: string) =>
  process.env.NODE_ENV === 'production' ? url : `${url}`
