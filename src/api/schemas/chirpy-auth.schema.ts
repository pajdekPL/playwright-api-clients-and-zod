// Import the 'z' object from the 'zod' library and alias it as 'schema'.
// 'zod' is a TypeScript-first schema declaration and validation library.
import { z as schema } from "zod/v4";

// Define a Zod schema for the login request payload.
// This schema expects an object with two string properties: 'email' and 'password'.
export const ChirpyLoginSchema = schema.object({
  email: schema.string(), // The user's email address as a string
  password: schema.string(), // The user's password as a string
});

// Define a Zod schema for the login response payload.
// This schema describes the expected structure of the response returned after a successful login.
export const ChirpyLoginResponseSchema = schema.object({
  created_at: schema.string(), // Timestamp when the user was created (as an ISO string)
  email: schema.string(), // The user's email address
  id: schema.string(), // The user's unique identifier
  is_chirpy_red: schema.boolean(), // Boolean flag indicating if the user has 'chirpy red' status
  refresh_token: schema.string(), // Token used to refresh the authentication session
  token: schema.string(), // The main authentication token (JWT or similar)
  updated_at: schema.string(), // Timestamp when the user was last updated (as an ISO string)
});

// TypeScript type inferred from the ChirpyLoginResponseSchema.
// This type represents the shape of a successful login response.
export type ChirpyLoginResponse = schema.infer<
  typeof ChirpyLoginResponseSchema
>;

// TypeScript type inferred from the ChirpyLoginSchema.
// This type represents the shape of the login request payload.
export type ChirpyLogin = schema.infer<typeof ChirpyLoginSchema>;
