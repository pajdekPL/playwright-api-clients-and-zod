import { z as schema } from "zod/v4";

export const ChirpyErrorSchema = schema.object({
  error: schema.string(),
  // someWronglyExpectedField: schema.string(), // easter egg to fix after executing tests ^^
});

export type ChirpyError = schema.infer<typeof ChirpyErrorSchema>;
