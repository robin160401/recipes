import { useEffect, useState } from "react";
import RecipeCard from "../components/BestRatedRecipeCard";
import { supabase } from "../lib/supabase";
import hero from "../assets/img/heroimgrecipes.jpeg";
import BestRatedRecipeCard from "../components/BestRatedRecipeCard";
import NewestRatedRecipeCard from "../components/NewestRecipeCard";
export default function RecipesPage(){
	const [bestRecipesCardData, setBestRecipeCardData] = useState<RecipeData>(null);
	const [newestRecipesCardData, setNewestRecipeCardData] = useState<RecipeData>(null);

	const getBestRatedRecipes = async () => {
		const result = await supabase.from('recipes').select('*').order('rating', {ascending: false}).limit(3);
		return result;
	}

	const getNewestRecipes = async () => {
		const result = await supabase.from('recipes').select('*').order('created_at').limit(3);
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
		getBestRatedRecipes().then((result) => setBestRecipeCardData(result.data));
		getNewestRecipes().then((result) => setNewestRecipeCardData(result.data));
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
			{bestRecipesCardData?.map((result) => {
				return <BestRatedRecipeCard {...result}  />
			})}
			</div>
		</div>
		<div className="font-semibold flex-col flex items-center mt-8">
			<h2 className="text-2xl mb-8">Neueste Rezepte</h2>
			<div className="flex flex-col justify-center w-2/3">
			{newestRecipesCardData?.map((result) => {
				return <NewestRatedRecipeCard {...result}  />
			})}
			</div>
		</div>
	</div>
	)
} 