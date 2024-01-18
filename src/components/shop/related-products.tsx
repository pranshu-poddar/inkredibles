import React from 'react';
import SliderContainer from '../shared/slider';
import ProductCard from '../home/product-card';
import { TProductSchema } from '@/lib/types';

type RelatedProductsProps = {
    Products?: TProductSchema[];
    title: string;
}

const RelatedProducts = ({ Products, title }: RelatedProductsProps) => {
    if(!Products){
        return <p>!NO related products found</p>
    }
    return (
        <div className="container2 pt-10 mt-10 text-center ">
            <div className=" px-10 relative">
                <h2 className="font-semibold">{title}</h2>
                <SliderContainer SlidesToShow={Math.min(Products.length, 4)}>
                    {Products.map((product) => {
                        return (
                            <div className='px-4 ' key={product.name}>
                                <ProductCard product={product} />
                            </div>
                        );
                    })}
                </SliderContainer>
            </div>
        </div>
    );
};

export default RelatedProducts;