import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios"
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh"
import _createAuthRefreshInterceptor from "axios-auth-refresh"
import authApi from "./auth.service"

class HttpClient {
  baseUrl: string
  instance: AxiosInstance

  constructor() {
    this.baseUrl = "https://api.engdigo.loingtan.id.vn/api"
    this.instance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
    })
  }

  private getUrl(endpoint: string) {
    return `${this.baseUrl}${endpoint}`
  }

  async get<T>(endpoint: string, config?: AxiosAuthRefreshRequestConfig) {
    const response = await this.instance.get<T>(this.getUrl(endpoint), config)
    return response.data
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post<T>(endpoint: string, data?: object, config?: AxiosAuthRefreshRequestConfig) {
    const response = await this.instance.post<T>(this.getUrl(endpoint), data, config)
    return response.data
  }

  async patch<T>(endpoint: string, data?: object, config?: AxiosAuthRefreshRequestConfig) {
    const response = await this.instance.patch<T>(this.getUrl(endpoint), data, config)
    return response.data
  }

  async put<T>(endpoint: string, data?: object, config?: AxiosAuthRefreshRequestConfig) {
    const response = await this.instance.put<T>(this.getUrl(endpoint), data, config)
    return response.data
  }

  async delete<T>(endpoint: string, config?: AxiosAuthRefreshRequestConfig) {
    const response = await this.instance.delete<T>(this.getUrl(endpoint), config)
    return response.data
  }

  setAuthHeader(token: string) {
    console.log("SETAUTHHEADE", token)
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }

  removeAuthHeader() {
    delete this.instance.defaults.headers.common["Authorization"]
  }

  createAuthRefreshInterceptor(onSuccess: (token: string) => void, onError: (error: AxiosError) => void) {
    _createAuthRefreshInterceptor(
      this.instance,
      async (failedRequest) => {
        try {
          const { accessToken } = (await authApi.refreshToken()) ?? {}
          if (accessToken) {
            failedRequest.response.config.headers["Authorization"] = "Bearer " + accessToken
            onSuccess && onSuccess(accessToken)
          } else {
            throw new Error("Access token is undefined.")
          }
          return Promise.resolve()
        } catch (error) {
          onError && onError(error as AxiosError)
          return Promise.reject(error)
        }
      },
      {
        pauseInstanceWhileRefreshing: true,
        statusCodes: [401],
      },
    )
  }
}

export function handleError(error: AxiosError, onError?: (error: AxiosResponse) => void) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status >= 500 && error.response.status < 600) {
        throw new Error("Đã có lỗi xãy ra. Vui lòng thử lại sau.")
      }

      onError?.(error.response)
    } else {
      throw new Error("Đã có lỗi xãy ra. Vui lòng thử lại sau.")
    }
  } else {
    throw new Error("Đã có lỗi xãy ra. Vui lòng thử lại sau.")
  }
}

const httpClient = new HttpClient()

export default httpClient
