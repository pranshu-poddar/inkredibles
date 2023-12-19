import React, { ReactNode } from 'react';

interface CustomInputProps {
    type: string;
    label: string;
    name: string;
    placeholder: string;
    span?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ type, label, name, placeholder, span }) => {
    return (
        <div className={`${span?span:"sm:col-span-3"}`}>
            <label
                htmlFor={name}
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600"
            >
                <input
                    type={type}
                    id={name}
                    name={name}
                    className="peer p-2 border-none w-full bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                    placeholder={placeholder}
                />

                <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                    {label}
                </span>
            </label>
        </div>
    );
};

export default CustomInput;
