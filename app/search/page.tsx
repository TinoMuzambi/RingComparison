import Items from "@/components/items";
import { getItems } from "@/utils";

export default async function SearchPage({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const { sort, q: searchValue } = searchParams as { [key: string]: string };

	const items = await getItems();

	return <Items items={items} />;
}
