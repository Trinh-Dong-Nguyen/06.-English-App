import { httpClient } from "@/services"

interface User {
  statusCode: number
  message: string
  data: {
    id: string
    role: string
    firstName: string
    lastName: string
    email: string
    phone: string
    birthDate: string
    avatarURL: null
    additionalInfo: {
      degree: string
    }
  }
}

class UserApi {
  constructor() {
    // httpClient.createAuthRefreshInterceptor(() => {
    //   this.logOut()
    //   window.location.href = AUTH_PATH_NAME.DANG_NHAP
    // })
  }

  async getUser() {
    // eslint-disable-next-line no-useless-catch
    console.log("getUser")
    try {
      console.log("getUser")
      const res = await httpClient.get<User>("/user/me")
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

const userApi = new UserApi()

export default userApi
