import { z } from "zod";

const schema = z.object({
  externalUserName: z.string().nonempty("Full name is required"),
  externalUserEmail: z.string().nonempty("Email is required").email("Invalid email address"),
});

export default schema;
