import axios, { AxiosResponse } from "axios";
import store, { setLoading } from "../../store";
import { onLogOut } from "../../store/authSlice";
import { cookieKeys } from "../constants/Constants";
import { getDecryyptedCookie, toastError } from "../functions";

export const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL
});

const errorInterceptor = (errorResponse: AxiosResponse) => {
	if (errorResponse) {
		const { status } = errorResponse.data;
		if (status === 401) {
			store.dispatch(onLogOut());
		} else {
			toastError(errorResponse.data.message);
		}
	}
	store.dispatch(setLoading(false));
};

axiosInstance.interceptors.request.use(
	(req) => {
		const cookie = getDecryyptedCookie(cookieKeys.cookieUser);
		// check for token
		if (cookie && cookie.token) {
			req.headers.Authorization = `Bearer ${cookie.token}`;
		}
		return req;
	},
	(err) => {
		// catches client side error like no internet etc
		return Promise.reject(err);
	}
);

axiosInstance.interceptors.response.use(
	(req) => {
		return req;
	},
	(err) => {
		errorInterceptor(err.response);
		return Promise.reject(err);
	}
);

export default class HTTPService {
	static get<T = never, R = AxiosResponse<T>>(url: string, params?: any): Promise<R> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.get(url, { params })
				.then((response) => resolve(response.data))
				.catch((error) => reject(error.response || error));
		});
	}

	static put<T = never, R = AxiosResponse<T>>(url: string, body: any): Promise<R> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.put(url, body)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error.response || error));
		});
	}

	static patch<T = never, R = AxiosResponse<T>>(url: string, body: any): Promise<R> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.patch(url, body)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error.response || error));
		});
	}

	static post<T = never, R = AxiosResponse<T>>(url: string, body: any): Promise<R> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.post(url, body)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error.response || error));
		});
	}

	static delete<T = never, R = AxiosResponse<T>>(url: string, body: any): Promise<R> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.delete(url, { data: body })
				.then((response) => resolve(response.data))
				.catch((error) => reject(error.response || error));
		});
	}

	static deleteWithParams<T = never, R = AxiosResponse<T>>(url: string, params: any): Promise<R> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.delete(url, params)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error.response || error));
		});
	}

	static userInfo<T = never, R = AxiosResponse<T>>(url: string, body: any): Promise<R> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.get(url, { data: body })
				.then((response) => resolve(response.data))
				.catch((error) => reject(error.response || error));
		});
	}

	static authenticateUserBstamp<T = never, R = AxiosResponse<T>>(url: string, body: any, config: any): Promise<R> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.post(url, body, config)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error.response || error));
		});
	}
}
