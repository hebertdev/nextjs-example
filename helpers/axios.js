import Axios from "axios";

const baseURL = "http://localhost:8000";
let headers = {};

const axiosInstance = Axios.create({
  baseURL: baseURL,
  headers,
});

export default axiosInstance;
