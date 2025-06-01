import { ChirpyApiClient, createChirpyApiClient } from "@api/chirpy-client";
import { test as base } from "@playwright/test";
import { CHIRPY_LOGIN, CHIRPY_PASSWORD } from "playwright.config";

interface ChirpyApiFixtures {
  chirpyApi: ChirpyApiClient;
}

export const test = base.extend<ChirpyApiFixtures>({
  chirpyApi: async ({ playwright }, use) => {
    const request = await playwright.request.newContext();
    const login = CHIRPY_LOGIN;
    const password = CHIRPY_PASSWORD;

    const chirpyApi = createChirpyApiClient(request);
    await chirpyApi.authenticate({
      email: login,
      password,
    });

    await use(chirpyApi);
  },
});
