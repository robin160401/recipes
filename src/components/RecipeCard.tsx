import { Link } from "react-router-dom";

interface RecipeProps {
	category_id: string | null;
    created_at: string;
    description: string;
    id: string;
    image_url: string | null;
    instructions: string;
    name: string;
    rating: number | null;
    servings: number;
}

export default function RecipeCard(props: RecipeProps){
	return <div className="w-60 rounded-xl m-5 bg-slate-200">
		<div className="h-32">
			<img src={props.image_url!} alt="" className="w-full h-full object-cover rounded-t-xl" />
		</div>
		<div className="ml-3 mb-8">
			<h1 className="text-lg font-bold mt-5 mb-2">{props.name}</h1>
			<p className="mb-5">{props.description}</p>
			<Link className=" bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:focus:ring-yellow-900" to={`/recipe/${props.id}`}>Zum Rezept</Link>
		</div>
	</div>
}