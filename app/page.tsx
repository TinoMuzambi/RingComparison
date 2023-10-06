import Items from "@/components/items";
import { Filter } from "@/interfaces";
import { getItems } from "@/utils";

export default async function Home() {
	const filter: Filter = {
		retailer: null,
		type: null,
		colour: null,
		clarity: null,
		metal: null,
	};

	const data = await getItems(filter);

	return (
		<main className="flex min-h-screen flex-col gap-4">
			<Items items={data} />
		</main>
	);
}
