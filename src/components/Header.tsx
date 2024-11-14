import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useUserContext } from "../context/userContext";
import { useForm } from "react-hook-form"
import logo from "../assets/img/Ico.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Form } from "@/components/ui/form"

export default function Header() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {setUser} = useUserContext();
	const form = useForm();
  return (
    <header>
      <div className="bg-yellow-400 h-8"></div>
      <div className="flex justify-between m-6">
        <div className="flex ml-20 w-80">
          <img className="h-6" src={logo} alt="Logo" />
          <h1 className="ml-5 text-xl">Die Rezeptwelt</h1>
        </div>
        <nav className="font-bold flex text-center">
			<div className="pt-2">
				<Link to="/" className="mr-10">Home</Link>
				<Link to="/recipes" className="mr-10">Rezepte</Link>
				<Link to="/addrecipe" className="mr-10">Neues Rezept</Link>
				<Link to="/aboutus" className="">Über uns</Link>
			</div>
            <Popover>
              <PopoverTrigger className="ml-32"><Button>Login</Button></PopoverTrigger>
              <PopoverContent className="bg-white mx-2 mt-2">
					<Form {...form}>
						<form onSubmit={async (event) => {
							event.preventDefault();
							const result = await supabase.auth.signInWithPassword({email, password});
							if (result.error)
								alert(result.error.message);
							else
								setUser(result.data.user);
							}
						}>
							<p className="font-semibold mt-3">Email</p>
							<Input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}></Input>
							<p className="font-semibold mt-3">Passwort</p>
							<Input className="" type="password" placeholder="Passwort" value={password} onChange={(event) => setPassword(event.target.value)}></Input>
							<div className="mb-3 mt-2">
								<Link to="/" className=" text-blue-700 text-xs hover:underline hover:cursor-pointer"> passwort vergessen</Link>
							</div>
							<Button className="mb-5 bg-yellow-400 hover:bg-yellow-500 ">Log in</Button>
						</form>
					</Form>
					<p className="text-sm">Noch kein Konto?</p>
					<Button className="mt-3 hover:bg-slate-200">Neuen Benutzer erstellen</Button>
              </PopoverContent>
            </Popover>
        </nav>
      </div>
    </header>
  );
}
