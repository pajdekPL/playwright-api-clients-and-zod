import {
  FetchConfig,
  FetchOptions,
  FetchResponse,
  fetchWithConfig,
} from "@api/fetch-helper";
import { APIRequestContext } from "@playwright/test";

export type RequestParams<TData = unknown> = Omit<
  FetchOptions<TData>,
  "data"
> & {
  data?: TData;
};

/**
 * BaseApiClient provides a foundation for API clients, handling common request logic.
 */
export class BaseApiClient {
  // Playwright's APIRequestContext instance for making HTTP requests
  protected request: APIRequestContext;
  // Configuration for fetch requests (e.g., baseURL, headers)
  protected config: FetchConfig;
  // The base path for API endpoints (e.g., '/users')

  /**
   * Constructs a new BaseApiClient instance.
   * @param config - Fetch configuration (baseURL, headers, etc.)
   * @param request - Playwright's APIRequestContext for making requests
   */
  constructor(config: FetchConfig, request: APIRequestContext) {
    this.config = config;
    this.request = request;
  }

  /**
   * Makes an HTTP request to the given endpoint using the provided options.
   * @param endpoint - The API endpoint (relative to baseURL)
   * @param options - Request options, including method, headers, and optional data
   * @returns A promise resolving to the typed FetchResponse
   */
  async makeRequest<T, D extends T = T>(
    endpoint: string,
    options: RequestParams<D> = {},
  ): Promise<FetchResponse<T>> {
    // Construct the full URL using the baseURL from config and the endpoint
    const url = new URL(endpoint, this.config.baseURL).toString();
    // Merge headers from config and options, giving precedence to options.headers
    return fetchWithConfig<T>(this.request, url, {
      ...options,
      headers: {
        ...this.config.headers,
        ...options.headers,
      },
    });
  }
}
