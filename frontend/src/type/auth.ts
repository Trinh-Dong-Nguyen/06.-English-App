import { Response } from "./index"
export interface SignInPayload {
  username: string
  password: string
}
export interface ResSignIn extends Response {
  data: {
    accessToken: string
  }
}
