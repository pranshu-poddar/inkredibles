/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TProductSchema, ProductSchema, ImageType } from '@/lib/types';
import createProduct from '@/actions/product/create-product'; // Update the path
import CustomInput from '../shared/custom-input';
import CustomButton, { buttonStyles } from '../shared/custom-button';
import FileUpload from '../shared/file-upload';
import { RiDeleteBinFill } from "react-icons/ri";
import { ProductCategory } from '@/constants/data.constant';


const ProductForm = () => {
  const methods = useForm<TProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productDetails: [],
    },
  });

  const [images, setimages] = useState<ImageType[]>([]);

  const { control, handleSubmit, formState: { isSubmitting, errors } } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productDetails',
  });

  console.log(errors)

  const onSubmit = async (data: TProductSchema) => {
    console.log(data);
    try {
      const response = await createProduct(data);
      if (response.status === 201) { // Check for successful creation
        methods.reset(); // Clear all form fields
        setimages([]); // Clear uploaded images
        console.log('Product added successfully!');
        // Optional: Display a success message to the user
      } else {
        // Handle other response codes (e.g., errors)
      }
    } catch (error) {
      // Handle submission errors
    }
  };


  return (
    <div className='container2 pt-16'>
      <h2 className='mb-8'>Add Product</h2>
      <FormProvider {...methods}>
        <form className='grid gap-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-8 justify-between'>
            <div className='flex gap-8'>
              <FileUpload setimages={setimages} />
              <div className='border-2 flex flex-wrap gap-2 rounded-xl border-dotted p-4'>
                {images.map((image) => {
                  return <div key={image.title}>
                    <img className='drop-shadow border' src={image.thumb} alt={image.title} />
                    <a href={image.deleteUrl} onClick={() => setimages(images.filter((curr) => curr.title != image.title))} target='_blank' className='flex items-center gap-2 p-2 border bg-red-500 text-white rounded mt-2 hover:bg-red-600 w-fit hover:drop-shadow cursor-pointer'><RiDeleteBinFill />Remove</a>
                  </div>
                })}
              </div>
            </div>
            <div className='relative '>
              <label htmlFor='category' className='block text-sm font-medium text-gray-700'>
                Category
              </label>
              <select
                {...methods.register('category')}
                id='category'
                name='category'
                className='mt-1 block w-full p-2 border-2 bg-transparent placeholder-transparent rounded-lg focus:outline-none focus:ring-0'
              >
                <option value='' disabled>Select a category</option>
                {ProductCategory.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              </div>
          </div>
          <div className='grid gap-8 grid-flow-col'>
            <CustomInput error={errors.name?.message} placeholder='Name' type='text' label='Name' name='name' />
            <CustomInput error={errors.price?.message} placeholder='Price' type='number' label='Price' name='price' />
            <CustomInput error={errors.discount?.message} placeholder='Discount' type='number' label='Discount' name='discount' defaultValue={0} />
          </div>
          <div>
            <CustomInput error={errors.description?.message} placeholder='Description' type='textarea' label='Description' name='description' />
          </div>

          <div>
            {fields.map((field, index) => (
              <div className='grid gap-8 grid-flow-col items-center mb-8' key={field.id}>
                <CustomInput
                  error={errors.productDetails?.[index]?.size?.message}
                  placeholder='Size'
                  type='text'
                  label='Size'
                  name={`productDetails.${index}.size`}
                />
                <CustomInput
                  error={errors.productDetails?.[index]?.color?.message}
                  placeholder='Color'
                  type='text'
                  label='Color'
                  name={`productDetails.${index}.color`}
                />
                <CustomInput
                  error={errors.productDetails?.[index]?.quantity?.message}
                  placeholder='Quantity'
                  type='number'
                  label='Quantity'
                  name={`productDetails.${index}.quantity`}
                />
                <CustomButton type='button' onClick={() => remove(index)}>
                  Remove Detail
                </CustomButton>
              </div>
            ))}
            <CustomButton
              type='button'
              onClick={() =>
                append({
                  size: '',
                  color: '',
                  quantity: 0,
                })
              }
            >
              Add Product Detail
            </CustomButton>
          </div>
          <input type='submit' className={`${buttonStyles.base} ${buttonStyles.primary}`} value={isSubmitting ? 'Adding...' : 'Add Product'} disabled={isSubmitting} />
        </form>
      </FormProvider>
    </div>
  );
};

export default ProductForm;

