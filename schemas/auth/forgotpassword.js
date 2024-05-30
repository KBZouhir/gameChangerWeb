import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = z.object({
  email: z
    .string()
    .optional()
    .refine((val) => val === "0" || val === undefined || emailRegex.test(val), {
      message: "Invalid email",
    }),
});

export default schema;
