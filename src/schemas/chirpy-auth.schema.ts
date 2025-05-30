import { z as schema } from "zod";

export const ChirpyLoginSchema = schema.object({
  email: schema.string(),
  password: schema.string(),
});

export const ChirpyLoginResponseSchema = schema.object({
  created_at: schema.string(),
  email: schema.string(),
  id: schema.string(),
  is_chirpy_red: schema.boolean(),
  refresh_token: schema.string(),
  token: schema.string(),
  updated_at: schema.string(),
});

export type ChirpyLoginResponse = schema.infer<
  typeof ChirpyLoginResponseSchema
>;

export type ChirpyLogin = schema.infer<typeof ChirpyLoginSchema>;
