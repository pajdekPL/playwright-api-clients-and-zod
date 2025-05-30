import { ChirpyApiClient, createChirpyApiClient } from "@api/chirpy-client";
import { expect, test } from "@playwright/test";
import { ChirpDataCreate } from "@schemas/chirpy-chirps.schema";
import { CHIRPY_LOGIN, CHIRPY_PASSWORD } from "playwright.config";

test.describe("Chirpy api/chirps", () => {
  let client: ChirpyApiClient;

  test.beforeAll(async ({ playwright }) => {
    const request = await playwright.request.newContext();
    client = createChirpyApiClient(request);
    await client.authenticate({
      email: CHIRPY_LOGIN,
      password: CHIRPY_PASSWORD,
    });
  });

  test("Create and get chirp by id", async () => {
    const chirpData: ChirpDataCreate = {
      body: "Hello, world!",
      expiration_datetime: new Date().toISOString(),
    };
    let chirpId: string;

    await test.step("POST api/chirps", async () => {
      const response = await client.createChirp(chirpData);
      chirpId = response.id;
    });

    await test.step("GET api/chirps/{id}", async () => {
      const chirp = await client.getChirp(chirpId);

      expect(chirp.body).toBe(chirpData.body);
      expect(chirp.expiration_datetime).toBe(chirpData.expiration_datetime);
    });
  });
});
