export type RingType = "engagement" | "wedding-band";

export type MediaType = "photo" | "video" | null;

export interface RingData {
	retailer: string;
	diamond: {
		carat_weight: number | null;
		shape: string;
		type: string;
		colour: string;
		clarity: string;
		file: { type: MediaType; name: string | null };
	};
	metal: string;
	engraving: boolean;
	warranty: string;
	price: number;
	certificate: string | null;
	box?: { type: MediaType; file: string | null };
	payment: { options: string[]; terms: string };
	manufacturing_timeframe: string;
	delivery_timeframe: string;
	link: string;
	reviews: {
		type: string;
		rating: number;
		num_reviews: number;
		link: string;
	};
}

export type RingDataArray = RingData[];

export interface ItemsInterface {
	items: RingDataArray;
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

export type SortDirection = "asc" | "desc";

export interface FilterOption {
	label: string;
	value: string;
}

export interface ExplorerState {
	ringType: RingType;
	query: string;
	filter: Filter;
	sort?: SortField;
	direction?: SortDirection;
}

export type RawSearchParams = Record<
	string,
	string | string[] | undefined
>;

export const sortFields: ReadonlyArray<{
	field: SortField;
	direction: SortDirection;
	label: string;
}> = [
	{
		field: "retailer",
		direction: "asc",
		label: "Retailer: A to Z",
	},
	{
		field: "retailer",
		direction: "desc",
		label: "Retailer: Z to A",
	},
	{
		field: "carat-weight",
		direction: "asc",
		label: "Carat weight: low to high",
	},
	{
		field: "carat-weight",
		direction: "desc",
		label: "Carat weight: high to low",
	},
	{
		field: "colour",
		direction: "asc",
		label: "Colour grade: highest to lowest",
	},
	{
		field: "colour",
		direction: "desc",
		label: "Colour grade: lowest to highest",
	},
	{
		field: "clarity",
		direction: "asc",
		label: "Clarity: highest to lowest",
	},
	{
		field: "clarity",
		direction: "desc",
		label: "Clarity: lowest to highest",
	},
	{
		field: "price",
		direction: "asc",
		label: "Price: low to high",
	},
	{
		field: "price",
		direction: "desc",
		label: "Price: high to low",
	},
	{
		field: "reviews",
		direction: "asc",
		label: "Rating: low to high",
	},
	{
		field: "reviews",
		direction: "desc",
		label: "Rating: high to low",
	},
];

export const giaClarityScale = [
	"FL",
	"IF",
	"VVS1",
	"VVS2",
	"VVS",
	"VS1",
	"VS2",
	"VS-SI",
	"SI1",
	"SI2",
	"I1",
	"I2",
	"I3",
] as const;

export const giaColourScale = [
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
] as const;
