import { uploadImage } from '@/actions/product/upload-image';
import { ImageType } from '@/lib/types';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const FileUpload = ({ setimages }: { setimages: React.Dispatch<React.SetStateAction<ImageType[]>> }) => {
    const { setValue, getValues } = useFormContext();
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        const file = new FormData();
        if (image) {
            file.append('image', image);
            const res = await uploadImage(file);
            if (res.status === 200) {
                const data = res.json;
                setimages(prev => [...prev, data]);
                const currentImageUrls = getValues('imageUrl') || [];
                setValue('imageUrl', [...currentImageUrls, data.url]);
            }
        }
    };

    return (
        <div className="flex ">
            <div className="max-w-sm rounded-lg drop-shadow bg-gray-50">
                <div className="m-4">
                    <label className="inline-block mb-2 text-gray-500">
                        Upload Image
                    </label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div className="flex flex-col items-center justify-center pt-7">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                    Attach a file
                                </p>
                            </div>
                            <input
                                multiple
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e)}
                                type="file"
                                className="opacity-0"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;