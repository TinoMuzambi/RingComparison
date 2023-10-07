"use client";
import { useRouter, useSearchParams } from "next/navigation";

import { FilterField, SortField, sortFields } from "@/interfaces";
import {
	createUrl,
	uniqueDiamondClarities,
	uniqueDiamondColours,
	uniqueDiamondTypes,
	uniqueMetals,
	uniqueRetailers,
} from "@/utils";

export default function Search() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const val = e.target as HTMLFormElement;
		const search = val.search as HTMLInputElement;
		const newParams = new URLSearchParams(searchParams.toString());

		if (search.value) {
			newParams.set("q", search.value);
		} else {
			newParams.delete("q");
		}

		router.push(createUrl("/search", newParams));
	};

	const filter = (field: FilterField, value: string) => {
		const newParams = new URLSearchParams(searchParams.toString());

		if (field === "retailer") {
			if (value !== "select") {
				newParams.set("retailer", value);
			} else {
				newParams.delete("retailer");
			}
		} else if (field === "type") {
			if (value !== "select") {
				newParams.set("type", value);
			} else {
				newParams.delete("type");
			}
		} else if (field === "colour") {
			if (value !== "select") {
				newParams.set("colour", value);
			} else {
				newParams.delete("colour");
			}
		} else if (field === "clarity") {
			if (value !== "select") {
				newParams.set("clarity", value);
			} else {
				newParams.delete("clarity");
			}
		} else if (field === "metal") {
			if (value !== "select") {
				newParams.set("metal", value);
			} else {
				newParams.delete("metal");
			}
		}

		router.push(createUrl("/search", newParams));
	};

	const sort = (field: SortField | "select", direction: "asc" | "desc") => {
		const newParams = new URLSearchParams(searchParams.toString());

		if (field !== "select") {
			newParams.set("sort", field);
			newParams.set("dir", direction);
		} else {
			newParams.delete("sort");
			newParams.delete("dir");
		}

		router.push(createUrl("/search", newParams));
	};

	return (
		<>
			<form className="grid py-4" onSubmit={onSubmit}>
				<input
					className="justify-self-end px-2 py-1 rounded outline-none hover:scale-95 focus:scale-95 transition text-black"
					type="search"
					id="search"
					placeholder="Search..."
					defaultValue={searchParams?.get("q") || ""}
				/>
			</form>
			<div className="flex gap-4 overflow-x-auto">
				<select
					name="retailers"
					id="retailers"
					className="px-2 py-1 rounded outline-none hover:scale-95 focus:scale-95 transition text-black"
					onChange={(e) => filter("retailer", e.target.value)}
					defaultValue={searchParams?.get("retailer") || "select"}
				>
					<option value="select">Select retailer</option>
					{uniqueRetailers.map((item, key) => (
						<option value={item.value} key={key}>
							{item.label}
						</option>
					))}
				</select>

				<select
					name="diamond-type"
					id="diamond-type"
					className="px-2 py-1 rounded outline-none hover:scale-95 focus:scale-95 transition text-black"
					onChange={(e) => filter("type", e.target.value)}
					defaultValue={searchParams?.get("type") || "select"}
				>
					<option value="select">Select diamond type</option>
					{uniqueDiamondTypes.map((item, key) => (
						<option value={item.value} key={key}>
							{item.label}
						</option>
					))}
				</select>

				<select
					name="diamond-colour"
					id="diamond-colour"
					className="px-2 py-1 rounded outline-none hover:scale-95 focus:scale-95 transition text-black"
					onChange={(e) => filter("colour", e.target.value)}
					defaultValue={searchParams?.get("colour") || "select"}
				>
					<option value="select">Select diamond colour</option>
					{uniqueDiamondColours.map((item, key) => (
						<option value={item.value} key={key}>
							{item.label}
						</option>
					))}
				</select>

				<select
					name="diamond-clarity"
					id="diamond-clarity"
					className="px-2 py-1 rounded outline-none hover:scale-95 focus:scale-95 transition text-black"
					onChange={(e) => filter("clarity", e.target.value)}
					defaultValue={searchParams?.get("clarity") || "select"}
				>
					<option value="select">Select diamond clarity</option>
					{uniqueDiamondClarities.map((item, key) => (
						<option value={item.value} key={key}>
							{item.label}
						</option>
					))}
				</select>

				<select
					name="metal"
					id="metal"
					className="px-2 py-1 rounded outline-none hover:scale-95 focus:scale-95 transition text-black"
					onChange={(e) => filter("metal", e.target.value)}
					defaultValue={searchParams?.get("metal") || "select"}
				>
					<option value="select">Select metal</option>
					{uniqueMetals.map((item, key) => (
						<option value={item.value} key={key}>
							{item.label}
						</option>
					))}
				</select>
			</div>
			<div>
				<select
					name="sort"
					id="sort"
					className="px-2 py-1 rounded outline-none hover:scale-95 focus:scale-95 transition text-black my-2"
					defaultValue={
						`${searchParams?.get("sort")}:${searchParams?.get("dir")}` ||
						"select"
					}
					onChange={(e) => {
						const value = e.target.value.split(":");

						sort(value[0] as SortField, value[1] as "asc" | "desc");
					}}
				>
					<option value="select">Order by</option>
					{sortFields.map((field, key) => (
						<option key={key} value={`${field.field}:${field.direction}`}>
							{field.label}
						</option>
					))}
				</select>
			</div>
		</>
	);
}
