import { ProductCategory } from "@/constants/data.constant";
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

// **ProductDetail Schema**
export const ProductDetailSchema = z.object({
  size: z.string().min(1, { message: "Size is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  quantity: z
    .number()
    .int()
    .min(5, { message: "Quantity must be greater than or equal to 5" }),
});

export type TProductDetailSchema = z.infer<typeof ProductDetailSchema>;

export const ProductSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  category: z.string().refine(
    (value) => {
      return ProductCategory.includes(value);
    },
    { message: "Invalid category" },
  ),
  imageUrl: z.array(z.string()),
  name: z.string().min(1, { message: "Name is required" }),
  price: z
    .number()
    .min(0, { message: "Price must be greater than or equal to 0" }),
  discount: z
    .number()
    .min(0, { message: "Discount can't be negative" })
    .max(100, { message: "Discount must be less than or equal to 100" }),
  updatedAt: z.date().optional(),
  createdAt: z.date().optional(),
  id: z.string().optional(),
  productDetails: z
    .array(ProductDetailSchema)
    .min(1, { message: "At least one product detail is required" }),
});

export type TProductSchema = z.infer<typeof ProductSchema>;

export type ImageType = {
  title: string;
  url: string;
  thumb: string;
  deleteUrl: string;
};

// **CartItem Schema**
export const CartItemSchema = z.object({
  productId: z.string(), // Assuming product IDs are UUIDs
  color: z.string().min(1),
  size: z.string().min(1),
  quantity: z.number().int().min(1),
});

export type TCartItem = z.infer<typeof CartItemSchema>;

// **Cart Schema**
export const CartSchema = z.object({
  items: z.array(CartItemSchema),
  addItem: z.function(z.tuple([CartItemSchema])),
  removeItem:  z.function(z.tuple([CartItemSchema])),
  updateQuantity:  z.function(z.tuple([CartItemSchema])),
  clearCart: z.function(),
});

export type TCart = z.infer<typeof CartSchema>;

export const AddressSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1,{message:"Recipient's name"}),
  phone: z
  .string()
  .trim()
  .min(1, "Required")
  .length(10, "Phone number must be 10 digits"),
  email: z
  .string()
  .min(1, { message: "Required" })
  .email({ message: "Must be a valid email" })
  .trim()
  .toLowerCase(),
  street: z.string().min(1,{message:'Street address'}),
  city: z.string().min(1,{message:'City'}),
  state: z.string().min(1,{message:'State or province'}),
  pin: z.string().min(1,{message:'Postal code'}).regex(new RegExp('^[0-9]{5,6}$')),
});

export type TAddressForm = z.infer<typeof AddressSchema>;