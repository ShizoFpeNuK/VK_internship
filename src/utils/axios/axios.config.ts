import qs from "qs";
import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
	// baseURL: process.env.REACT_APP_SERVER_URL,
	baseURL: "http://localhost",
	paramsSerializer: (params) => qs.stringify(params, { encode: false, arrayFormat: "repeat" }),
};

const kpAPI = axios.create(axiosConfig);

kpAPI.interceptors.request.use(async (config) => {
	config.headers["X-API-KEY"] = process.env.REACT_APP_API_KEY;

	return config;
});

export default kpAPI;
