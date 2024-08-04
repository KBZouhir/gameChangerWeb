import { z } from "zod"

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Title is required"),
  price: z.number().min(0, "Price must be a positive number").optional(),
})

export default schema
