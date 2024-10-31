import { Link } from "react-router-dom";

interface RecipeProps {
	category_id: string | null;
	created_at: string;
	description: string;
	id: string;
	instructions: string;
	name: string;
	servings: number;
	image_url: string;
	rating: string;
}

export default function RecipeCard(props: RecipeProps){
	return <div>
		<img src={props.image_url} alt="" />
		<div>
			<h1>{props.name}</h1>
			<p>{props.description}</p>
			<Link to={`/recipe/${props.id}`}>Zum Rezept</Link>
		</div>
	</div>
}