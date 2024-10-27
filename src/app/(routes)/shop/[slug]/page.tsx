'use client'
/* eslint-disable @next/next/no-img-element */
import { getProductByName, getProductsByCategory } from '@/actions/product/get-products';
import CustomButton from '@/components/shared/custom-button';
import { ProductSkeleton } from '@/components/shared/skeleton';
import SliderContainer from '@/components/shared/slider';
import QuantityInput from '@/components/shop/quantity-input';
import RelatedProducts from '@/components/shop/related-products';
import Tabs from '@/components/shop/tabs';
import { TCartItem, TProductSchema } from '@/lib/types';
import { useCartStore } from '@/store/cart-store';
import { decodeUrl, encodeUrl } from '@/utils/url-parse';
import { useQuery } from '@tanstack/react-query';
import React, { ChangeEvent, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Product = ({ params }: { params: { slug: string } }) => {
  const [isLiked, setisLiked] = useState(false)
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", params.slug],
    queryFn: () => getProductByName(decodeUrl(params.slug)),
    refetchOnWindowFocus: false,
    enabled: !!params.slug
  })
  const category = product?.category;
  const { data: relatedProducts } =
    useQuery<TProductSchema[]>({
      queryKey: ["relatedProducts", category],
      queryFn: () => getProductsByCategory(category || ""),
      enabled: !!category,
    });

  const [selectedProduct, setselectedProduct] = useState<TCartItem>({ productId: product?.id || "", color: "", size: "", quantity: 1, price: product?.price || 0, image: product?.imageUrl[0] || "", total: product?.price || 0 })
  const cartStore = useCartStore();

  useEffect(() => {
    if (product && product.price) {
      setselectedProduct((prev) => ({
        ...prev,
        productId: product.id,
        color: "",
        size: "",
        quantity: 1,
        price: product.price,
        image: product.imageUrl[0],
        total: product.price // Ensure this is set here
      }));
    } else {
      console.error("Product price is missing or invalid:", product);
    }
  }, [product]);


  const handleAddToCart = async () => {
    if (!selectedProduct.color || !selectedProduct.size) {
      toast.error("Select a color and size");
    } else if (selectedProduct.price === undefined || isNaN(selectedProduct.price)) {
      toast.error("Price is missing or invalid");
    } else {
      const updatedProduct = {
        ...selectedProduct,
        total: selectedProduct.price * selectedProduct.quantity,
      };
      cartStore.addItem(updatedProduct);
      toast.success(`${product?.name} Added to Cart`);
    }
  };


  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <Toaster />
      {isLoading ? <ProductSkeleton /> : <div className="container2 px-5 pt-24 mx-auto">
        <Toaster />
        <div className="px-10 mx-auto flex flex-wrap">

          {/* left section  */}
          <div className="md:w-[35%] w-full md:h-auto ">
            <div className='relative w-full h-[80dvh] md:h-[80%]'>
              <img alt="ecommerce" className='object-cover absolute inset-0 h-full w-full' src={product?.imageUrl[0]} />
            </div>
            <SliderContainer SlidesToShow={2}>
              {product?.imageUrl.map((pic) => {
                return (
                  <div
                    className="h-[7rem] scale-90 overflow-hidden relative"
                    key={pic}
                  >
                    <img
                      className="absolute inset-0 object-cover"
                      src={pic}
                      alt="product image"
                    />
                  </div>
                );
              })}
            </SliderContainer>
          </div>
          {/* right section  */}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-3xl title-font font-medium mb-1">{product?.name}</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>

            </div>
            {product?.discount ? <p className="tracking-wide text-xl font-medium "><span className="line-through decoration-red-500 decoration-2 mr-2">₹{product.price}</span> ₹{(100 - product.discount) / 100 * product.price}</p> : <p className="tracking-wide text-xl font-medium">₹{product?.price}</p>}
            <p className="leading-relaxed mt-6">{product?.description}</p>
            <div className="flex my-6 gap-10 items-center pb-5 border-b-2 border-gray-100">
              <div className="flex items-center gap-3">
                <span className='font-semibold text-inkredible-black'>Color</span>
                {product?.productDetails.map((variant) => {
                  return <button style={{ backgroundColor: `${variant.color}` }} onClick={() => setselectedProduct((prev) => ({ ...prev, color: variant.color }))} value={selectedProduct.color} key={variant.color} className={` rounded-full w-8 h-8 ring-offset-2 ring-black ${selectedProduct.color == variant.color && "shadow-xl ring-2"}`}></button>
                })}
              </div>
              <div className="flex items-center gap-3">
                <span className='font-semibold text-inkredible-black'>Size</span>
                {product?.productDetails.map((variant) => {
                  return <button onClick={() => setselectedProduct((prev) => ({ ...prev, size: variant.size }))} value={selectedProduct.size} key={variant.size} className={` rounded-full w-10 h-10 text-sm capitalize font-semibold bg-white border  ring-inkredible-black ${selectedProduct.size == variant.size && "shadow-xl ring-2"}`}>
                    {variant.size}
                  </button>
                })}
              </div>
            </div>
            <div className='flex items-center w-full justify-between'>
              <QuantityInput quantity={selectedProduct.quantity} setQuantity={setselectedProduct} />
              <CustomButton onClick={handleAddToCart}>ADD TO CART</CustomButton>
            </div>
            <button onClick={() => setisLiked(prev => !prev)} className='flex text-base group gap-2 items-center mt-8'>{isLiked ? <FaHeart className="w-5 fill-red-500 h-auto" /> : <FaRegHeart className="w-5 group-hover:fill-red-500 transition-all duration-150 ease-out h-auto" />}  Add To Wish List</button>
          </div>

        </div>

        {/* <Tabs /> */}

        <RelatedProducts Products={relatedProducts} title="Related Products" />

      </div>}
    </section>
  );
};

export default Product;