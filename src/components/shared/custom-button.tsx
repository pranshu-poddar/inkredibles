'use client'
import React, { ButtonHTMLAttributes, ReactNode, useEffect, useRef } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'small' | 'large';
}
export const buttonStyles = {
  base: 'hover:bg-black cursor-pointer select-none transition-all hover:rounded-xl hover:shadow-xl duration-300 focus:outline-none bg-gray-800 text-base font-medium leading-4 text-white',
  large: 'py-5 px-10 ',
  small: 'py-3 px-6 ',
};
const CustomButton: React.FC<CustomButtonProps> = ({ children, size = 'large', ...buttonProps }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = () => {
      if (buttonRef.current) {
        buttonRef.current.classList.add('scale-95');
        setTimeout(() => {
          buttonRef.current?.classList.remove('scale-95');
        }, 300);
      }
    };

    buttonRef.current?.addEventListener('click', handleClick);

    // Cleanup on unmount
    return () => buttonRef.current?.removeEventListener('click', handleClick);
  }, [buttonRef]);

  return (
    <button
      ref={buttonRef}
      className={`${buttonStyles.base} ${buttonStyles[size]}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
