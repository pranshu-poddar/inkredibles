"use server";

import { prisma } from "@/lib/db/prisma";

export const deleteProductById = async (productId: string) => {
  console.log("deleteProductById", productId);
  try {
    // 1. Find the product to ensure it exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { status: 404, message: `Product with ID ${productId} not found` };
    }

    // Delete related product details first
    await prisma.productDetail.deleteMany({
      where: { productId: productId },
    });

    // 2. Delete the product
    await prisma.product.delete({
      where: { id: productId },
    });

    console.log(`Product with ID ${productId} deleted successfully`);
    return {
      status: 200,
      message: `Product with ID ${productId} deleted successfully`,
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { status: 500, message: error };
  }
};
