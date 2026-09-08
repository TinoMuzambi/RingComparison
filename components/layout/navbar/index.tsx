import Link from "next/link";

export default function Navbar() {
	return (
		<header className="site-header">
			<Link className="brand" href="/">
				<span className="brand-mark" aria-hidden="true">
					<span>RL</span>
				</span>
				<span>
					<strong>Ring Ledger</strong>
					<small>South African quote comparison</small>
				</span>
			</Link>
			<a
				className="source-link"
				href="https://github.com/TinoMuzambi/RingComparison"
				target="_blank"
				rel="noreferrer"
			>
				View source
			</a>
		</header>
	);
}
