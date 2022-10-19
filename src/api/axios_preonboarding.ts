import axios from "axios";
import server from "./url";

const axios_preonboarding = axios.create({
  baseURL: server.preOnboarding,
});

export default axios_preonboarding;
