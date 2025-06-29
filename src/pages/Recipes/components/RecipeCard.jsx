import React from 'react';

function RecipeCard({ recipe, onView }) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
            <img
                src={recipe.image}
                // src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F--jj6-iM9YQU%2FVjJV0O-Bq_I%2FAAAAAAAAAOk%2Fl1wJkkOZTLQ%2Fs1600%2Fbraised-pork-adobo.jpg&f=1&nofb=1&ipt=7c395587322e43f4698819a5dce08aa013eaa9f25be1cdbd613ce937ac1b6a7e"}
                alt={recipe.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
                <p className="text-gray-600 mb-4">{recipe.description}</p>
                <div className='flex justify-end mt-auto'>

                    <button
                        onClick={() => onView(recipe)}
                        className="bg-gray-800 text-white px-4 py-2 max-w-1/2 rounded hover:bg-gray-900"
                    >
                        View Recipe
                    </button>
                </div>
            </div>
        </div>
    );
}


export default RecipeCard;