'use client';
import React from 'react';
import PriceRangeSlider from './price-range-slider';
import ProductCategories from './product-categories';
import { Category } from '@/__mocks__/category.mock';
import { Sizes } from '@/__mocks__/product.mock';

const Sidebar = () => {
  const [priceRange, setPriceRange] = React.useState(2000);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [size, setsize] = React.useState('');

  return (
    <div className='w-[20%] space-y-6'>
      <PriceRangeSlider priceRange={priceRange} min={200} max={2000} setPriceRange={setPriceRange} />
      <ProductCategories
        label='Filter By Category'
        productCategories={Category}
        setProductCategory={setSelectedCategory}
      />
      <ProductCategories
      label='Filter By Size'
      productCategories={Sizes}
      setProductCategory={setsize}
      />
    </div>
  );
};

export default Sidebar;