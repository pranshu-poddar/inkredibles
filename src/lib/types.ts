import { ProductCategory } from "@/constants/data.constant";
import { z } from "zod";

// Common Validations
const emailValidation = z
  .string()
  .min(1, { message: "Email is required" })
  .email({ message: "Must be a valid email" })
  .trim()
  .toLowerCase();

const phoneValidation = z
  .string()
  .trim()
  .min(1, { message: "Phone number is required" })
  .length(10, { message: "Phone number must be 10 digits" });

// **Login Schema**
export const loginSchema = z.object({
  email: emailValidation,
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

// **Forget Password Schema**
export const forgetPasswordSchema = z.object({
  email: emailValidation,
});

export type TForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;

// **Signup Schema**
export const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: "First name is required" }),
    lastName: z.string().trim().min(1, { message: "Last name is required" }),
    email: emailValidation,
    phone: phoneValidation,
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export type TSignupSchema = z.infer<typeof signupSchema>;

// **ProductDetail Schema**
export const ProductDetailSchema = z.object({
  size: z.string().min(1, { message: "Size is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  quantity: z.number().int().min(5, { message: "Quantity must be greater than or equal to 5" }),
});

export type TProductDetailSchema = z.infer<typeof ProductDetailSchema>;

// **Product Schema**
export const ProductSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  category: z.string().refine(
    (value) => ProductCategory.includes(value),
    { message: "Invalid category" },
  ),
  imageUrl: z.array(z.string()),
  name: z.string().min(1, { message: "Name is required" }),
  price: z.number().min(0, { message: "Price must be greater than or equal to 0" }),
  discount: z.number().min(0, { message: "Discount can't be negative" }).max(100, { message: "Discount must be less than or equal to 100" }),
  updatedAt: z.date().optional(),
  createdAt: z.date().optional(),
  id: z.string().optional(),
  productDetails: z.array(ProductDetailSchema).min(1, { message: "At least one product detail is required" }),
});

export type TProductSchema = z.infer<typeof ProductSchema>;

// **Image Type**
export type ImageType = {
  title: string;
  url: string;
  thumb: string;
  deleteUrl: string;
};

// **CartItem Schema**
export const CartItemSchema = z.object({
  productId: z.string(), // Assuming product IDs are UUIDs
  color: z.string().min(1, { message: "Color is required" }),
  size: z.string().min(1, { message: "Size is required" }),
  quantity: z.number().int().min(1, { message: "Quantity must be at least 1" }),
  price: z.number().int().min(0, { message: "Price must be greater than or equal to 0" }), // Price in smallest unit (e.g., cents)
  image: z.string().url().optional(), // Image URL; optional if not always required
  total: z.number().int().min(0).optional(),
});

export type TCartItem = z.infer<typeof CartItemSchema>;

// **Cart Schema**
export const CartSchema = z.object({
  items: z.array(CartItemSchema),
  addItem: z.function(z.tuple([CartItemSchema])),
  removeItem: z.function(z.tuple([CartItemSchema])),
  updateQuantity: z.function(z.tuple([CartItemSchema])),
  clearCart: z.function(),
  syncWithDatabase: z.function(),
});

export type TCart = z.infer<typeof CartSchema>;

// **Address Schema**
export const AddressSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Recipient's name is required" }),
  phone: phoneValidation,
  email: emailValidation,
  street: z.string().min(1, { message: "Street address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State or province is required" }),
  isDefault: z.boolean().optional(),
  pin: z.string().min(1, { message: "Postal code is required" }).regex(/^[0-9]{5,6}$/, { message: "Postal code must be 5 or 6 digits" }),
});

export type TAddressForm = z.infer<typeof AddressSchema>;

// **User Schema**
export const UserSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }).max(50),
  lastName: z.string().min(2, { message: "Last name is required" }).max(50),
  phone: phoneValidation,
  gender: z.string().min(1, { message: "Gender is required" }), // Customize based on available options
  email: emailValidation, // Validate email format
  DOB: z.date().optional(), // Add more specific date validations if necessary
});

export type TUser = z.infer<typeof UserSchema>;
