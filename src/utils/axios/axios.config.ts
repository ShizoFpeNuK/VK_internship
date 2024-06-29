import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
	// withCredentials: true,
	baseURL: process.env.REACT_APP_SERVER_URL,
};

const kpAPI = axios.create(axiosConfig);

kpAPI.interceptors.request.use(async (config) => {
	config.headers["X-API-KEY"] = process.env.REACT_APP_API_KEY;

	return config;
});

export default kpAPI;
