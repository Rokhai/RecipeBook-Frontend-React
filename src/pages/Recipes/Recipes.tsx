import { Link } from 'react-router';
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { CirclePlus, LoaderCircle, SquarePen } from 'lucide-react';

import api from '@/util/api';
import RecipeCard from './components/RecipeCard';
import MainLayout from '../../components/Layout/MainLayout';

export default function Recipes() {
    const [recipes, setRecipes] = useState([]); // State to manage the list of recipes

    // Fetch recipes from the backend when the component mounts
    useEffect(() => {
        const fetchRecipes = async () => {
            console.log("Fetching recipes...");
            try {
                console.log("Trying to fetch recipes...");
                const response = await api.get('/recipes');
                if (response.status === 200) {
                    setRecipes(response.data); // Set the recipes state with the fetched data
                }
            } catch (err) {
                toast.error('Error fetching recipes');
                console.error('Error fetching recipes: ', err);
            }
        };
        fetchRecipes();
    }, []);

    // Handle Delete Recipe
    /**
     * 
     * @param {string} deletedRecipeId - The ID of the recipe that was deleted.
     * @returns {void}
     * @description
     * This function is used to update the state of the recipes after a recipe has been deleted
     * from the RecipeCard component. It takes the ID of the deleted recipe as an argument
     * and filters the current list of recipes to remove that recipe.
     * The filtered list is then set as the new state for recipes using the `setRecipes` function.
     * This ensures that the UI reflects the current state of recipes without needing to refetch all recipes from the backend.
     */
    const handleRecipeDeleted = (deletedRecipeId) => {
        const updatedRecipes = recipes.filter((recipe) => recipe._id !== deletedRecipeId);
        setRecipes(updatedRecipes);
    }

    return (
        <MainLayout>
            {recipes.length > 0 ? (
                <section className='relative py-5 mb-10'>
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10 mt-5">
                    <Link to={"/recipes/create"} className='col-start-4 col-end-4  place-self-end '>
                        <Button className='px-8 py-6'>
                            Add Recipe
                        </Button>
                    </Link>
                </div> */}
                    <div className='fixed bottom-0 right-0 mb-2 mr-4 z-50 h-[64px] w-[64px] block md:hidden' >
                        <Link to={"/recipes/create"} >
                            <Button className='px-8 py-6 flex flex-row items-center justify-center w-full h-full rounded-full'>
                                <SquarePen className='text-primary-foreground  mb-2 ' style={{ width: "24px", height: "24px" }} />
                                {/* <span>New Recipe</span> */}
                            </Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10 mt-5">
                        <Link to={"/recipes/create"} className='hidden md:block h-96'>
                            <div className='border-2 border-primary h-full flex flex-col justify-center items-center'>
                                <CirclePlus className='text-primary h-16 w-16 mb-2' />
                                <span className='text-sm text-primary'>Add new recipe</span>
                            </div>
                        </Link>
                        {recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe._id}
                                recipe={recipe}
                                onDelete={handleRecipeDeleted} // Pass the delete handler to RecipeCard
                            />
                        ))}
                    </div>
                </section>
            ) : (
                <div className='flex flex-col items-center justify-center space-y-4 h-[80vh]'>

                    <LoaderCircle className='animate-spin h-24 w-24 text-gray-900' />
                    <p>Fetching data...</p>
                </div>
            )}
            <Toaster position='top-center' duration={4000} />
        </MainLayout>
    )
}
