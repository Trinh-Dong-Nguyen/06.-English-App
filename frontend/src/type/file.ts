import { Response } from "."

export interface preSignedUrlRes extends Response {
  data: {
    preSignedUrl: string
    key: string
  }
}
