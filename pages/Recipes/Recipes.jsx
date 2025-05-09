import React from 'react'
import { useState, useEffect, useRef } from 'react'
// import Navbar from '../../components/Navbar'

import api from '../../util/api';
import ViewRecipeModal from './components/ViewRecipeModal';
import AddRecipeModal from './components/AddRecipeModal';
import EditRecipeModal from './components/EditRecipeModal';
import RecipeCard from './components/RecipeCard';
import MainLayout from '../../components/Layout/MainLayout';

function Recipes() {
    const [recipes, setRecipes] = useState([]); // State to manage the list of recipes
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false); // State to control the modal visibility
    const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false); // State to control the add recipe modal visibility
    const [isEditRecipeModalOpen, setIsEditRecipeModalOpen] = useState(false); // State to control the edit recipe modal visibility
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State to store the selected recipe


    // Fetch recipes from the backend when the component mounts
    useEffect(() => {

        const fetchRecipes = async () => {
            console.log("Fetching recipes...");
            try {
                console.log("Trying to fetch recipes...");
                const response = await api.get('/recipes');
                if (response.status === 200) {
                    console.log("Trying to validate recipes...");
                    console.log("Response", response.data);
                    setRecipes(response.data); // Set the recipes state with the fetched data

                }
            } catch (err) {
                console.error('Error fetching recipes: ', err);
            }
        };

        fetchRecipes();

    }, []);

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

    const openEditRecipeModal = (recipe) => {
        closeRecipeModal(); // Close the view recipe modal
        setSelectedRecipe(recipe); // Set the selected recipe to be edited
        setIsEditRecipeModalOpen(true);
    };

    const closeEditRecipeModal = () => {
        setIsEditRecipeModalOpen(false);
    };

    const handleRecipeDeleted = (deletedRecipeId) => {
        const updatedRecipes = recipes.filter((recipe) => recipe._id !== deletedRecipeId);
        setRecipes(updatedRecipes);
    }


    const editRecipe = (updatedRecipe) => {
        const updatedRecipes = recipes.map((recipe) =>
            recipe._id === updatedRecipe._id ? updatedRecipe : recipe
        );
        setRecipes(updatedRecipes);
    };


    const addRecipe = (newRecipe) => {
        setRecipes([...recipes, { ...newRecipe, id: recipes.length + 1 }]);
    };

    return (

        <MainLayout>

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
                        key={recipe._id}
                        recipe={recipe}
                        onView={openRecipeModal} // Pass the openModal function as a prop
                    />
                ))}
            </div>

            <ViewRecipeModal isOpen={isRecipeModalOpen} onClose={closeRecipeModal} hasRecipe={selectedRecipe} onOpenEditRecipeModal={() => openEditRecipeModal(selectedRecipe)} onRecipeDeleted={handleRecipeDeleted}>
                {selectedRecipe && (
                    <div className='h-full'>
                        <h2 className="text-2xl font-bold mb-4">{selectedRecipe.title}</h2>
                        <img
                            src={selectedRecipe.image}
                            // src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F--jj6-iM9YQU%2FVjJV0O-Bq_I%2FAAAAAAAAAOk%2Fl1wJkkOZTLQ%2Fs1600%2Fbraised-pork-adobo.jpg&f=1&nofb=1&ipt=7c395587322e43f4698819a5dce08aa013eaa9f25be1cdbd613ce937ac1b6a7e"}
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
                            {selectedRecipe.instructions.map((step, index) => (
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
        </MainLayout>

    )
}

export default Recipes