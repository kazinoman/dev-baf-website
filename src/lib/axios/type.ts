/** Normalize errors to a tiny, consistent shape */
export type HttpError = {
  success: false;
  statusCode: number;
  message: string;
  errors: string[];
  data: null;
};

/** ---------- Your envelope types ---------- */
export type ApiEnvelope<T = any> = {
  success: boolean;
  message: string;
  errors: string[] | null;
  statusCode: number;
  data: T | null;
};
