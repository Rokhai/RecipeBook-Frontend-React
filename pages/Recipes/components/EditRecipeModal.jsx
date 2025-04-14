import React, { useState, useEffect, useRef } from 'react';

function EditRecipeModal({ isOpen, onClose, recipe, onEditRecipe }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [recipeSteps, setRecipeSteps] = useState([]);
    const modalRef = useRef(null); // Ref to the modal element 

    // Populate the form fields with the selected recipe's data when the modal opens
    useEffect(() => {
        if (recipe) {
            setTitle(recipe.title || '');
            setDescription(recipe.description || '');
            setImage(recipe.image || null);
            setIngredients(recipe.ingredients || []);
            setRecipeSteps(recipe.recipe || []);
        }
    }, [recipe]);

    // Close the modal when clicking outside of it
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

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = value;
        setIngredients(updatedIngredients);
    };

    const handleStepChange = (index, value) => {
        const updatedSteps = [...recipeSteps];
        updatedSteps[index] = value;
        setRecipeSteps(updatedSteps);
    };

    const handleSubmit = () => {
        const updatedRecipe = {
            ...recipe,
            title,
            description,
            image,
            ingredients,
            recipe: recipeSteps,
        };
        onEditRecipe(updatedRecipe);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-3/4 overflow-y-auto p-6 relative">
                <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Recipe Title"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Recipe Description"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Image</label>
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-2 border rounded"
                    />
                    {image && typeof image === 'string' && (
                        <img src={image} alt="Recipe" className="w-full h-32 object-cover mt-2 rounded" />
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Ingredients</label>
                    {ingredients.map((ingredient, index) => (
                        <input
                            key={index}
                            type="text"
                            value={ingredient}
                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                            className="w-full px-4 py-2 border rounded mb-2"
                            placeholder={`Ingredient ${index + 1}`}
                        />
                    ))}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Recipe Steps</label>
                    {recipeSteps.map((step, index) => (
                        <textarea
                            key={index}
                            value={step}
                            onChange={(e) => handleStepChange(index, e.target.value)}
                            className="w-full px-4 py-2 border rounded mb-2"
                            placeholder={`Step ${index + 1}`}
                        />
                    ))}
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditRecipeModal;