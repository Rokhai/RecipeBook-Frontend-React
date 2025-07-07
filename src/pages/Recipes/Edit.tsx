import MainLayout from "@/components/Layout/MainLayout"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import api from "@/util/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { LoaderCircle, MoveLeft, Delete, Plus, Save } from "lucide-react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: z
        .any()
        .refine(
            (file) => !file || (file instanceof File && file.size > 0),
            { message: "Image is required" }
        )
        .optional(),
    ingredients: z.array(z.string()).min(1, "At least one ingredient is required"),
    instructions: z.array(z.string()).min(1, "At least one Instructions are required"),
});

export default function Edit() {
    const navigate = useNavigate();
    const location = useLocation();
    const recipe = location.state?.recipe || null;

    const [imagePreview, setImagePreview] = useState<string | null>(recipe ? recipe.image : null);
    const [submitting, setSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: recipe ? recipe.title : "",
            description: recipe ? recipe.description : "",
            image: null,
            ingredients: recipe ? recipe.ingredients : [""],
            instructions: recipe ? recipe.instructions : [""],
        }
    });


    const {
        fields: ingredientsFields,
        append: appendIngredient,
        remove: removeIngredient } = useFieldArray({
            control: form.control,
            name: "ingredients",
        });

    const {
        fields: instructionFields,
        append: appendInstruction,
        remove: removeInstruction,
    } = useFieldArray({
        control: form.control,
        name: "instructions",
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setSubmitting(true);
        const formData = new FormData();

        if (recipe.title !== values.title) {
            formData.append('title', values.title);
        }
        if (recipe.description !== values.description) {
            formData.append('description', values.description);
        }
        if (recipe.ingredients !== values.ingredients) {
            formData.append('ingredients', values.ingredients.join(', '));
        }
        if (recipe.instructions !== values.instructions) {
            formData.append('instructions', values.instructions.join(', '));
        }
        if (recipe.image !== values.image) {
            formData.append('image', values.image);
        }

        try {
            const response = await api.patch('/recipes/' + recipe._id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.status === 200) {
                toast.success("Change recipe successfully", {
                    position: "top-right"
                })

                setTimeout(() => {
                    navigate('/recipes')
                }, 1000)
            }
        } catch (err) {
            toast.error(`Error changing recipe: ${err}`, {
                position: "top-right"
            })
        } finally {
            setSubmitting(false)
        }

    }

    return (
        <MainLayout>
            <div className="md:w-1/2 mx-auto my-4  " >
                <Link to={'/recipes'}>
                    <Button variant={"link"}>
                        <MoveLeft />
                        <span>Back to recipes</span>
                    </Button>
                </Link>
            </div>
            <section className="md:w-1/2 px-4 flex justify-center items-center mx-auto my-5">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                        <div>
                            <div className="h-64  border-2 border-primary mb-4 py-2 flex justify-center items-center">
                                {!imagePreview ? (
                                    <span className="text-muted-foreground">No Image Selected</span>

                                ) : (

                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="my-2 rounded border h-full object-cover"
                                    />
                                )}
                            </div>
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={e => {
                                                    field.onChange(e.target.files?.[0])
                                                    if (e.target.files && e.target.files[0]) {
                                                        const file = e.target.files[0];
                                                        setImagePreview(URL.createObjectURL(file));
                                                    } else {
                                                        setImagePreview(null);
                                                    }
                                                }}
                                                disabled={submitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recipe Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter recipe title..."
                                            disabled={submitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            id="description"
                                            placeholder="Enter your recipe description here..."
                                            className="resize-none h-32"
                                            disabled={submitting}
                                            {...field}

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ingredients"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ingredients</FormLabel>
                                    {ingredientsFields.map((field, index) => (
                                        <div key={field.id} className="flex gap-2 mb-2">
                                            <Input
                                                {...form.register(`ingredients.${index}`)}
                                                placeholder={`Ingredient #${index + 1}`}
                                                disabled={submitting}
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={() => removeIngredient(index)}
                                                disabled={submitting || ingredientsFields.length === 1}
                                            >
                                                <Delete className="w-4 h-4" />
                                                <span>

                                                    Remove
                                                </span>
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => appendIngredient("")}
                                        disabled={submitting}
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Ingredient
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="instructions"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Instructions</FormLabel>
                                    {instructionFields.map((field, index) => (
                                        <div key={field.id} className="flex gap-2 mb-2">
                                            <Input
                                                {...form.register(`instructions.${index}`)}
                                                placeholder={`Step #${index + 1}`}
                                                disabled={submitting}
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={() => removeInstruction(index)}
                                                disabled={submitting || instructionFields.length === 1}
                                            >
                                                <Delete className="w-4 h-4" />
                                                <span>Remove</span>
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => appendInstruction("")}
                                        disabled={submitting}
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Step
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between gap-4">
                            <Link to={"/recipes"} className="flex-1">
                                <Button type="button" variant={"outline"} className="w-full">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={submitting} className="flex-1">
                                {submitting ? (
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                ) : (
                                    <Save className="w-5 h-5 mr-2" style={{ width: "24px", height: "24px" }} />
                                )}
                                <span>Save Changes</span>
                            </Button>

                        </div>
                    </form>
                </Form>
            </section>
            <Toaster closeButton />
        </MainLayout>
    )
}