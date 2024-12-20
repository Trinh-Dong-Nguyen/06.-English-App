import { httpClient } from "@/services"
import { preSignedUrlRes } from "@/type/file"

class FileApi {
  constructor() {
    // httpClient.createAuthRefreshInterceptor(() => {
    //   this.logOut()
    //   window.location.href = AUTH_PATH_NAME.DANG_NHAP
    // })
  }

  async getPresignedUrl(contentType: string, extension: string) {
    try {
      const res = await httpClient.get<preSignedUrlRes>(
        `/file/presigned-url?contentType=${contentType}&extension=${extension}`,
      )
      return res
    } catch (error) {
      console.log(error)
    }
  }

  async uploadFile(presignedUrl: string, file: File) {
    // eslint-disable-next-line no-useless-catch
    const response = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type, // e.g., 'image/png'
      },
      body: file,
    })
    console.log("uploadFile", response)
    if (response.ok) {
      console.log("File uploaded successfully")
      return response
    } else {
      console.error("File upload failed", response.statusText)
    }
  }
}

const fileApi = new FileApi()

export default fileApi
