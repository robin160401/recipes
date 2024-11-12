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
		<div className="mx-auto items-center flex flex-col w-3/5 mt-32 bg-slate-50">
			<h1 className="text-3xl mt-5">Login</h1>
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
				} className="w-3/5 shadow-md p-5">
					<Input className="my-3" type="text" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}></Input>
					<Input className="my-3" type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}></Input>
					<Button className="mb-3">Log in</Button>
				</form>
			</Form>
			<div className="w-full h-80 w-100 object-cover flex items-center justify-center mt-10" style={{ 
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
		</div>
	)
}