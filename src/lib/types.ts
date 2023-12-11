import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Required" })
    .email({ message: "Must be a valid email" })
    .trim()
    .toLowerCase(),
  password: z.string().min(6, "atleast 6 digits"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Required" })
    .email({ message: "Must be a valid email" })
    .trim()
    .toLowerCase(),
});

export type TForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;

export const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: "Required" }),
    lastName: z.string().trim().min(1, { message: "Required" }),
    email: z
      .string()
      .min(1, { message: "Required" })
      .email({ message: "Must be a valid email" })
      .trim()
      .toLowerCase(),
    phone: z
      .string()
      .trim()
      .min(1, "Required")
      .length(10, "Phone number must be 10 digits"),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "password must match",
  });

export type TSignupSchema = z.infer<typeof signupSchema>;
