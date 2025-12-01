import Items from "@/components/items";
import { Filter, SortField } from "@/interfaces";
import { getItems, RingType } from "@/utils";

export default async function SearchPage({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const { sort, dir, q, retailer, type, colour, clarity, metal, ringType } =
		searchParams as {
			[key: string]: string;
		};

	const selectedRingType =
		(ringType as RingType) || ("engagement" as RingType);

	const filter: Filter = {
		retailer: retailer === "select" ? null : retailer,
		type: type === "select" ? null : type,
		colour: colour === "select" ? null : colour,
		clarity: clarity === "select" ? null : clarity,
		metal: metal === "select" ? null : metal,
	};

	const items = await getItems(
		filter,
		q,
		sort as SortField,
		dir as "asc" | "desc",
		selectedRingType
	);

	return <Items items={items} />;
}
