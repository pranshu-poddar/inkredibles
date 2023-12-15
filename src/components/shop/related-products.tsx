import React from 'react';
import SliderContainer from '../shared/slider';
import ProductCard from '../home/product-card';
import { ProductType } from '@/__mocks__/product.mock';

type RelatedProductsProps = {
    Products: ProductType[];
    title: string;
}

const RelatedProducts = ({ Products, title }: RelatedProductsProps) => {
    return (
        <div className="container2 pt-10 text-center ">
            <div className=" px-10 relative">
                <h2 className="font-semibold">{title}</h2>
                <SliderContainer SlidesToShow={4}>
                    {Products.map((product) => {
                        return (
                            <div className='px-4 ' key={product.label}>
                                <ProductCard {...product} />
                            </div>
                        );
                    })}
                </SliderContainer>
            </div>
        </div>
    );
};

export default RelatedProducts;