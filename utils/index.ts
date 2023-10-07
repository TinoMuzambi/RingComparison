import { ReadonlyURLSearchParams } from "next/navigation";
import data from "@/data/rings.json";
import { Filter, SortField } from "@/interfaces";

export const BASE_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: "https://comparison-psi.vercel.app";

export const createUrl = (
	pathname: string,
	params: URLSearchParams | ReadonlyURLSearchParams
) => {
	const paramsString = params.toString();
	const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

	return `${pathname}${queryString}`;
};

const doFilter = (items: typeof data, filter: Filter): typeof data => {
	const { retailer, type, colour, clarity, metal } = filter;

	let filteredData = items;

	if (retailer)
		filteredData = filteredData.filter(
			(item) => item.retailer.toLowerCase().replaceAll(" ", "-") === retailer
		);
	if (type)
		filteredData = filteredData.filter(
			(item) => item.diamond.type.toLowerCase().replaceAll(" ", "-") === type
		);
	if (colour)
		filteredData = filteredData.filter(
			(item) =>
				item.diamond.colour.toLowerCase().replaceAll(" ", "-") === colour
		);
	if (clarity)
		filteredData = filteredData.filter(
			(item) =>
				item.diamond.clarity.toLowerCase().replaceAll(" ", "-") === clarity
		);
	if (metal)
		filteredData = filteredData.filter(
			(item) => item.metal.toLowerCase().replaceAll(" ", "-") === metal
		);

	return filteredData;
};

const doSort = (
	items: typeof data,
	sort: SortField,
	dir: "asc" | "desc"
): typeof data => {
	if (sort === "retailer")
		return dir === "asc"
			? items.sort((a, b) => a.retailer.localeCompare(b.retailer))
			: items.sort((a, b) => b.retailer.localeCompare(a.retailer));

	return items;
};

export const getItems = async (
	filter: Filter,
	query?: string,
	sort?: SortField,
	dir?: "asc" | "desc"
): Promise<typeof data> => {
	if (query?.length) {
		const lowerQuery = query?.toLowerCase();
		const qData = data.filter(
			(item) =>
				item.retailer.toLowerCase().includes(lowerQuery) ||
				item.metal.toLowerCase().includes(lowerQuery) ||
				item.warranty.toLowerCase().includes(lowerQuery) ||
				item.diamond.type.toLowerCase().includes(lowerQuery) ||
				item.diamond.clarity.toLowerCase().includes(lowerQuery) ||
				item.payment.terms.toLowerCase().includes(lowerQuery)
		);

		return doFilter(qData, filter);
	}

	if (sort && dir) {
		return doSort(doFilter(data, filter), sort, dir);
	}

	return doFilter(data, filter);
};

export const uniqueRetailers = [
	...new Set(data.map((item) => item.retailer)),
].map((item) => {
	return {
		label: item,
		value: item.toLowerCase().replaceAll(" ", "-"),
	};
});

export const uniqueDiamondTypes = [
	...new Set(data.map((item) => item.diamond.type)),
].map((item) => {
	return {
		label: item,
		value: item.toLowerCase().replaceAll(" ", "-"),
	};
});

export const uniqueDiamondColours = [
	...new Set(data.map((item) => item.diamond.colour)),
]
	.sort((a, b) => a.localeCompare(b))
	.map((item) => {
		return {
			label: item,
			value: item.toLowerCase().replaceAll(" ", "-"),
		};
	});

export const uniqueDiamondClarities = [
	...new Set(data.map((item) => item.diamond.clarity)),
].map((item) => {
	return {
		label: item,
		value: item.toLowerCase().replaceAll(" ", "-"),
	};
});

export const uniqueMetals = [...new Set(data.map((item) => item.metal))].map(
	(item) => {
		return {
			label: item,
			value: item.toLowerCase().replaceAll(" ", "-"),
		};
	}
);
