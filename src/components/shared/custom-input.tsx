import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface CustomInputProps extends Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'name'> {
  label: string;
  name: string;
  placeholder?: string;
  span?: string;
  error?: string;
  type?: 'text' | 'number' | 'password' | 'email' | 'textarea'; // Add 'textarea' as a possible type
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  label,
  name,
  placeholder,
  span,
  error,
  ...inputProps
}) => {
  const {
    register
  } = useFormContext();

  const isTextarea = type === 'textarea';

  return (
    <div className={`${span ? span : 'sm:col-span-3'}`}>
      <label
        htmlFor={name}
        className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600"
      >
        {isTextarea ? (
          <textarea
            {...register(name)}
            id={name}
            name={name}
            className="peer p-2 border-none w-full bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            placeholder={placeholder}
            aria-describedby={`${name}-error`}
            {...(inputProps as TextareaHTMLAttributes<HTMLTextAreaElement>)} // Type assertion
          />
        ) : (
          <input
            {...register(name, {
              setValueAs: (value) => (type === "number" ? (value === "" ? undefined : parseFloat(value)) : value),
            })}
            type={type}
            id={name}
            name={name}
            className="peer p-2 border-none w-full bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            placeholder={placeholder}
            aria-describedby={`${name}-error`}
            {...inputProps}
          />
        )}

        <span
          className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
        >
          {label}
        </span>
      </label>
      {error && (
        <p className="text-red-500 absolute">{error}</p>
      )}
    </div>
  );
};

export default CustomInput;
