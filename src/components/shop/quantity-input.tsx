import React from 'react';
import { FaMinus, FaPlus } from "react-icons/fa";
const QuantityInput = ({ setQuantity, quantity }: {
    quantity: number, setQuantity: React.Dispatch<React.SetStateAction<{
        productId: string;
        color: string;
        size: string;
        quantity: number;
    }>>
}) => {
    const handleDecrement = () => {
        setQuantity((prev) => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) })); // Prevent going below 1
    };

    const handleIncrement = () => {
        setQuantity((prev) => ({ ...prev, quantity: (prev.quantity + 1) }));
    };
    return (
        <div>
            <label htmlFor="Quantity" className="sr-only"> Quantity </label>

            <div className="flex items-center gap-4">
                <FaMinus className="cursor-pointer" onClick={handleDecrement} />
                <div className="w-20 h-10 font-bold select-none flex justify-center items-center rounded border-gray-200 sm:text-sm border-2">{quantity}</div>
                <FaPlus className="cursor-pointer" onClick={handleIncrement} />
            </div>
        </div>
    );
};

export default QuantityInput;