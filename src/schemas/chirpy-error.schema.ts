import { z as schema } from "zod";

export const ChirpyErrorSchema = schema.object({
  error: schema.string(),
  someExpectedField: schema.string(),
});

export type ChirpyError = schema.infer<typeof ChirpyErrorSchema>;
