import engagementRingsData from "../data/rings.json";
import weddingBandsData from "../data/wedding-bands.json";
import {
	ExplorerState,
	Filter,
	FilterField,
	FilterOption,
	giaClarityScale,
	giaColourScale,
	RawSearchParams,
	RingData,
	RingDataArray,
	RingType,
	SortDirection,
	SortField,
	sortFields,
} from "../interfaces";

const engagementRings = engagementRingsData as RingDataArray;
const weddingBands = weddingBandsData as RingDataArray;

const sortFieldSet = new Set<SortField>(
	sortFields.map(({ field }) => field),
);

const scalar = (value: string | string[] | undefined): string =>
	(Array.isArray(value) ? value[0] : value)?.trim() ?? "";

export const slugify = (value: string): string =>
	value
		.toLocaleLowerCase("en-ZA")
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");

export const getData = (ringType: RingType): RingDataArray =>
	ringType === "wedding-band" ? weddingBands : engagementRings;

const uniqueOptions = (
	items: RingDataArray,
	select: (item: RingData) => string,
	order?: readonly string[],
): FilterOption[] => {
	const labels = [...new Set(items.map(select))];
	labels.sort((a, b) => {
		if (order) {
			const aRank = order.indexOf(a);
			const bRank = order.indexOf(b);
			if (aRank !== -1 || bRank !== -1) {
				if (aRank === -1) return 1;
				if (bRank === -1) return -1;
				return aRank - bRank;
			}
		}
		return a.localeCompare(b, "en-ZA");
	});

	return labels.map((label) => ({ label, value: slugify(label) }));
};

export const getFilterOptions = (
	ringType: RingType,
): Record<FilterField, FilterOption[]> => {
	const data = getData(ringType);
	return {
		retailer: uniqueOptions(data, (item) => item.retailer),
		type: uniqueOptions(data, (item) => item.diamond.type),
		colour: uniqueOptions(data, (item) => item.diamond.colour, giaColourScale),
		clarity: uniqueOptions(
			data,
			(item) => item.diamond.clarity,
			giaClarityScale,
		),
		metal: uniqueOptions(data, (item) => item.metal),
	};
};

const allowedFilterValue = (
	value: string,
	options: FilterOption[],
): string | null => options.some((option) => option.value === value) ? value : null;

export const parseExplorerParams = (
	params: RawSearchParams = {},
): ExplorerState => {
	const ringType: RingType =
		scalar(params.ringType) === "wedding-band" ? "wedding-band" : "engagement";
	const options = getFilterOptions(ringType);
	const order = scalar(params.order).split(":");
	const sortValue = (order[0] || scalar(params.sort)) as SortField;
	const directionValue = (order[1] || scalar(params.dir)) as SortDirection;
	const hasValidSort =
		sortFieldSet.has(sortValue) &&
		(directionValue === "asc" || directionValue === "desc");

	return {
		ringType,
		query: scalar(params.q).slice(0, 80),
		filter: {
			retailer: allowedFilterValue(scalar(params.retailer), options.retailer),
			type: allowedFilterValue(scalar(params.type), options.type),
			colour: allowedFilterValue(scalar(params.colour), options.colour),
			clarity: allowedFilterValue(scalar(params.clarity), options.clarity),
			metal: allowedFilterValue(scalar(params.metal), options.metal),
		},
		...(hasValidSort
			? { sort: sortValue, direction: directionValue }
			: {}),
	};
};

const includesQuery = (item: RingData, query: string): boolean => {
	if (!query) return true;
	const searchable = [
		item.retailer,
		item.metal,
		item.warranty,
		item.diamond.shape,
		item.diamond.type,
		item.diamond.colour,
		item.diamond.clarity,
		item.certificate ?? "",
		item.payment.options.join(" "),
		item.payment.terms,
		item.manufacturing_timeframe,
		item.delivery_timeframe,
	]
		.join(" ")
		.toLocaleLowerCase("en-ZA");
	return searchable.includes(query.toLocaleLowerCase("en-ZA"));
};

const matchesFilter = (item: RingData, filter: Filter): boolean =>
	(!filter.retailer || slugify(item.retailer) === filter.retailer) &&
	(!filter.type || slugify(item.diamond.type) === filter.type) &&
	(!filter.colour || slugify(item.diamond.colour) === filter.colour) &&
	(!filter.clarity || slugify(item.diamond.clarity) === filter.clarity) &&
	(!filter.metal || slugify(item.metal) === filter.metal);

const compareRank = (
	a: string,
	b: string,
	order: readonly string[],
	direction: SortDirection,
): number => {
	const aRank = order.indexOf(a);
	const bRank = order.indexOf(b);
	if (aRank === -1 && bRank === -1) return a.localeCompare(b, "en-ZA");
	if (aRank === -1) return 1;
	if (bRank === -1) return -1;
	return direction === "asc" ? aRank - bRank : bRank - aRank;
};

const compareItems = (
	a: RingData,
	b: RingData,
	sort: SortField,
	direction: SortDirection,
): number => {
	const multiplier = direction === "asc" ? 1 : -1;
	switch (sort) {
		case "retailer":
			return multiplier * a.retailer.localeCompare(b.retailer, "en-ZA");
		case "carat-weight": {
			const aWeight = a.diamond.carat_weight;
			const bWeight = b.diamond.carat_weight;
			if (aWeight === null && bWeight === null) return 0;
			if (aWeight === null) return 1;
			if (bWeight === null) return -1;
			return multiplier * (aWeight - bWeight);
		}
		case "colour":
			return compareRank(
				a.diamond.colour,
				b.diamond.colour,
				giaColourScale,
				direction,
			);
		case "clarity":
			return compareRank(
				a.diamond.clarity,
				b.diamond.clarity,
				giaClarityScale,
				direction,
			);
		case "price":
			return multiplier * (a.price - b.price);
		case "reviews": {
			const ratingDifference = multiplier * (a.reviews.rating - b.reviews.rating);
			return ratingDifference || multiplier * (a.reviews.num_reviews - b.reviews.num_reviews);
		}
	}
};

export const getItems = (state: ExplorerState): RingDataArray => {
	const filtered = getData(state.ringType).filter(
		(item) =>
			includesQuery(item, state.query) && matchesFilter(item, state.filter),
	);
	return state.sort && state.direction
		? [...filtered].sort((a, b) =>
				compareItems(a, b, state.sort as SortField, state.direction as SortDirection),
			)
		: filtered;
};

export const formatCurrency = (price: number): string =>
	new Intl.NumberFormat("en-ZA", {
		style: "currency",
		currency: "ZAR",
		maximumFractionDigits: 0,
	}).format(price);

export const hasActiveFilters = (state: ExplorerState): boolean =>
	Boolean(
		state.query ||
			state.sort ||
			Object.values(state.filter).some(Boolean),
	);
