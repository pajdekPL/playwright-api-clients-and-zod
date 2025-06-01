import { ChirpDataCreate } from "@api/schemas/chirpy-chirps.schema";
import { test } from "@fixtures/chirpy-api.fixture";
import { expect } from "@playwright/test";

test("Create and get chirp by id", async ({ chirpyApi: client }) => {
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
