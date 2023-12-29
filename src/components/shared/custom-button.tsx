import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
export const buttonStyles = {
  base: 'hover:bg-black cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800',
  primary: 'py-5 px-10 bg-gray-800 text-base font-medium leading-4 text-white',
  // Add more styles as needed
};
const CustomButton: React.FC<CustomButtonProps> = ({ children, ...buttonProps }) => (
  <button
    className={`${buttonStyles.base} ${buttonStyles.primary}`}
    {...buttonProps}
  >
    {children}
  </button>
);

export default CustomButton;
