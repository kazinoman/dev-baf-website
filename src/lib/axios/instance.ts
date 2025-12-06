import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "./helpers";
import { ApiEnvelope } from "./type";
import { AppConfig } from "@/config/env.config";

const BASE_URL = AppConfig.apiBaseUrl;
const TIMEOUT_MS = 100_000;

type AnyDict = Record<string, any>;

function createHttp(): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT_MS,
    withCredentials: true,
    headers: { Accept: "application/json" },
  });

  instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const token = await getAccessToken();
    const headers = new AxiosHeaders(config.headers);

    headers.set("Accept", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    else headers.delete("Authorization");

    if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");

    config.headers = headers;
    return config;
  });

  instance.interceptors.response.use(
    (res: AxiosResponse<any>) => {
      // If API already matches new envelope, pass through
      if (res.data && typeof res.data === "object" && "success" in res.data && "statusCode" in res.data) {
        return res;
      }

      // Wrap old response into new envelope (optional)
      const wrapped: ApiEnvelope = {
        success: true,
        message: "OK",
        statusCode: res.status ?? 200,
        errors: null,
        data: res.data ?? null,
      };

      (res as any).data = wrapped;
      return res;
    },
    (err: AxiosError<any>) => {
      const srv = err.response?.data as AnyDict | undefined;
      const status = err.response?.status ?? 0;

      const envelope: ApiEnvelope = {
        success: false,
        message: (srv?.message as string) ?? err.message ?? "Request failed",
        statusCode: (srv?.statusCode as number) ?? status,
        errors: Array.isArray(srv?.errors) ? srv.errors : [srv?.message ?? err.message],
        data: srv?.data ?? null,
      };

      return Promise.reject(envelope);
    }
  );

  return instance;
}

const http = createHttp();
export default http;
