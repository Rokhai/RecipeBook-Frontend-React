import { Link } from 'react-router';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, Pencil} from "lucide-react";
import { toast } from "sonner";
import api from '../../../util/api';


export default function RecipeCard({ recipe, onDelete }) {
    // console.log("RecipeCard", recipe);

    const handleDeleteRecipe = async () => {
        // console.log("Deleting recipe:", recipe._id);
        try {
            const response = await api.delete(`/recipes/${recipe._id}`);
            if (response.status === 200) {
                toast.success("Recipe deleted successfully", {
                    position: "top-right"
                });
                // Optionally, you can navigate to another page or update the state to remove the recipe
                setTimeout(() => {
                    // Simulate a delete request
                    console.log("Recipe deleted:", recipe._id);
                    onDelete(recipe._id); // Call the onDelete function passed from parent
                    // navigate('/recipes');
                }, 1500);
            }
        } catch (err) {
            toast.error(`Error deleting recipe: ${err}`, {
                position: "top-right"
            });
        }
    }

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
                    {/* 
                    <Button onClick={() => onView(recipe)}>
                        View Recipe
                    </Button> */}
                    <Dialog >
                        <DialogTrigger asChild>
                            <Button>
                                View Recipe
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl h-[70vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{recipe.title}</DialogTitle>
                                <DialogDescription>
                                    {recipe.description}
                                </DialogDescription>
                            </DialogHeader>
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-48 object-cover mb-4"
                            />
                            <h3 className="text-xl font-bold mb-2">Ingredients:</h3>
                            <ul className="list-disc list-inside mb-4">
                                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className="mb-2">{ingredient}</li>
                                ))}
                            </ul>
                            <h3 className="text-xl font-bold mb-2">Recipe:</h3>
                            <ol className="list-disc list-inside mb-4">
                                {recipe.instructions.map((step, index) => (
                                    <li key={index} className="mb-2 list-none">{step}</li>
                                ))}
                            </ol>
                            <DialogFooter className="flex flex-row justify-between w-full">
                                <div className="w-full">
                                    <DialogClose asChild>

                                        <Button variant={"outline"}>
                                            Back
                                        </Button>
                                    </DialogClose>
                                </div>
                                <div className="flex gap-2 w-full md:flex-row md:justify-end">
                                    <Link to={`/recipes/edit/${recipe._id}`} state={{ recipe }}>
                                        <Button>
                                            <Pencil/>
                                            Edit Recipe
                                        </Button>
                                    </Link>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant={"destructive"}>
                                                <Trash2 />

                                                Delete Recipe
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete this recipe.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>No, Keep It!</AlertDialogCancel>
                                                <AlertDialogAction asChild>
                                                    <Button variant={"destructive"} onClick={handleDeleteRecipe}>
                                                        <Trash2 />
                                                        Yes, delete it
                                                    </Button>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

