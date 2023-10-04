import { ReadonlyURLSearchParams } from "next/navigation";
import data from "@/data/rings.json";

export const BASE_URL =
	process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

export const createUrl = (
	pathname: string,
	params: URLSearchParams | ReadonlyURLSearchParams
) => {
	const paramsString = params.toString();
	const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

	return `${pathname}${queryString}`;
};

export const getItems = async () => {
	return data;
};
