import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = z.object({
    email: z.string().optional().refine((val) => val === "0" || val === undefined || emailRegex.test(val),{message: "Invalid email"}),
    phone: z.string().optional(),
    password: z.string().min(8, "Must be at least 8 characters"),
  }).superRefine((data, ctx) => {
    if (data.email !== "0" && !data.email && !data.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either email or phone must be provided",
        path: ["email", "phone"],
      });
    }
  });

export default schema;
