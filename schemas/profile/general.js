import { z } from 'zod';

const schema = z.object({
  first_name: z.string().nonempty({ message: "First name is required" }),
  last_name: z.string().nonempty({ message: "Last name is required" }),
  phone: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  bio: z.string().nonempty({ message: "Bio is required" })
}).refine(data => data.phone || data.email, {
  message: "Either phone or email is required",
  path: ["phone", "email"], // both fields are highlighted if validation fails
});

export default schema