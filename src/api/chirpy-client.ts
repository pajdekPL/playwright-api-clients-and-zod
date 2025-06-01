import { BaseApiClient, RequestParams } from "@api/base-client";
import { FetchConfig, FetchResponse } from "@api/fetch-helper";
import {
  ChirpyLogin,
  ChirpyLoginResponse,
  ChirpyLoginResponseSchema,
} from "@api/schemas/chirpy-auth.schema";
import {
  ChirpDataCreate,
  ChirpResponse,
  ChirpResponseSchema,
} from "@api/schemas/chirpy-chirps.schema";
import { APIRequestContext, expect } from "@playwright/test";
import { BASE_URL } from "playwright.config";

export class ChirpyApiClient extends BaseApiClient {
  loginPath = "/api/login";
  chirpsPath = "/api/chirps";
  userChirpsPath = "/api/user/chirps";

  async login(login: ChirpyLogin): Promise<ChirpyLoginResponse> {
    const response = await this.makeRequest(this.loginPath, {
      method: "POST",
      data: login,
    });

    expect(response.status).toBe(200);

    // Validate the response using zod
    const data = ChirpyLoginResponseSchema.parse(response.data);

    return data;
  }

  async authenticate(login: ChirpyLogin): Promise<void> {
    const data = await this.login(login);
    this.config.headers.Authorization = `Bearer ${data.token}`;
  }

  async createChirp(chirp: ChirpDataCreate): Promise<ChirpResponse> {
    const response = await this.makeRequest(this.chirpsPath, {
      method: "POST",
      data: chirp,
    });

    expect(response.status).toBe(201);

    const data = ChirpResponseSchema.parse(response.data);

    return data;
  }

  async getChirp(chirpId: string): Promise<ChirpResponse> {
    const response = await this.makeRequest(`${this.chirpsPath}/${chirpId}`, {
      method: "GET",
    });

    expect(response.status).toBe(200);

    const data = ChirpResponseSchema.parse(response.data);

    return data;
  }

  async rawRequest(
    path: string,
    options: RequestParams,
  ): Promise<FetchResponse<unknown>> {
    return this.makeRequest(path, options);
  }
}

export function createChirpyApiClient(
  request: APIRequestContext,
  headers?: Record<string, string>,
): ChirpyApiClient {
  const config: FetchConfig = {
    baseURL: BASE_URL,
    headers: headers ?? {},
  };

  return new ChirpyApiClient(config, request);
}
