import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import RecipeCard from "./RecipeCard";

export default function FavouriteRecipes(){
	const [recipeCardData, setRecipeCardData] = useState<RecipeData>(null);
	const getData = async () => {
		const result = await supabase.from('recipes').select('*').order('rating', {ascending: false}).limit(3);
		return result;
	}

	type RecipeData = {
		category_id: string | null;
    	created_at: string;
    	description: string;
    	id: string;
    	instructions: string;
    	name: string;
    	servings: number;
		image_url: string;
		rating: string;
	}[] 
	| null;

	useEffect(() => {
		getData().then((result) => {setRecipeCardData(result.data);});
	}, [])

	return <div className="mt-3 font-semibold flex-col flex items-center mb-10">
		<h2 className="text-xl">Die beliebtesten Rezepte</h2>
		<div className="flex ">
		{recipeCardData?.map((result) => {
			return <RecipeCard {...result}  />
		})}
		</div>
	</div>
}