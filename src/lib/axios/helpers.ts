// import { AppConfig } from "../config";
import http from "./instance";
import { ApiEnvelope } from "./type";

/**
 * JS doc
 * Serializes a plain object into a query string suitable for use with Axios'
 * `paramsSerializer` or manual URL construction.
 *
 * Behavior:
 * - Skips keys whose values are `null` or `undefined`.
 * - Appends **arrays** by repeating the key: `?tag=a&tag=b`.
 * - Serializes **objects (including Date)** as JSON strings and URL-encodes them:
 *   `{ filter: { active: true } }` → `filter=%7B%22active%22%3Atrue%7D`.
 * - Converts primitives (string/number/boolean) via `String(...)`.
 *
 * This strategy is backend-friendly when:
 * - Arrays are expected as repeated keys, and
 * - Complex filters are accepted as JSON strings (server can `JSON.parse`).
 *
 * @param {Record<string, any>=} params
 *   A flat object of query parameters. Values may be primitives, arrays, or
 *   nested objects. `null`/`undefined` are omitted.
 *
 * @returns {string}
 *   A URL-encoded query string without the leading `?`. Returns `""` if no params.
 *
 * @example
 * // Primitives
 * serializeParams({ q: "logic", page: 2, active: true });
 * // → "q=logic&page=2&active=true"
 *
 * @example
 * // Arrays (repeat key)
 * serializeParams({ tag: ["a", "b"] });
 * // → "tag=a&tag=b"
 *
 * @example
 * // Nested object → JSON then URL-encoded
 * serializeParams({ filter: { active: true, role: "admin" } });
 * // → "filter=%7B%22active%22%3Atrue%2C%22role%22%3A%22admin%22%7D"
 *
 * @example
 * // Mixed + skipping null/undefined
 * serializeParams({ q: "x", ids: [1, 2], extra: null, more: undefined });
 * // → "q=x&ids=1&ids=2"
 */
function serializeParams(params?: Record<string, any>) {
  const usp = new URLSearchParams();
  if (!params) return usp.toString();
  for (const [k, v] of Object.entries(params)) {
    if (v == null) continue;
    if (Array.isArray(v)) v.forEach((x) => usp.append(k, String(x)));
    else if (typeof v === "object") usp.set(k, JSON.stringify(v));
    else usp.set(k, String(v));
  }
  return usp.toString();
}

async function getAccessToken(): Promise<string | null> {
  try {
    return localStorage.getItem("accessToken");
  } catch {
    return null;
  }
}

async function httpGet<T = any>(url: string, params?: Record<string, any>): Promise<ApiEnvelope<T>> {
  const res = await http.get<ApiEnvelope<T>>(url, {
    params,
    paramsSerializer: { serialize: serializeParams },
  });
  return res.data;
}

async function httpPost<T = any>(url: string, body?: any): Promise<ApiEnvelope<T>> {
  const res = await http.post<ApiEnvelope<T>>(url, body);
  return res.data;
}

async function httpPut<T = any>(url: string, body?: any): Promise<ApiEnvelope<T>> {
  const res = await http.put<ApiEnvelope<T>>(url, body);
  return res.data;
}

async function httpDelete<T = any>(url: string): Promise<ApiEnvelope<T>> {
  const res = await http.delete<ApiEnvelope<T>>(url);
  return res.data;
}

export { serializeParams, getAccessToken, httpGet, httpPost, httpPut, httpDelete };
