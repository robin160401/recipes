import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useUserContext } from "../context/userContext";

export default function RegistrationPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUser } = useUserContext();

	return (
		<div>
			<h1>Sign Up</h1>
			<form onSubmit={async (event) => {
				event.preventDefault();
				const result = await supabase.auth.signUp({email, password});
				if (result.error)
					alert(result.error.message);
				else
					setUser(result.data.user);
			}}>
				<input type="text" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
				<input type="text" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
				<button>Sign up</button>
			</form>
		</div>
	)
}