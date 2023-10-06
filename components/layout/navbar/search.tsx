"use client";

import {
	createUrl,
	uniqueDiamondClarities,
	uniqueDiamondColours,
	uniqueDiamondTypes,
	uniqueMetals,
	uniqueRetailers,
} from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
	const router = useRouter();
	const searchParams = useSearchParams();

	console.log(uniqueRetailers);

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

	const filter = (
		field: "retailer" | "type" | "colour" | "clarity" | "metal",
		value: string
	) => {
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
			<div className="flex gap-4">
				<select
					name="retailers"
					id="retailers"
					className="px-2 py-1 rounded outline-none hover:scale-95 focus:scale-95 transition text-black"
					onChange={(e) => filter("retailer", e.target.value)}
					defaultValue={searchParams?.get("retailer") || ""}
				>
					<option value="select" selected>
						Select retailer
					</option>
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
				>
					<option value="select" selected>
						Select diamond type
					</option>
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
				>
					<option value="select" selected>
						Select diamond colour
					</option>
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
				>
					<option value="select" selected>
						Select diamond clarity
					</option>
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
				>
					<option value="select" selected>
						Select metal
					</option>
					{uniqueMetals.map((item, key) => (
						<option value={item.value} key={key}>
							{item.label}
						</option>
					))}
				</select>
			</div>
		</>
	);
}
