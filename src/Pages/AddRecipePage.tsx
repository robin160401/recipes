import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { produce } from "immer";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

type Ingredient = {
  name: string;
  unit: string;
  quantity: number;
  additionalInfo: string;
};

const emptyIngredient: Ingredient = {
  name: "",
  unit: "",
  quantity: 0,
  additionalInfo: "",
};

export default function RecipeCreatePage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    servings: 1,
    instructions: "",
  });

  const navigate  = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const recipeResult = await supabase
      .from("recipes")
      .insert({
        ...recipe,
        category_id: "6fe705c2-8f3d-45c9-9b0d-7492bf716551",
      })
      .select("id")
      .single();

    if (recipeResult.error) {
      alert("Something went wrong");
      return;
    }

    const newRecipeId = recipeResult.data.id;

    const ingredientsResult = await supabase.from("ingredients").insert(
      ingredients.map((element) => ({
        name: element.name,
        additional_info: element.additionalInfo,
        unit: element.unit,
        quantity: 0,
        recipe_id: newRecipeId,
      }))
    );

    if (ingredientsResult.error) {
      alert("Sorry, no Ingredients for you!");
      return;
    }
    navigate(`/recipes/${slugify(recipe.name, {lower: true})}/${newRecipeId}`)
  };

  const addIngredient = () => {
    setIngredients((prev) => [...prev, emptyIngredient]);
  };
  console.log(ingredients);

  return (
	<div className="flex flex-col items-center mb-10">
		<form 
			className="w-3/5"
			onSubmit={handleSubmit}>
		<h1 className="text-3xl">Add New Recipe</h1>
		<div className="shadow-md p-10 mt-10">
			<p>Recipe Name</p>
			<Input
				type="text"
				value={recipe.name}
				required
				onChange={(e) =>
					setRecipe((prev) => ({ ...prev, name: e.target.value }))
					}
			/>
			<p>Description</p>
			<Input
				type="text"
				value={recipe.description}
				onChange={(e) =>
				setRecipe((prev) => ({ ...prev, description: e.target.value }))
				}
				className="h-20"
			/>
			<p>Instructions</p>
			<Input
				type="text"
				value={recipe.instructions}
				onChange={(e) =>
				setRecipe((prev) => ({ ...prev, instructions: e.target.value }))
				}
			/>
			<p>Servings</p>
			<Input
				type="number"
				value={recipe.servings}
				onChange={(e) =>
				setRecipe((prev) => ({ ...prev, servings: Number(e.target.value) }))
				}
			/>
			<Button className="bg-yellow-400 my-5">Submit</Button>
			<div>
				<h3>Ingredients</h3>
				<Button onClick={addIngredient} className="bg-yellow-200 my-5">Add Ingredient</Button>
				<div>
				{ingredients.map((ingredient, index) => {
					return (
					<div key={index}>
						<p className="text-xl mt-4 font-medium">Ingredient</p>
						<Input
						type="text"
						value={ingredient.name}
						onChange={(e) => setIngredients((oldIngredients)=>(produce(oldIngredients, (ingredientsDraft)=>{
							ingredientsDraft[index].name = e.target.value
						})))
						}
						/>
						Unit
						<Input
						type="text"
						value={ingredient.unit}
						onChange={(e) => setIngredients((oldIngredients)=>(produce(oldIngredients, (ingredientsDraft)=>{
							ingredientsDraft[index].unit = e.target.value
						})))
						}
						/>
						<p>Quantity</p>
						<Input
						type="number"
						value={ingredient.quantity}
						onChange={(e) => setIngredients((oldIngredients)=>(produce(oldIngredients, (ingredientsDraft)=>{
							ingredientsDraft[index].quantity = Number(e.target.value)
						})))
						}
						/>
						<p>Additional Info</p>
						<Input
						type="text"
						value={ingredient.additionalInfo}
						onChange={(e) => setIngredients((oldIngredients)=>(produce(oldIngredients, (ingredientsDraft)=>{
							ingredientsDraft[index].additionalInfo = e.target.value
						})))
						}
						/>
						<div className="h-0.5 m-1 bg-black"></div>
					</div>
					);
				})}
				</div>
			</div>
		</div>
		</form>
	</div>
  );
}