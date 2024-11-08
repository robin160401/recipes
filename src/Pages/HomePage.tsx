import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { supabase } from "../lib/supabase";
import hero from "../assets/img/heroimgrecipes.jpeg";
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

	return (
	<div className="">
		<div className="">
			<h2 className="">Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben sie unvergessliche Momente bei Tisch.</h2>
			<img src={hero} alt="" className="w-full h-80 w-100 object-cover"/>
		</div>
		<div className="font-semibold flex-col flex items-center mt-8">
			<h2 className="text-2xl mb-8">Die beliebtesten Rezepte</h2>
			<div className="flex justify-center gap-4">
			{recipeCardData?.map((result) => {
				return <RecipeCard {...result}  />
			})}
			</div>
		</div>
	</div>
	)
} 