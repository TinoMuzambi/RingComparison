import Link from "next/link";
import Search from "./search";
import RingTypeToggle from "./ring-type-toggle";

export default async function Navbar() {
	return (
		<nav>
			<Link href="/">
				<h1 className="text-4xl font-bold">Comparisons</h1>
			</Link>
			<RingTypeToggle />
			<Search />
		</nav>
	);
}
