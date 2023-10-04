import Items from "@/components/items";
import { getItems } from "@/utils";

export default async function Home() {
	const data = await getItems();
	return (
		<main className="flex min-h-screen flex-col gap-4">
			<Items items={data} />
		</main>
	);
}
