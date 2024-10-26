// components/ErrorMessage.tsx

import React from 'react';

interface ErrorMessageProps {
    message?: string; // Custom error message
    onRetry?: () => void; // Optional retry action
    actionText?: string; // Custom text for the action button
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
    message = "Something went wrong. Please try again.", 
    onRetry, 
    actionText = "Retry" 
}) => {
    return (
        <div className="flex flex-col items-center max-w-xl sm:mx-auto min-h-[10rem] mx-4 justify-center  p-4 my-4 text-center bg-red-100 border border-red-400 rounded-md text-red-700">
            <p className="mb-4 text-lg font-semibold">{message}</p>
            {onRetry && (
                <button 
                    onClick={onRetry} 
                    className="px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                    {actionText}
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
