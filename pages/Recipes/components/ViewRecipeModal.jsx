import React, { useEffect, useRef } from 'react';

function ViewRecipeModal({ isOpen, onClose, onOpenEditRecipeModal, children }) {
    const modalRef = useRef(null); // Ref to the modal element 

    // Close modal when clicking outside the modal content
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="fixed inset-0 bg-gray-500/60 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-3/4 overflow-y-auto p-6 relative">
                {children}
                <div>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-4"
                    >
                        Close
                    </button>
                    <button
                        onClick={onOpenEditRecipeModal}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ml-2">
                        Edit Recipe
                    </button>
                </div>
            </div>
        </div>
    );

}

export default ViewRecipeModal;