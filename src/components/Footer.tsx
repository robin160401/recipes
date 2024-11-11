import logo from "../assets/img/Ico.png";
import youtube from "../assets/img/Youtube Icon.png"
import twitter from "../assets/img/Twitter Icon.png"
import browser from "../assets/img/Browser Icon.png"
import pinterest from "../assets/img/Pinterest Icon.png"

export default function Footer(){
	return <footer className="bg-yellow-400 flex h-40">
		<div className="flex h-12 ml-20 mt-12">
			<img src={logo} alt="" className="h-8"/>
			<p className="text-3xl mr-40 ml-6 w-80">Die Rezeptwelt</p>
		</div>
		<div className="mt-8 text-xl font-semibold">
			<p className="mb-5">Social Media</p>
			<div className="flex gap-2">
				<img src={youtube} alt="" />
				<img src={twitter} alt="" />
				<img src={browser} alt="" />
				<img src={pinterest} alt="" />
			</div>
		</div>
	</footer>
}