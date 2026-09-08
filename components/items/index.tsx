import Image from "next/image";

import { ItemsInterface, MediaType, RingData } from "@/interfaces";
import { formatCurrency, slugify } from "@/utils";

interface MediaItem {
	file: string;
	type: Exclude<MediaType, null>;
	label: "Diamond" | "Presentation box";
}

const getMedia = (item: RingData): MediaItem[] => {
	const media: MediaItem[] = [];
	if (item.diamond.file.type && item.diamond.file.name) {
		media.push({
			file: item.diamond.file.name,
			type: item.diamond.file.type,
			label: "Diamond",
		});
	}
	if (item.box?.type && item.box.file) {
		media.push({
			file: item.box.file,
			type: item.box.type,
			label: "Presentation box",
		});
	}
	return media;
};

const ProductMedia = ({ item }: { item: RingData }) => {
	const media = getMedia(item);
	if (!media.length) {
		return (
			<div className="media-empty">
				<span aria-hidden="true">◇</span>
				No source media
			</div>
		);
	}

	return (
		<div className="media-strip">
			{media.map((asset) => (
				<figure key={`${asset.label}-${asset.file}`}>
					<div className="media-frame">
						{asset.type === "photo" ? (
							<Image
								src={`/media/${asset.file}`}
								fill
								sizes="(max-width: 760px) 44vw, 180px"
								alt={`${item.retailer} ${asset.label.toLocaleLowerCase("en-ZA")} reference`}
							/>
						) : (
							<video
								controls
								playsInline
								preload="none"
								aria-label={`${item.retailer} ${asset.label.toLocaleLowerCase("en-ZA")} reference video`}
							>
								<source src={`/media/${asset.file}`} type="video/mp4" />
								Your browser does not support embedded video.
							</video>
						)}
					</div>
					<figcaption>{asset.label}</figcaption>
				</figure>
			))}
		</div>
	);
};

const Fact = ({ label, value }: { label: string; value: string }) => (
	<div className="fact">
		<dt>{label}</dt>
		<dd>{value || "Not provided"}</dd>
	</div>
);

const Item = ({ item, index }: { item: RingData; index: number }) => {
	const itemId = `${slugify(item.retailer)}-${slugify(item.metal)}-${item.price}-${index}`;
	const carat =
		item.diamond.carat_weight === null
			? "Not specified"
			: `${item.diamond.carat_weight} ct`;

	return (
		<li>
			<article className="quote-card" aria-labelledby={`${itemId}-title`}>
				<div className="quote-head">
					<div>
						<p className="quote-number">Quote {String(index + 1).padStart(2, "0")}</p>
						<h3 id={`${itemId}-title`}>{item.retailer}</h3>
						<p className="quote-subtitle">
							{item.diamond.type} {item.diamond.shape} diamond in {item.metal}
						</p>
					</div>
					<div className="price-block">
						<span>Quoted price</span>
						<strong>{formatCurrency(item.price)}</strong>
					</div>
				</div>

				<div className="quote-body">
					<ProductMedia item={item} />
					<div className="quote-facts">
						<dl className="facts-grid">
							<Fact label="Carat weight" value={carat} />
							<Fact label="Colour" value={item.diamond.colour} />
							<Fact label="Clarity" value={item.diamond.clarity} />
							<Fact label="Metal" value={item.metal} />
							<Fact
								label="Manufacturing"
								value={item.manufacturing_timeframe}
							/>
							<Fact label="Delivery" value={item.delivery_timeframe} />
						</dl>

						<div className="quote-actions">
							<a href={item.link} target="_blank" rel="noreferrer">
								Visit retailer
							</a>
							<a href={item.reviews.link} target="_blank" rel="noreferrer">
								{item.reviews.rating.toFixed(1)} / 5 from{" "}
								{item.reviews.num_reviews} {item.reviews.type} reviews
							</a>
						</div>
					</div>
				</div>

				<details>
					<summary>Warranty, payment and quote details</summary>
					<div className="detail-grid">
						<div>
							<h4>Warranty</h4>
							<p>{item.warranty || "Not provided"}</p>
						</div>
						<div>
							<h4>Payment options</h4>
							<p>{item.payment.options.join(", ") || "Not provided"}</p>
						</div>
						<div>
							<h4>Payment terms</h4>
							<p>{item.payment.terms || "Not provided"}</p>
						</div>
						<div>
							<h4>Engraving included</h4>
							<p>{item.engraving ? "Yes" : "No"}</p>
						</div>
						<div>
							<h4>Certificate number</h4>
							<p>{item.certificate || "Not provided"}</p>
						</div>
					</div>
				</details>
			</article>
		</li>
	);
};

export default function Items({ items }: ItemsInterface) {
	if (!items.length) {
		return (
			<div className="empty-state">
				<h2>No quotes match those filters</h2>
				<p>Clear one or more filters, or try a broader search phrase.</p>
			</div>
		);
	}

	return (
		<ol className="quote-list">
			{items.map((item, index) => (
				<Item item={item} index={index} key={`${item.retailer}-${item.metal}-${item.price}-${index}`} />
			))}
		</ol>
	);
}
