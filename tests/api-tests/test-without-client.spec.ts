import { ChirpyLoginResponseSchema } from "@api/schemas/chirpy-auth.schema";
import { ChirpyErrorSchema } from "@api/schemas/chirpy-error.schema";
import { expect, test } from "@playwright/test";
import { CHIRPY_LOGIN, CHIRPY_PASSWORD } from "playwright.config";

test.describe("Chirpy api/login", () => {
  test("POST api/login existing user", async ({ request }) => {
    const response = await request.post("/api/login", {
      data: {
        email: CHIRPY_LOGIN,
        password: CHIRPY_PASSWORD,
      },
    });

    expect(response.status()).toBe(200);

    const data = (await response.json()) as unknown;

    const parsedData = ChirpyLoginResponseSchema.parse(data);
    expect(parsedData.email).toBe(CHIRPY_LOGIN);
    expect(parsedData.is_chirpy_red).toBe(false);
  });

  test("POST api/login invalid credentials", async ({ request }) => {
    const response = await request.post("/api/login", {
      data: {
        email: "notExistingUser123@test.com",
        password: "invalid",
      },
    });

    expect(response.status()).toBe(401);

    const data = (await response.json()) as unknown;

    const parsedData = ChirpyErrorSchema.parse(data);
    expect(parsedData.error).toBe("Incorrect email or password");
  });
});
