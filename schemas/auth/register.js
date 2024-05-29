import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const schema = z.object({
    first_name: z.string().nonempty("First name is required"),
    last_name: z.string().nonempty("Last name is required"),
    email: z.string().optional().refine(val => val === "0" || val === undefined || emailRegex.test(val), {
        message: "Invalid email",
    }),
    phone: z.string().optional(),
    password: z.string().min(8, "Must be at least 8 characters"),
    password_confirmation: z.string().min(8, "Must be at least 8 characters"),
}).refine(data => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
}).refine(data => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password"],
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

