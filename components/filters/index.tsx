import Link from "next/link";

import {
	ExplorerState,
	FilterField,
	FilterOption,
	sortFields,
} from "@/interfaces";
import { getFilterOptions, hasActiveFilters } from "@/utils";

interface FiltersProps {
	state: ExplorerState;
}

const fields: ReadonlyArray<{
	name: FilterField;
	label: string;
	emptyLabel: string;
}> = [
	{ name: "retailer", label: "Retailer", emptyLabel: "All retailers" },
	{ name: "type", label: "Diamond source", emptyLabel: "All sources" },
	{ name: "colour", label: "Colour grade", emptyLabel: "All colours" },
	{ name: "clarity", label: "Clarity", emptyLabel: "All clarities" },
	{ name: "metal", label: "Metal", emptyLabel: "All metals" },
];

const Options = ({ items }: { items: FilterOption[] }) =>
	items.map((item) => (
		<option value={item.value} key={item.value}>
			{item.label}
		</option>
	));

export default function Filters({ state }: FiltersProps) {
	const options = getFilterOptions(state.ringType);
	const selectedOrder = state.sort
		? `${state.sort}:${state.direction}`
		: "";

	return (
		<section className="controls" aria-labelledby="explore-heading">
			<div className="collection-switcher" aria-label="Ring collection">
				<Link
					href="/?ringType=engagement"
					aria-current={state.ringType === "engagement" ? "page" : undefined}
				>
					Engagement rings
				</Link>
				<Link
					href="/?ringType=wedding-band"
					aria-current={state.ringType === "wedding-band" ? "page" : undefined}
				>
					Wedding bands
				</Link>
			</div>

			<div className="controls-heading">
				<div>
					<h2 id="explore-heading">Explore the quotes</h2>
					<p>Search every field, then narrow the ledger with verified values.</p>
				</div>
				{hasActiveFilters(state) ? (
					<Link className="clear-link" href={`/?ringType=${state.ringType}`}>
						Clear filters
					</Link>
				) : null}
			</div>

			<form action="/" method="get" className="filter-form">
				<input type="hidden" name="ringType" value={state.ringType} />
				<div className="search-field">
					<label htmlFor="q">Search the ledger</label>
					<div className="search-input">
						<svg aria-hidden="true" viewBox="0 0 24 24">
							<path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
						</svg>
						<input
							id="q"
							name="q"
							type="search"
							maxLength={80}
							defaultValue={state.query}
							placeholder="Retailer, metal, payment option…"
						/>
					</div>
				</div>

				<div className="filter-grid">
					{fields.map((field) => (
						<label key={field.name}>
							<span>{field.label}</span>
							<select
								name={field.name}
								defaultValue={state.filter[field.name] ?? ""}
							>
								<option value="">{field.emptyLabel}</option>
								<Options items={options[field.name]} />
							</select>
						</label>
					))}

					<label>
						<span>Order</span>
						<select name="order" defaultValue={selectedOrder}>
							<option value="">Source order</option>
							{sortFields.map((field) => (
								<option
									key={`${field.field}:${field.direction}`}
									value={`${field.field}:${field.direction}`}
								>
									{field.label}
								</option>
							))}
						</select>
					</label>
				</div>

				<button className="apply-button" type="submit">
					Update results
				</button>
			</form>
		</section>
	);
}
