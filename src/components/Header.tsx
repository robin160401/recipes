import { Link } from "react-router-dom";
import logo from "../assets/img/Ico.png";
import hero from "../assets/img/heroimgrecipes.jpeg";

export default function Header(){
	return <header className="">
		<div className="bg-yellow-400 h-8"></div>
		<div className="flex justify-between m-6">
			<div className="flex ml-20">
				<img src={logo} alt="" />
				<h1 className="ml-5 text-xl">Die Rezeptwelt</h1>
			</div>
			<nav className="font-bold">
				<Link to="/" className="mr-10">Home</Link> 
				<Link to="/recipes" className="mr-10">Rezepte</Link>
				<Link to="/addrecipe" className="mr-10">Neues Rezept</Link>
				<Link to="/aboutus" className="">Über uns</Link>
				<Link to="/login" className="ml-40 mr-10">Login</Link>
			</nav>
		</div>
		<div className="h-80">
			<h2 className="">Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erlben sie unvergessliche Momente bei Tisch.</h2>
			<img src={hero} alt="" className="w-full h-72 object-cover"/>
		</div>
	</header>
}