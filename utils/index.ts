import { ReadonlyURLSearchParams } from "next/navigation";
import data from "@/data/rings.json";

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

export const getItems = async (query?: string) => {
	if (query?.length) {
		const lowerQuery = query?.toLowerCase();
		return data.filter(
			(item) =>
				item.retailer.toLowerCase().includes(lowerQuery) ||
				item.metal.toLowerCase().includes(lowerQuery) ||
				item.warranty.toLowerCase().includes(lowerQuery) ||
				item.diamond.type.toLowerCase().includes(lowerQuery) ||
				item.diamond.clarity.toLowerCase().includes(lowerQuery) ||
				item.payment.terms.toLowerCase().includes(lowerQuery)
		);
	}
	return data;
};
