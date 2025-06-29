import React, { useEffect, useRef } from 'react';
import api from '../../../util/api';

function ViewRecipeModal({ isOpen, onClose, onOpenEditRecipeModal, hasRecipe, onRecipeDeleted, children }) {
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

    // Function to handle deleting the recipe
    const handleDeleteRecipe = async () => {
        // Implement the delete logic here
        console.log(hasRecipe._id);

        if (!hasRecipe) {
            console.error('No recipe found to delete');
            return;
        }

        // const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
        // if (!confirmDelete) return;

        try {

            const response = await api.delete(`/recipes/${hasRecipe._id}`)
            if (response.status === 200) {
                console.log('Recipe deleted successfully', response.data);
                onClose(); // Close the modal after deletion
                if (onRecipeDeleted) {
                    onRecipeDeleted(hasRecipe._id); // Call the callback function to update the recipe list
                }
            } 
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500/60 flex items-center justify-center z-50 flex-col p-20">
            <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-3/4 overflow-y-auto p-6 relative flex flex-col flex-grow">
                {children}
                <div className='flex flex-row justify-between mt-auto'>
                    <div>

                        <button
                            onClick={onClose}
                            className="text-gray-900 rounded px-4 py-2 bg-gray-200 mt-4"
                        >
                            Close
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={onOpenEditRecipeModal}
                            className="border-blue-500 border-2 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white mt-4 ml-2">
                            Edit
                        </button>
                        <button
                            onClick={handleDeleteRecipe}
                            className='border-red-500 border-2 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white mt-4 ml-2'
                        >
                            Delete
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default ViewRecipeModal;