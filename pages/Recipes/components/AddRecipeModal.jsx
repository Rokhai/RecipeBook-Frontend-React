import React, { useState, useEffect, useRef, use } from "react";

import api from '../../../util/api';

function AddRecipeModal({ isOpen, onClose, onAddRecipe }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [ingredients, setIngredients] = useState(['']);
    const [recipeSteps, setRecipeSteps] = useState(['']);
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
    })


    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    }

    const handleAddStep = () => {
        setRecipeSteps([...recipeSteps, '']);
    };

    const handleRemoveStep = (index) => {
        const updatedSteps = recipeSteps.filter((_, i) => i !== index);
        setRecipeSteps(updatedSteps);
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('ingredients', ingredients.join(', ')); // Convert array to comma-sepetated string
        formData.append('instructions', recipeSteps.join(', ')); // Convert array to period-sepetated string
        formData.append('image', image); // Append the image file

        try {
            const response = await api.post('/recipes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status === 201) {
                console.log("Recipe created successfully");
                onAddRecipe(response.data); // Call the onAddRecipe function with the new recipe data
            }
            console.log("Response", response.data);
        } catch (err) {
            console.error("Error creating recipe: ", err);
        }

        const newRecipe = {
            title,
            description,
            image,
            ingredients,
            recipe: recipeSteps,
        };
        // onAddRecipe(newRecipe);
        setTitle('');
        setDescription('');
        setImage(null);
        setIngredients(['']);
        setRecipeSteps(['']);
        onClose();
    };

    const handleOnClose = () => {
        setTitle('');
        setDescription('');
        setImage(null);
        setIngredients(['']);
        setRecipeSteps(['']);
        onClose();
    }
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-3/4 overflow-y-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>

                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Title <span className="text-red-500">*</span> </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Recipe Title"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Description <span className="text-red-500">*</span> </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Recipe Description"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Image <span className="text-red-500">*</span> </label>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Ingredients <span className="text-red-500">*</span> </label>
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="flex items-center mb-2">


                                <input
                                    key={index}
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                    className="w-full px-4 py-2 border rounded mb-2"
                                    placeholder={`Ingredient ${index + 1}`}
                                    required
                                />
                                {ingredients.length > 1 && (

                                    <button
                                        onClick={() => handleRemoveIngredient(index)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                        type="button"
                                    >
                                        X
                                    </button>
                                )}
                            </div>

                        ))}
                        <button
                            onClick={handleAddIngredient}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Add Ingredient
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Recipe Steps <span className="text-red-500">*</span> </label>
                        {recipeSteps.map((step, index) => (
                            <div key={index} className="flex items-center mb-2">


                                <textarea
                                    key={index}
                                    value={step}
                                    onChange={(e) => handleStepChange(index, e.target.value)}
                                    className="w-full px-4 py-2 border rounded mb-2"
                                    placeholder={`Step ${index + 1}`}
                                    required
                                />
                                {recipeSteps.length > 1 && (
                              
                                    <button
                                        onClick={() => handleRemoveStep(index)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                        type="button"
                                    >
                                        X
                                    </button>
                                    
                                )}
                    
                            </div>
                        ))}
                        <button
                            onClick={handleAddStep}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Add Step
                        </button>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={handleOnClose}
                            className="text-gray-900 rounded px-4 py-2 bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                            Add Recipe
                        </button>
                    </div>
                </form>


            </div>
        </div>
    );
}

export default AddRecipeModal;