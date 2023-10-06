import Items from "@/components/items";
import { Filter } from "@/interfaces";
import { getItems } from "@/utils";

export default async function SearchPage({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const { sort, q, retailer, type, colour, clarity, metal } = searchParams as {
		[key: string]: string;
	};

	const filter: Filter = {
		retailer: retailer === "select" ? null : retailer,
		type: type === "select" ? null : type,
		colour: colour === "select" ? null : colour,
		clarity: clarity === "select" ? null : clarity,
		metal: metal === "select" ? null : metal,
	};

	const items = await getItems(filter, q);

	return <Items items={items} />;
}
