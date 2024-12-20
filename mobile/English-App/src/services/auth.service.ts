import http from "./Http";

class AuthService {
  baseURI: string;
  constructor() {
    this.baseURI = "auth/";
  }
  private getURI(uri: string) {
    return `${this.baseURI}${uri}`;
  }
  async signUp(data: any) {
    return await http.post(this.getURI("sign-up"), data);
  }
  async signIn(data: any) {
    return await http.post(this.getURI("sign-in"), data);
  }
  async confirmSignUp(data: any) {
    return await http.post(this.getURI("confirm-sign-up"), data);
  }
  async forgotPassword(data: any) {
    return await http.post(this.getURI("forgot-password"), data);
  }
  async confirmForgotPassword(data: any) {
    return await http.post(this.getURI("confirm-forgot-password"), data);
  }
  async signOut() {
    return await http.post(this.getURI("sign-out"), {});
  }
  async resendConfirmationCode(data: any) {
    return await http.post(this.getURI("resend-confirmation-code"), data);
  }
}

const authService = new AuthService();
export default authService;
