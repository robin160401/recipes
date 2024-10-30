import { Link } from "react-router-dom";
import logo from "../assets/img/Ico.png";
import hero from "../assets/img/heroimgrecipes.jpeg";

export default function Header(){
	return <header>
		<div className="bg-yellow-400 h-8"></div>
		<div className="flex justify-between">
			<div className="flex">
				<img src={logo} alt="" />
				<h1>Die Rezeptwelt</h1>
			</div>
			<nav>Home Rezepte Über uns Login</nav>
		</div>
		<h2 className="bg-[url('../assets/img/heroimgrecipes.jpeg')]">Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erlben sie unvergessliche Momente bei Tisch.</h2>
	</header>
}