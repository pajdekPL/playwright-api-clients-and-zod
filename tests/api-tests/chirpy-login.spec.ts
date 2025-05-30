import { ChirpyApiClient, createChirpyApiClient } from "@api/chirpy-client";
import { expect, test } from "@playwright/test";
import { ChirpyErrorSchema } from "@schemas/chirpy-error.schema";
import { CHIRPY_LOGIN, CHIRPY_PASSWORD } from "playwright.config";

test.describe("Chirpy api/login", () => {
  let client: ChirpyApiClient;

  test.beforeAll(async ({ playwright }) => {
    const request = await playwright.request.newContext();
    client = createChirpyApiClient(request);
  });

  test("POST api/login existing user", async () => {
    const response = await client.login({
      email: CHIRPY_LOGIN,
      password: CHIRPY_PASSWORD,
    });

    expect(response.email).toBe(CHIRPY_LOGIN);
    expect(response.is_chirpy_red).toBe(false);
  });

  test("POST api/login invalid credentials", async () => {
    const response = await client.rawRequest(client.loginPath, {
      method: "POST",
      data: {
        email: "notExistingUser123@test.com",
        password: "invalid",
      },
    });

    expect(response.status).toBe(401);
    // check that the error response schema is correct
    const data = ChirpyErrorSchema.parse(response.data);
    expect(data.error).toBe("Incorrect email or password");
  });
});
