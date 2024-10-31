import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import RecipeCard from "./RecipeCard";

export default function Data(){
	const [recipeCardData, setRecipeCardData] = useState<RecipeData>(null);
	const getData = async () => {
		const result = await supabase.from('recipes').select('*')
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

	return <div>
		{recipeCardData?.map((result) => {
			return <RecipeCard {...result}  />
		})}
	</div>
}