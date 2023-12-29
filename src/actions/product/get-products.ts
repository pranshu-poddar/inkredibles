"use server";

import { prisma } from "@/lib/db/prisma";

// Function to fetch all products
export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        productDetails: true, // Include the associated productDetails
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error fetching products");
  }
};

// Function to fetch a single product by ID
export const getProductById = async (productId: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { name: productId },
      include: {
        productDetails: true, // Include the associated productDetails
      },
    });

    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Error fetching product by ID");
  }
};

// Function to fetch products by category
export const getProductsByCategory = async (category: string) => {
  try {
    const products = await prisma.product.findMany({
      where: { category },
      include: {
        productDetails: true, // Include the associated productDetails
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw new Error("Error fetching products by category");
  }
};
