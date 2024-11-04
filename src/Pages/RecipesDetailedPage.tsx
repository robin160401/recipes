import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase";
import { QueryData } from "@supabase/supabase-js";
import { Link, useParams } from "react-router-dom";

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
		console.log(result.data)
		return result;
	}
	type RecipeData = QueryData<ReturnType<typeof getRecipeDetails>>;

	useEffect(() => {
		if (id)
			getRecipeDetails(id).then((result) => {setRecipe(result.data)})
	},[]);

	return <div>
		<p>Zutaten:</p>
		{recipe?.map((el) => {
			return <div key={el.id}>
				{el.ingredients.map((el) => <li key={el.id}>{el.name}</li>)}
			</div>
		})}
		<p>Zubereitung</p>
		{recipe?.map((el) => <div>
			{el.instructions}
		</div>)}
		<p>Zusätzliche Informationen</p>
		{recipe?.map((el) => <div>
			{el.description}
		</div>)}
	</div>
}