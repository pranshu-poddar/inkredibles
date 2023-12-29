'use server';
import { prisma } from "@/lib/db/prisma";
import { ProductSchema, TProductSchema } from "@/lib/types";

export default async function createProduct(data: TProductSchema) {
    const validatedData = await ProductSchema.safeParseAsync(data);
    if (!validatedData) {
      return { status: 400, json: { error: "some fields are not valid" } };
    }
  
    try {
      const { description, imageUrl,category, name,discount, price, productDetails } = data;
  
      // Create the product first
      const product = await prisma.product.create({
        data: {
          category,
          discount,
          description,
          imageUrl,
          name,
          price,
        },
      });
  
      // Create each product detail individually, linking them to the product
      await Promise.all(
        productDetails.map(async (productDetail) => {
          await prisma.productDetail.create({
            data: {
              size: productDetail.size, 
              color: productDetail.color, 
              quantity: productDetail.quantity, 
              productId: product.id,
            },
          });
        })
      );
  
      return {
        status: 201,
        json: { message: "Product added successfully", product },
      };
    } catch (error) {
      console.error(error);
      return { status: 500, json: { error: "Internal Server Error" } };
    }
  }
