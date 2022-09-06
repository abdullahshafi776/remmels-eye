export type formats = "thumbnail" | "large" | "medium" | "small"

export interface Image {
  id: number
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats:{
    [K in formats]: ImageFormat
  },
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
}

export type ImageFormat = {
  name: string
  hash: string
  ext: string
  mime: string
  width: number,
  height: number,
  size: number,
  path: string | null,
  url: string
}
