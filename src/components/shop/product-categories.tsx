'use client';
import React, { ChangeEvent } from 'react';

type ProductCategoriesProps = {
    productCategories: string[];
    setProductCategory: React.Dispatch<React.SetStateAction<string>>;
    label: string;
}

const ProductCategories = ({
    productCategories,
    setProductCategory,
    label
}: ProductCategoriesProps) => {

    return (
        <div>
            <h4>{label}</h4>
            <ul className='space-y-2 mt-4'>
                {productCategories.map((category) => (
                    <li className='cursor-pointer hover:text-orange-500' onClick={()=>setProductCategory(category)} key={category}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductCategories;
