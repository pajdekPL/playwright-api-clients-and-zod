import { APIRequestContext, APIResponse, test } from "@playwright/test";

// Supported HTTP methods
export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

// Configuration for the fetch helper
export interface FetchConfig {
  baseURL: string;
  headers: Record<string, string>;
}

// Standardized response type
export interface FetchResponse<T = unknown> {
  status: number;
  statusText: string;
  data: T;
  headers: Record<string, string>;
}

// Options for making a request
export interface FetchOptions<T = unknown> {
  method?: RequestMethod;
  headers?: Record<string, string>;
  data?: T; // JSON body
  multipart?: T; // Multipart form data
  params?: Record<string, string | number | boolean | undefined>; // Query params
}

/**
 * Makes an HTTP request using Playwright's APIRequestContext and returns a standardized response.
 * Handles query params, JSON body, and multipart data.
 */
export async function fetchWithConfig<T>(
  request: APIRequestContext,
  url: string,
  options: FetchOptions<T> = {},
): Promise<FetchResponse<T>> {
  const { method = "GET", headers = {}, multipart, params, data } = options;

  // Build URL with query params if provided
  const urlObj = new URL(url);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) urlObj.searchParams.append(key, String(value));
    }
  }

  // Prepare request body
  const requestData = data !== undefined ? JSON.stringify(data) : undefined;
  let response: APIResponse | undefined;

  // Wrap the request in a Playwright test step for better reporting
  await test.step(`API_CALL ${method} ${urlObj.toString()} data: ${requestData}`, async () => {
    response = await request.fetch(urlObj.toString(), {
      method,
      headers,
      data: requestData,
      multipart: multipart ?? undefined,
    });
  });

  if (!response) throw new Error("No response received");

  const responseData = (await response.json()) as T;

  // Return standardized response
  return {
    status: response.status(),
    statusText: response.statusText(),
    data: responseData,
    headers: response.headers(),
  };
}
