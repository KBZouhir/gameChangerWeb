import { z } from "zod";

const schema = z.object({
  password: z.string().min(8, "Must be at least 8 characters"),
  password_confirmation: z.string().min(8, "Must be at least 8 characters"),
}).refine(data => data.password === data.password_confirmation, {
  message: "Passwords must match",
  path: ["password_confirmation"],
}).refine(data => data.password === data.password_confirmation, {
  message: "Passwords must match",
  path: ["password"],
});

export default schema;
