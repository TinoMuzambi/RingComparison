import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { getData, getItems, parseExplorerParams, slugify } from "./index";

const emptyFilter = {
	retailer: null,
	type: null,
	colour: null,
	clarity: null,
	metal: null,
};

describe("parseExplorerParams", () => {
	it("normalises unknown and repeated query parameters", () => {
		const state = parseExplorerParams({
			ringType: "not-a-type",
			q: [" platinum ", "ignored"],
			retailer: "not-a-retailer",
			sort: "not-a-sort",
			dir: "sideways",
		});

		expect(state).toMatchObject({
			ringType: "engagement",
			query: "platinum",
			filter: { retailer: null },
		});
		expect(state.sort).toBeUndefined();
	});

	it("only accepts filter values available for the selected collection", () => {
		const state = parseExplorerParams({
			ringType: "wedding-band",
			retailer: "cape-diamonds",
			clarity: "vs-si",
		});

		expect(state.filter.retailer).toBe("cape-diamonds");
		expect(state.filter.clarity).toBe("vs-si");
	});
});

describe("getItems", () => {
	it("searches quote details and combines valid filters", () => {
		const state = parseExplorerParams({
			q: "payment plan",
			retailer: "shiny-rock-polished",
			metal: "platinum",
		});
		const items = getItems(state);

		expect(items.length).toBeGreaterThan(0);
		expect(items.every((item) => item.retailer === "Shiny Rock Polished")).toBe(true);
		expect(items.every((item) => item.metal === "Platinum")).toBe(true);
	});

	it("orders colour and clarity from the highest grade without mutating source data", () => {
		const before = getData("engagement").map((item) => item.price);
		const colours = getItems({
			ringType: "engagement",
			query: "",
			filter: emptyFilter,
			sort: "colour",
			direction: "asc",
		});
		const clarity = getItems({
			ringType: "engagement",
			query: "",
			filter: emptyFilter,
			sort: "clarity",
			direction: "asc",
		});

		expect(colours[0].diamond.colour).toBe("D");
		expect(clarity[0].diamond.clarity).toBe("VVS2");
		expect(getData("engagement").map((item) => item.price)).toEqual(before);
	});

	it("sorts ratings by rating first and review count second", () => {
		const items = getItems({
			ringType: "engagement",
			query: "",
			filter: emptyFilter,
			sort: "reviews",
			direction: "desc",
		});

		expect(items[0].reviews.rating).toBe(5);
		expect(items[0].reviews.num_reviews).toBeGreaterThanOrEqual(
			items[1].reviews.num_reviews,
		);
	});

	it("keeps missing carat weights at the end in either direction", () => {
		for (const direction of ["asc", "desc"] as const) {
			const items = getItems({
				ringType: "wedding-band",
				query: "",
				filter: emptyFilter,
				sort: "carat-weight",
				direction,
			});
			expect(items.at(-1)?.diamond.carat_weight).toBeNull();
		}
	});
});

describe("dataset integrity", () => {
	it("only references media files that exist in public/media", () => {
		for (const ringType of ["engagement", "wedding-band"] as const) {
			for (const item of getData(ringType)) {
				const files = [item.diamond.file.name, item.box?.file].filter(Boolean);
				for (const file of files) {
					expect(
					existsSync(join(process.cwd(), "public", "media", file as string)),
				).toBe(true);
				}
			}
		}
	});

	it("contains well-formed secure retailer and review URLs", () => {
		for (const ringType of ["engagement", "wedding-band"] as const) {
			for (const item of getData(ringType)) {
				expect(new URL(item.link).protocol).toBe("https:");
				expect(new URL(item.reviews.link).protocol).toBe("https:");
			}
		}
	});
});

describe("slugify", () => {
	it("creates stable URL-safe filter values", () => {
		expect(slugify("18ct White Gold")).toBe("18ct-white-gold");
	});
});
