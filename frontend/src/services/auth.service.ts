import { httpClient } from "@/services"
import { SignInPayload } from "@/type/auth"
class AuthApi {
  constructor() {}
  async signIn(data: SignInPayload) {
    try {
      const res = await httpClient.post<{ data: { accessToken: string } }>("/auth/sign-in", data)
      return { accessToken: res.data.accessToken }
    } catch (error) {
      console.log(error)
    }
  }
  async signUp() {
    try {
      const res = await httpClient.post("/auth/logout")
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async signOut() {
    try {
      const res = await httpClient.delete("/auth/sign-out")
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async confirmSignUp() {}
  async forgotPassword() {}
  async confirmForgotPassword() {}
  async refreshToken() {
    try {
      const res = await httpClient.post<{ data: { accessToken: string } }>("/auth/refresh-token")
      return { accessToken: res.data.accessToken }
    } catch (error) {
      console.log(error)
    }
  }
  async OAuthCallBack() {}
}
const authApi = new AuthApi()
export default authApi
