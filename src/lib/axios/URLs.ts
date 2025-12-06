import { AppConfig } from "@/config/env.config";

export const BaseUrl = AppConfig.apiBaseUrl;

export const GET_DISTRICTS_URL = `${BaseUrl}/KeyValue/GetDistrictsInKeyValue`;
