import Search from "./search";

export default async function Navbar() {
	return (
		<nav>
			<h1 className="text-4xl font-bold">Comparisons</h1>
			<Search />
		</nav>
	);
}
