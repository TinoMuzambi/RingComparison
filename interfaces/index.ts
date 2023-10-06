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
