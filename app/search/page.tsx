import { redirect } from "next/navigation";

import { RawSearchParams } from "@/interfaces";

const allowedKeys = new Set([
	"ringType",
	"q",
	"retailer",
	"type",
	"colour",
	"clarity",
	"metal",
	"order",
	"sort",
	"dir",
]);

export default async function LegacySearchPage({
	searchParams,
}: {
	searchParams: Promise<RawSearchParams>;
}) {
	const current = await searchParams;
	const query = new URLSearchParams();
	for (const [key, value] of Object.entries(current)) {
		if (!allowedKeys.has(key)) continue;
		const scalar = Array.isArray(value) ? value[0] : value;
		if (scalar) query.set(key, scalar);
	}
	redirect(query.size ? `/?${query.toString()}` : "/");
}
