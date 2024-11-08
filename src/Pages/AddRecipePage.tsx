import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { QueryData } from "@supabase/supabase-js";

export default function AddRecipePage(){
	const nameInputRef = useRef<HTMLInputElement>(null);
	const descriptionInputRef = useRef<HTMLInputElement>(null);
	const portionsInputRef = useRef<HTMLInputElement>(null);
	const instructionsInputRef = useRef<HTMLInputElement>(null);
	const categorySelectRef = useRef<HTMLSelectElement>(null);
	const [categories, setCategories] = useState<CategorieData>([]);

	const getAllCategories = async () => {
		const result = await supabase.from("categories").select("*");
		return result;
	};
	type CategorieData = QueryData<ReturnType<typeof getAllCategories>>;

	useEffect(() => {
		getAllCategories().then((result) => setCategories(result.data || []));
	},[]);

	return <div>
		<form onSubmit={async (event)=> {
			event.preventDefault();
			const result = await supabase.from("recipes").insert({
				name: nameInputRef.current!.value,
				description: descriptionInputRef.current!.value,
				instructions: instructionsInputRef.current!.value,
				category_id: categorySelectRef.current!.value
			});
			console.log(result);
		}}>
			<label>Name:</label>
			<input
				type="text"
				value={ingredient.name}
				onChange={(e) => setIngredients((oldIngredients)=>(produce(oldIngredients, (ingredientsDraft) => {
					ingredientsDraft[index].name = e.target.value;
				})))}
				/>
			<label>Description:</label>
			<input type="text" ref={descriptionInputRef} name="description" required/>
			<label>Portions:</label>
			<input type="number" ref={portionsInputRef} name="portions" required/>
			<label>Instruction:</label>
			<input type="text" ref={instructionsInputRef} name="instructions" required/>
			<label>Categorie:</label>
			<select name="categorie" id="" ref={categorySelectRef}>
				{categories.map((el) => <option>{el.name}</option>)}
			</select>
			<button>Hinzufügen</button>
		</form>
	</div>
}