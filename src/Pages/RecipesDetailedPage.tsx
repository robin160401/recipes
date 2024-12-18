import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase";
import { QueryData } from "@supabase/supabase-js";
import { useParams } from "react-router-dom";

export default function RecipesDetailedPage(){
	const [recipe, setRecipe] = useState<RecipeData | null>(null);
	const { id } = useParams();


	const getRecipeDetails = async (searchId: string) => {
		const result = await supabase
		.from('recipes')
		.select(
			`
			id,
			name,
			description,
			servings,
			instructions,
			image_url,
			rating,
			ingredients(
			name,
			quantity,
			unit
			)
			`)
		.eq('id', searchId)
		.single()
		return result;
	}
	type RecipeData = QueryData<ReturnType<typeof getRecipeDetails>>;

	useEffect(() => {
		if (id)
			getRecipeDetails(id).then((result) => setRecipe(result.data))
	},[]);
	if (recipe?.image_url)
	return <div>
		<img src={recipe.image_url} alt="" className="w-full h-80 w-100 object-cover"/>
		<p className="text-3xl">Zutaten:</p>
			<div>
				{recipe?.ingredients.map((el) => <li key={el.name}>{el.name}</li>)}
			</div>
		<p>Zubereitung</p>
		<div>
			{recipe?.instructions}
		</div>
		<p>Zusätzliche Informationen</p>
		<div>
			{recipe?.description}
		</div>
	</div>
}