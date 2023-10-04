import Link from "next/link";
import Search from "./search";

export default async function Navbar() {
	return (
		<nav>
			<Link href="/">
				<h1 className="text-4xl font-bold">Comparisons</h1>
			</Link>
			<Search />
		</nav>
	);
}
