import { z as schema } from "zod/v4";

export const ChirpResponseSchema = schema.object({
  author_name: schema.string(),
  body: schema.string(),
  created_at: schema.string(),
  expiration_datetime: schema.string(),
  id: schema.string(),
  updated_at: schema.string(),
  user_id: schema.string(),
});

export const ChirpResponseArraySchema = schema.array(ChirpResponseSchema);

export const ChirpDataCreateSchema = schema.object({
  body: schema.string(),
  expiration_datetime: schema.string(),
});

export type ChirpResponse = schema.infer<typeof ChirpResponseSchema>;
export type ChirpDataCreate = schema.infer<typeof ChirpDataCreateSchema>;
export type ChirpsResponse = schema.infer<typeof ChirpResponseArraySchema>;
