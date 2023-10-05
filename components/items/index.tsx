import Image from "next/image";

import { ItemsInterface } from "@/interfaces";

const Items: React.FC<ItemsInterface> = ({ items }) => {
	return (
		<table>
			<thead className="font-bold border-b pb-2">
				<tr>
					<th>Retailer</th>
					<th>Diamond Carat Weight</th>
					<th>Diamond Type</th>
					<th>Diamond Colour</th>
					<th>Diamond Clarity</th>
					<th>Diamond</th>
					<th>Metal</th>
					<th>Engraving Included</th>
					<th>Price</th>
					<th>Warranty</th>
					<th>Certificate Number</th>
					<th>Box</th>
					<th>Payment Options</th>
					<th>Payment Terms</th>
					<th>Manufacturing Timeframe</th>
					<th>Delivery Timeframe</th>
					<th>Link</th>
					<th>Reviews</th>
				</tr>
			</thead>
			<tbody>
				{items.map((item, key) => (
					<tr className="border-b py-2 last:border-none" key={key}>
						<td>{item.retailer}</td>
						<td>{item.diamond.carat_weight}ct</td>
						<td>{item.diamond.type}</td>
						<td>{item.diamond.colour}</td>
						<td>{item.diamond.clarity}</td>
						<td>
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
						</td>
						<td>{item.metal}</td>
						<td>{item.engraving ? "Yes" : "No"}</td>
						<td>
							{Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "ZAR",
								maximumFractionDigits: 0,
								currencyDisplay: "narrowSymbol",
							}).format(item.price)}
						</td>
						<td>{item.warranty}</td>
						<td>{item?.certificate}</td>
						<td>
							{item.box?.type === "photo" ? (
								<Image
									src={`/media/${item.box?.file}`}
									width={200}
									height={200}
									// className="w-40 h-40 object-contain"
									alt={item.retailer}
								/>
							) : item.box?.type === "video" ? (
								<video src={`/media/${item.box?.file}`} controls />
							) : null}
						</td>
						<td>{item.payment.options.join(", ")}</td>
						<td>{item.payment.terms}</td>
						<td>{item.manufacturing_timeframe}</td>
						<td>{item.delivery_timeframe}</td>
						<td>
							<a href={item.link} target="_blank">
								{item.link}
							</a>
						</td>
						<td>
							<a
								href={item.reviews.link}
								target="_blank"
							>{`${item.reviews.num_reviews} ${item.reviews.type} reviews: ${item.reviews.rating}`}</a>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Items;
