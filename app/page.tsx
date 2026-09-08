import Filters from "@/components/filters";
import Items from "@/components/items";
import { RawSearchParams } from "@/interfaces";
import { formatCurrency, getData, getItems, parseExplorerParams } from "@/utils";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<RawSearchParams>;
}) {
	const state = parseExplorerParams(await searchParams);
	const items = getItems(state);
	const allItems = getData(state.ringType);
	const prices = items.map((item) => item.price);
	const collectionLabel =
		state.ringType === "engagement" ? "engagement-ring" : "wedding-band";

	return (
		<main>
			<section className="hero">
				<div className="hero-copy">
					<h1>Compare the whole quote, not only the stone.</h1>
					<p>
						A personal research ledger for comparing South African rings by
						price, materials, warranty, lead time and payment terms.
					</p>
				</div>
				<aside className="snapshot-note" aria-label="Data context">
					<span>Research snapshot</span>
					<strong>December 2025</strong>
					<p>Verify current pricing and terms with each retailer before buying.</p>
				</aside>
			</section>

			<Filters state={state} />

			<section className="results" id="results" aria-labelledby="results-heading">
				<div className="results-heading">
					<div>
						<p aria-live="polite">
							{items.length} of {allItems.length} {collectionLabel} quotes
						</p>
						<h2 id="results-heading">Comparison ledger</h2>
					</div>
					{prices.length ? (
						<p className="price-range">
							<span>Visible range</span>
							<strong>
								{formatCurrency(Math.min(...prices))}–{formatCurrency(Math.max(...prices))}
							</strong>
						</p>
					) : null}
				</div>
				<Items items={items} />
			</section>
		</main>
	);
}
