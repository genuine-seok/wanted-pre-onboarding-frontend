import server from "./url";
import axios_preonboarding from "./axios_preonboarding";

export type UserInfoProps = {
  email: string;
  password: string;
};

const AUTH_API = {
  baseURL() {
    return server.preOnboarding;
  },
  signUp(data: UserInfoProps) {
    return axios_preonboarding.post(this.baseURL() + "auth/signup", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  signIn(data: UserInfoProps) {
    return axios_preonboarding.post(this.baseURL() + "auth/signin", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default AUTH_API;
