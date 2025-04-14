import React from 'react';

function RecipeCard({ recipe, onView }) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
                <p className="text-gray-600 mb-4">{recipe.description}</p>
                <button
                    onClick={() => onView(recipe)}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                >
                    View Recipe
                </button>
            </div>
        </div>
    );
}


export default RecipeCard;