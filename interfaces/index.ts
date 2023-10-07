import data from "@/data/rings.json";

export interface ItemsInterface {
	items: typeof data;
}

export type Filter = {
	retailer: string | null;
	type: string | null;
	colour: string | null;
	clarity: string | null;
	metal: string | null;
};

export type FilterField = "retailer" | "type" | "colour" | "clarity" | "metal";

export type SortField =
	| "retailer"
	| "carat-weight"
	| "colour"
	| "clarity"
	| "price"
	| "reviews";

export const sortFields = [
	{
		field: "retailer",
		direction: "asc",
		label: "Retailer - Ascending",
	},
	{
		field: "retailer",
		direction: "desc",
		label: "Retailer - Descending",
	},
	{
		field: "carat-weight",
		direction: "asc",
		label: "Carat Weight - Low to high",
	},
	{
		field: "carat-weight",
		direction: "desc",
		label: "Carat Weight - High to low",
	},
	{
		field: "colour",
		direction: "asc",
		label: "Colour - Worst to best",
	},
	{
		field: "colour",
		direction: "desc",
		label: "Colour - Best to worst",
	},
	{
		field: "clarity",
		direction: "asc",
		label: "Clarity - Worst to best",
	},
	{
		field: "clarity",
		direction: "desc",
		label: "Clarity - Best to worst",
	},
	{
		field: "price",
		direction: "asc",
		label: "Price - Low to high",
	},
	{
		field: "price",
		direction: "desc",
		label: "Price - High to low",
	},
	{
		field: "reviews",
		direction: "asc",
		label: "Reviews - Low to high",
	},
	{
		field: "reviews",
		direction: "desc",
		label: "Reviews - High to low",
	},
];

export const giaClarityScale = [
	"FL",
	"IF",
	"VVS1",
	"VVS2",
	"VS1",
	"VS2",
	"SI1",
	"SI2",
	"I1",
	"I2",
	"I3",
];
