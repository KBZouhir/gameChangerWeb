import { z } from "zod"

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Title is required"),
})

export default schema
