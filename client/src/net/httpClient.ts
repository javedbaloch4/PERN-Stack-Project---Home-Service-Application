import axiosClient from "axios";
import type { AxiosRequestConfig } from "axios";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import { notifiy } from "../redux/features/notifications/slice";
import { store } from "../redux/store";

/**
 * Creates an initial 'axios' instance with custom settings.
 */
const instance = axiosClient.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    if (err.response) {
      return Promise.reject(err.response.data);
    }

    if (err.request) {
      return Promise.reject(err.request);
    }

    return Promise.reject(err.message);
  }
);

/**
 * Replaces main `axios` instance with the custom-one.
 *
 * @param cfg - Axios configuration object.
 * @returns A promise object of a response of the HTTP request with the 'data' object already
 * destructured.
 */
const httpClient = <T>(cfg: AxiosRequestConfig) =>
  instance.request<any, T>(cfg);

export default httpClient;
