import React, { useEffect } from 'react';

function Toast({ message, duration = 3000, onClose, position = 'top-right' }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Call the onClose function after the duration
        }, duration);

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [duration, onClose]);

    // Define position classes based on the `position` prop
    const positionClasses = {
        'top-right': 'top-4 right-4',
        'bottom-right': 'bottom-4 right-4',
        'top-middle': 'top-4 left-1/2 transform -translate-x-1/2',
        'bottom-middle': 'bottom-4 left-1/2 transform -translate-x-1/2',
    };

    return (
        <div
            className={`fixed z-50 bg-gray-800 text-white py-4 px-6 rounded-none shadow-lg transition-opacity duration-1000 ease-in-out ${positionClasses[position]}`}
            style={{ opacity: message ? 1 : 0, minHeight: '50px' }} // Adjust the minHeight as needed
        >
            {message}
        </div>
    );
}

export default Toast;