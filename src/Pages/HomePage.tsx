import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { supabase } from "../lib/supabase";

export default function HomePage(){
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
    	image_url: string | null;
    	instructions: string;
    	name: string;
    	rating: number | null;
    	servings: number;
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