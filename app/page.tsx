"use client";

import Image from "next/image";

import data from "./data/rings.json";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col gap-4">
			<div
				className="grid font-bold border-b pb-2"
				style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}
			>
				<p>Retailer</p>
				<p>Diamond Carat Weight</p>
				<p>Diamond Type</p>
				<p>Diamond Colour</p>
				<p>Diamond Clarity</p>
				<p>Diamond</p>
				<p>Metal</p>
				<p>Engraving Included</p>
				<p>Price</p>
				<p>Warranty</p>
				<p>Certificate Number</p>
				<p>Box</p>
				<p>Payment Options</p>
				<p>Payment Terms</p>
				<p>Manufacturing Timeframe</p>
				<p>Delivery Timeframe</p>
				<p>Link</p>
				<p>Reviews</p>
			</div>
			{data.map((item, key) => (
				<div
					className="grid gap-1 border-b py-2 last:border-none"
					style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}
					key={key}
				>
					<p>{item.retailer}</p>
					<p>{item.diamond.carat_weight}ct</p>
					<p>{item.diamond.type}</p>
					<p>{item.diamond.colour}</p>
					<p>{item.diamond.clarity}</p>
					<div>
						{item.diamond.file?.type === "photo" ? (
							<Image
								src={`/media/${item.diamond.file?.name}`}
								width={200}
								height={200}
								alt={item.retailer}
							/>
						) : item.diamond.file?.type === "video" ? (
							<video src={`/media/${item.diamond.file?.name}`} controls />
						) : null}
					</div>
					<p>{item.metal}</p>
					<p>{item.engraving ? "Yes" : "No"}</p>
					<p>
						{Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "ZAR",
							maximumFractionDigits: 0,
							currencyDisplay: "narrowSymbol",
						}).format(item.price)}
					</p>
					<p>{item.warranty}</p>
					<p>{item?.certificate}</p>
					<div>
						{item.box?.type === "photo" ? (
							<Image
								src={`/media/${item.box?.file}`}
								width={200}
								height={200}
								alt={item.retailer}
							/>
						) : item.box?.type === "video" ? (
							<video src={`/media/${item.box?.file}`} controls />
						) : null}
					</div>
					<p>{item.payment.options.join(", ")}</p>
					<p>{item.payment.terms}</p>
					<p>{item.manufacturing_timeframe}</p>
					<p>{item.delivery_timeframe}</p>
					<a href={item.link} target="_blank" className="break-words">
						{item.link}
					</a>
					<a
						href={item.reviews.link}
						target="_blank"
						className="break-words"
					>{`${item.reviews.num_reviews} ${item.reviews.type} reviews: ${item.reviews.rating}`}</a>
				</div>
			))}
		</main>
	);
}
