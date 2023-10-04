"use client";

import { createUrl } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
	const router = useRouter();
	const searchParams = useSearchParams();

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const val = e.target as HTMLFormElement;
		const search = val.search as HTMLInputElement;
		const newParams = new URLSearchParams(searchParams.toString());

		if (search.value) {
			newParams.set("q", search.value);
		} else {
			newParams.delete("q");
		}

		router.push(createUrl("/", newParams));
	}

	return (
		<form className="grid py-4" onSubmit={onSubmit}>
			<input
				className="justify-self-end px-2 py-1 rounded outline-none hover:scale-95 focus:scale-95 transition text-black"
				type="search"
				id="search"
				placeholder="Search..."
				defaultValue={searchParams?.get("q") || ""}
			/>
		</form>
	);
}
