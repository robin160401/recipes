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
		<div className="w-full h-80 w-100 object-cover flex items-center justify-center" style={{ 
    		backgroundImage: 'url("https://s3-alpha-sig.figma.com/img/d0c1/3ace/f719ec8806ea906f47143c2b20b269d5?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CCplVzweHBOzh6fIYKOM7p9wgt1M4cqiV2iRj94TR3yTx1nIK1ar3r3FMm3CegrFR~w51A7BAyQhnuNkLjat5B2icKBmv82UFqKLRqtN27fORkujnE58nwnqAfBP8T~o8SGSvDSuX8cyDpGNP1Lwx6nK~l2u-JFCscqzrrgvvJ1gEh0lKxi73Ac2dfSZuqymts383~4iK2ldAaWDyuk-71rVXnqIRFON6ClKcMiPYr1PSP2aKdbuZHSuxVdOiNzV4n8NadhmSR5I1D1M9E1~tu2ORWrk4LbfvkPz3~j8zKdrEfiqCn8iLj~PEvHJF7uMfSwCxomHJ70FaRe~2q4lVg__")',
    		backgroundSize: 'cover',
    		backgroundPosition: 'center',
    		backgroundRepeat: 'no-repeat',
    		backgroundBlendMode: 'overlay',
   			backgroundColor: 'rgba(0, 0, 0, 0.6)',
		}}>
			<h2 className="text-2xl text-white w-4/6 text-center">
				Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben sie unvergessliche Momente bei Tisch.
			</h2>
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