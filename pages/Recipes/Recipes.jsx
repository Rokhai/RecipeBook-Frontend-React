import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar'

import ViewRecipeModal from './components/ViewRecipeModal';
import AddRecipeModal from './components/AddRecipeModal';
import EditRecipeModal from './components/EditRecipeModal';
import RecipeCard from './components/RecipeCard';

const recipeData = [
    {
        id: 1,
        title: "Braised Pork Adobo",
        description: "A classic Filipino dish made with pork braised in soy sauce, vinegar, and garlic.",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F--jj6-iM9YQU%2FVjJV0O-Bq_I%2FAAAAAAAAAOk%2Fl1wJkkOZTLQ%2Fs1600%2Fbraised-pork-adobo.jpg&f=1&nofb=1&ipt=7c395587322e43f4698819a5dce08aa013eaa9f25be1cdbd613ce937ac1b6a7e",
        ingredients: [
            "Pork belly",
            "Soy sauce",
            "Vinegar",
            "Garlic",
            "Bay leaves"
        ],
        recipe: [
            "Combine soy sauce, vinegar, garlic, and bay leaves in a bowl.",
            "Add pork and marinate for at least 30 minutes.",    
        ]
    },
    {
        id: 2,
        title: "Chicken Curry",
        description: "A flavorful dish made with chicken, spices, and coconut milk.",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbigoven-res.cloudinary.com%2Fimage%2Fupload%2Fchicken-curry-59.jpg&f=1&nofb=1&ipt=84489cd00efa80bb92431c9c1daba0cfdb9b50251995405d85b810f525ef554d",
        ingredients: [
            "Chicken",
            "Curry powder",
            "Coconut milk",
            "Onion",
            "Garlic"
        ],
        recipe: [
            "1. Heat oil in a pan and sauté onion and garlic.",
            "2. Add chicken and cook until browned.",
            "3. Stir in curry powder and coconut milk, simmer until chicken is cooked through."
        ],
    },
    {
        id: 3,
        title: "Braised Pork Adobo",
        description: "A classic Filipino dish made with pork braised in soy sauce, vinegar, and garlic.",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F--jj6-iM9YQU%2FVjJV0O-Bq_I%2FAAAAAAAAAOk%2Fl1wJkkOZTLQ%2Fs1600%2Fbraised-pork-adobo.jpg&f=1&nofb=1&ipt=7c395587322e43f4698819a5dce08aa013eaa9f25be1cdbd613ce937ac1b6a7e",
    },
    {
        id: 4,
        title: "Chicken Curry",
        description: "A flavorful dish made with chicken, spices, and coconut milk.",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbigoven-res.cloudinary.com%2Fimage%2Fupload%2Fchicken-curry-59.jpg&f=1&nofb=1&ipt=84489cd00efa80bb92431c9c1daba0cfdb9b50251995405d85b810f525ef554d"
    },
    {
        id: 5,
        title: "Braised Pork Adobo",
        description: "A classic Filipino dish made with pork braised in soy sauce, vinegar, and garlic.",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F--jj6-iM9YQU%2FVjJV0O-Bq_I%2FAAAAAAAAAOk%2Fl1wJkkOZTLQ%2Fs1600%2Fbraised-pork-adobo.jpg&f=1&nofb=1&ipt=7c395587322e43f4698819a5dce08aa013eaa9f25be1cdbd613ce937ac1b6a7e",
    },
    {
        id: 6,
        title: "Chicken Curry",
        description: "A flavorful dish made with chicken, spices, and coconut milk.",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbigoven-res.cloudinary.com%2Fimage%2Fupload%2Fchicken-curry-59.jpg&f=1&nofb=1&ipt=84489cd00efa80bb92431c9c1daba0cfdb9b50251995405d85b810f525ef554d"
    },
    {
        id: 7,
        title: "Braised Pork Adobo",
        description: "A classic Filipino dish made with pork braised in soy sauce, vinegar, and garlic.",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F--jj6-iM9YQU%2FVjJV0O-Bq_I%2FAAAAAAAAAOk%2Fl1wJkkOZTLQ%2Fs1600%2Fbraised-pork-adobo.jpg&f=1&nofb=1&ipt=7c395587322e43f4698819a5dce08aa013eaa9f25be1cdbd613ce937ac1b6a7e",
    },
    {
        id: 8,
        title: "Chicken Curry",
        description: "A flavorful dish made with chicken, spices, and coconut milk.",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbigoven-res.cloudinary.com%2Fimage%2Fupload%2Fchicken-curry-59.jpg&f=1&nofb=1&ipt=84489cd00efa80bb92431c9c1daba0cfdb9b50251995405d85b810f525ef554d"
    }
    // Add more recipes here   
]




function Recipes() {
    const [recipes, setRecipes] = useState(recipeData); // State to manage the list of recipes
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false); // State to control the modal visibility
    const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false); // State to control the add recipe modal visibility
    const [isEditRecipeModalOpen, setIsEditRecipeModalOpen] = useState(false); // State to control the edit recipe modal visibility
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State to store the selected recipe

    

    const openRecipeModal = (recipe) => {
        setSelectedRecipe(recipe);
        setIsRecipeModalOpen(true);
    };

    const closeRecipeModal = () => {
        setIsRecipeModalOpen(false);
        setSelectedRecipe(null);
    };

    const openAddRecipeModal = () => {
        setIsAddRecipeModalOpen(true);
    };

    const closeAddRecipeModal = () => {
        setIsAddRecipeModalOpen(false);
    };

    const openEditRecipeModal = () => {
        closeRecipeModal(); // Close the view recipe modal
        setIsEditRecipeModalOpen(true);
    };

    const closeEditRecipeModal = () => {
        setIsEditRecipeModalOpen(false);
    };

    
    const editRecipe = (updatedRecipe) => {
        const updatedRecipes = recipes.map((recipe) =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        );
        setRecipes(updatedRecipes);
    };


    const addRecipe = (newRecipe) => {
        setRecipes([...recipes, { ...newRecipe, id: recipes.length + 1 }]);
    };

    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10 mt-5">
                <button
                    onClick={openAddRecipeModal} 
                    className="bg-gray-800 text-white px-6 py-4 rounded hover:bg-gray-900 col-start-8 col-end-8">
                    Add Recipe
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10 mt-5">
                {recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onView={openRecipeModal} // Pass the openModal function as a prop
                    />
                ))}
            </div>

            <ViewRecipeModal isOpen={isRecipeModalOpen} onClose={closeRecipeModal} onOpenEditRecipeModal={openEditRecipeModal}>
                {selectedRecipe && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">{selectedRecipe.title}</h2>
                        <img
                            src={selectedRecipe.image}
                            alt={selectedRecipe.title}
                            className="w-full h-48 object-cover mb-4"
                        />
                        <p className="text-gray-600 mb-4">{selectedRecipe.description}</p>
                        <h3 className="text-xl font-bold mb-2">Ingredients:</h3>
                        <ul className="list-disc list-inside mb-4">
                            {selectedRecipe.ingredients && selectedRecipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="mb-2">{ingredient}</li>
                            ))}
                        </ul>
                        <h3 className="text-xl font-bold mb-2">Recipe:</h3>
                        <ol className="list-disc list-inside mb-4">
                            {selectedRecipe.recipe.map((step, index) => (
                                <li key={index} className="mb-2 list-none">{step}</li>
                            ))}
                        </ol>
                        {/* Add more recipe details here */}
                      
                    </div>
                )}
            </ViewRecipeModal>
            <AddRecipeModal
                isOpen={isAddRecipeModalOpen}
                onClose={closeAddRecipeModal}
                onAddRecipe={addRecipe}
            />
             <EditRecipeModal
                isOpen={isEditRecipeModalOpen}
                onClose={closeEditRecipeModal}
                recipe={selectedRecipe}
                onEditRecipe={editRecipe}
            />
        </div>
    )
}

export default Recipes