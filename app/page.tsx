import Items from "@/components/items";
import { Filter } from "@/interfaces";
import { getItems, RingType } from "@/utils";

export default async function Home({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const ringType =
		(searchParams?.ringType as RingType) || ("engagement" as RingType);

	const filter: Filter = {
		retailer: null,
		type: null,
		colour: null,
		clarity: null,
		metal: null,
	};

	const data = await getItems(filter, undefined, undefined, undefined, ringType);

	return (
		<main className="flex min-h-screen flex-col gap-4">
			<Items items={data} />
		</main>
	);
}
