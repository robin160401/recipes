import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {setUser} = useUserContext();
	const navigate = useNavigate();

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={async (event) => {
				event.preventDefault();
				const result = await supabase.auth.signInWithPassword({email, password});
				if (result.error)
					alert(result.error.message);
				else
					setUser(result.data.user), navigate('/');
			}}></form>
			<input type="text" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
			<input type="text" />
		</div>
	)
}