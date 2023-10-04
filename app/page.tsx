"use client";

import data from "@/data/rings.json";
import Items from "@/components/items";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col gap-4">
			<Items items={data} />
		</main>
	);
}
