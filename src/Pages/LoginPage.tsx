import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"


export default function LoginPage(){
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {setUser} = useUserContext();
	const navigate = useNavigate();
	const form = useForm();

	return (
		<div className="mx-auto w-1/3 items-center flex flex-col">
			<h1>Login</h1>
			<Form {...form}>
				<form onSubmit={async (event) => {
					event.preventDefault();
					const result = await supabase.auth.signInWithPassword({email, password});
					if (result.error)
						alert(result.error.message);
					else
						setUser(result.data.user);
					navigate('/');
					}
				} className="">
					<Input type="text" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}></Input>
					<Input type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}></Input>
					<Button>Log in</Button>
				</form>
			</Form>
		</div>
	)
}