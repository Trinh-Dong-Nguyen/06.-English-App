import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";

class Http {
  baseUrl: string;
  accessToken: string | null = null;

  constructor() {
    this.baseUrl = API_URL;
    this.initializeToken();
  }

  private async initializeToken() {
    this.accessToken = await SecureStore.getItemAsync("accessToken");
  }

  private getURL(url: string) {
    return `${this.baseUrl}${url}`;
  }

  private async getHeaders() {
    if (!this.accessToken) {
      this.accessToken = await SecureStore.getItemAsync("accessToken");
    }
    return {
      accept: "*/*",
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  private async refreshToken() {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    if (refreshToken) {
      const response = await fetch(this.getURL("auth/refresh-token"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      })
        .then((res) => res.json())
        .catch((error) => {
          console.error("Failed to refresh token:", error);
          throw error;
        });
      if (response.statusCode === 201) {
        console.log("Token refreshed");
        const newAccessToken = response.data.accessToken;
        await this.setAccessToken(newAccessToken);
        await SecureStore.setItemAsync("accessToken", newAccessToken);
        return newAccessToken;
      } else {
        throw new Error(
          "Failed to refresh token: " +
            response.statusCode +
            " " +
            response.message
        );
      }
    } else {
      throw new Error("No refresh token available");
    }
  }

  private async requestWithRetry(
    method: string,
    endpoint: string,
    data?: object
  ) {
    const url = this.getURL(endpoint);
    const headers = await this.getHeaders();
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    let response = await fetch(url, options);
    if (response.status === 401) {
      try {
        const newAccessToken = await this.refreshToken();
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        response = await fetch(url, options);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        throw error;
      }
    }

    return response.json();
  }

  async get(endpoint: string) {
    return this.requestWithRetry("GET", endpoint);
  }

  async post(endpoint: string, data: object) {
    return this.requestWithRetry("POST", endpoint, data);
  }

  async put(endpoint: string, data: object) {
    return this.requestWithRetry("PUT", endpoint, data);
  }
  async patch(endpoint: string, data: object) {
    return this.requestWithRetry("PATCH", endpoint, data);
  }

  async delete(endpoint: string) {
    return this.requestWithRetry("DELETE", endpoint);
  }

  async setAccessToken(token: string) {
    this.accessToken = token;
    await SecureStore.setItemAsync("accessToken", token);
  }
}

const http = new Http();
export default http;
