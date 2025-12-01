import { ReadonlyURLSearchParams } from "next/navigation";
import engagementRingsData from "@/data/rings.json";
import weddingBandsData from "@/data/wedding-bands.json";
import { Filter, SortField, giaClarityScale } from "@/interfaces";

export type RingType = "engagement" | "wedding-band";

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

const getData = (ringType: RingType = "engagement") => {
	return ringType === "engagement" ? engagementRingsData : weddingBandsData;
};

const doFilter = (
	items: typeof engagementRingsData,
	filter: Filter
): typeof engagementRingsData => {
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
	items: typeof engagementRingsData,
	sort: SortField,
	dir: "asc" | "desc"
): typeof engagementRingsData => {
	if (sort === "retailer")
		return items.sort((a, b) =>
			dir === "asc"
				? a.retailer.localeCompare(b.retailer)
				: b.retailer.localeCompare(a.retailer)
		);
	else if (sort === "carat-weight")
		return items.sort((a, b) => {
			const aWeight = a.diamond.carat_weight;
			const bWeight = b.diamond.carat_weight;
			
			// Handle null values: nulls go to the end when ascending, beginning when descending
			if (aWeight === null && bWeight === null) return 0;
			if (aWeight === null) return dir === "asc" ? 1 : -1;
			if (bWeight === null) return dir === "asc" ? -1 : 1;
			
			return dir === "asc" ? aWeight - bWeight : bWeight - aWeight;
		});
	else if (sort === "colour")
		return items.sort((a, b) =>
			dir === "asc"
				? b.diamond.colour.localeCompare(a.diamond.colour)
				: a.diamond.colour.localeCompare(b.diamond.colour)
		);
	else if (sort === "clarity")
		return items.sort((a, b) =>
			dir === "asc"
				? giaClarityScale.indexOf(b.diamond.clarity) -
				  giaClarityScale.indexOf(a.diamond.clarity)
				: giaClarityScale.indexOf(a.diamond.clarity) -
				  giaClarityScale.indexOf(b.diamond.clarity)
		);
	else if (sort === "price")
		return items.sort((a, b) =>
			dir === "asc" ? a.price - b.price : b.price - a.price
		);
	else if (sort === "reviews")
		return items.sort((a, b) =>
			dir === "asc"
				? a.reviews.rating * a.reviews.num_reviews -
				  b.reviews.rating * b.reviews.num_reviews
				: b.reviews.rating * b.reviews.num_reviews -
				  a.reviews.rating * a.reviews.num_reviews
		);

	return items;
};

export const getItems = async (
	filter: Filter,
	query?: string,
	sort?: SortField,
	dir?: "asc" | "desc",
	ringType: RingType = "engagement"
): Promise<typeof engagementRingsData> => {
	const data = getData(ringType);

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

		if (sort && dir) {
			return doSort(doFilter(qData, filter), sort, dir);
		}

		return doFilter(qData, filter);
	}

	if (sort && dir) {
		return doSort(doFilter(data, filter), sort, dir);
	}

	return doFilter(data, filter);
};

export const getUniqueRetailers = (ringType: RingType = "engagement") => {
	const data = getData(ringType);
	return [...new Set(data.map((item) => item.retailer))].map((item) => {
		return {
			label: item,
			value: item.toLowerCase().replaceAll(" ", "-"),
		};
	});
};

export const getUniqueDiamondTypes = (ringType: RingType = "engagement") => {
	const data = getData(ringType);
	return [...new Set(data.map((item) => item.diamond.type))].map((item) => {
		return {
			label: item,
			value: item.toLowerCase().replaceAll(" ", "-"),
		};
	});
};

export const getUniqueDiamondColours = (ringType: RingType = "engagement") => {
	const data = getData(ringType);
	return [...new Set(data.map((item) => item.diamond.colour))]
		.sort((a, b) => a.localeCompare(b))
		.map((item) => {
			return {
				label: item,
				value: item.toLowerCase().replaceAll(" ", "-"),
			};
		});
};

export const getUniqueDiamondClarities = (
	ringType: RingType = "engagement"
) => {
	const data = getData(ringType);
	return [...new Set(data.map((item) => item.diamond.clarity))].map(
		(item) => {
			return {
				label: item,
				value: item.toLowerCase().replaceAll(" ", "-"),
			};
		}
	);
};

export const getUniqueMetals = (ringType: RingType = "engagement") => {
	const data = getData(ringType);
	return [...new Set(data.map((item) => item.metal))].map((item) => {
		return {
			label: item,
			value: item.toLowerCase().replaceAll(" ", "-"),
		};
	});
};

// Legacy exports for backward compatibility (default to engagement rings)
export const uniqueRetailers = getUniqueRetailers("engagement");
export const uniqueDiamondTypes = getUniqueDiamondTypes("engagement");
export const uniqueDiamondColours = getUniqueDiamondColours("engagement");
export const uniqueDiamondClarities = getUniqueDiamondClarities("engagement");
export const uniqueMetals = getUniqueMetals("engagement");
