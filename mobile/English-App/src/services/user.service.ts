import http from "./Http";

class UserService {
  async getUser() {
    try {
      const response = await http.get("user/me");
      return response;
    } catch (error: any) {
      throw new Error(`HTTP error! status: ${error.message}`);
    }
  }
  async updateUser(data: object) {
    try {
      const response = await http.patch("user/update", data);
      return response;
    } catch (error: any) {
      throw new Error(`HTTP error! status: ${error.message}`);
    }
  }
  async getImageUrl(contentType: string, extension: string) {
    try {
      const response = await http.get("file/presigned-url?contentType=" + contentType + "&extension=" + extension);
      return response;
    } catch (error: any) {
      throw new Error(`HTTP error! status: ${error.message}`);
    }
  }
}

export default new UserService();
