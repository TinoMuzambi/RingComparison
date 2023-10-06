import Image from "next/image";

import { ItemsInterface } from "@/interfaces";

const Items: React.FC<ItemsInterface> = ({ items }) => {
	return (
		<div className="overflow-x-auto pr-16 py-2">
			<table className="w-[300vw] border-collapse border-spacing-8 text-center">
				<thead className="font-bold border-b pb-2">
					<tr>
						<th className="p-2">Retailer</th>
						<th className="p-2">Diamond Carat Weight</th>
						<th className="p-2">Diamond Type</th>
						<th className="p-2">Diamond Colour</th>
						<th className="p-2">Diamond Clarity</th>
						<th className="p-2">Metal</th>
						<th className="p-2">Price</th>
						<th className="p-2">Diamond</th>
						<th className="p-2">Engraving Included</th>
						<th className="p-2 max-w-xs">Warranty</th>
						<th className="p-2">Certificate Number</th>
						<th className="p-2">Box</th>
						<th className="p-2 max-w-xs">Payment Options</th>
						<th className="p-2 max-w-xs">Payment Terms</th>
						<th className="p-2">Manufacturing Timeframe</th>
						<th className="p-2">Delivery Timeframe</th>
						<th className="p-2">Link</th>
						<th className="p-2">Reviews</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, key) => (
						<tr className="border-b py-2 last:border-none" key={key}>
							<td className="p-2">{item.retailer}</td>
							<td className="p-2">{item.diamond.carat_weight}ct</td>
							<td className="p-2">{item.diamond.type}</td>
							<td className="p-2">{item.diamond.colour}</td>
							<td className="p-2">{item.diamond.clarity}</td>
							<td className="p-2">{item.metal}</td>
							<td className="p-2">
								{Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "ZAR",
									maximumFractionDigits: 0,
									currencyDisplay: "narrowSymbol",
								}).format(item.price)}
							</td>
							<td className="p-2">
								{item.diamond.file?.type === "photo" ? (
									<Image
										src={`/media/${item.diamond.file?.name}`}
										width={200}
										height={200}
										alt={item.retailer}
									/>
								) : item.diamond.file?.type === "video" ? (
									<video
										width={200}
										src={`/media/${item.diamond.file?.name}`}
										controls
									/>
								) : null}
							</td>
							<td className="p-2">{item.engraving ? "Yes" : "No"}</td>
							<td className="p-2 max-w-xs">{item.warranty}</td>
							<td className="p-2">{item?.certificate}</td>
							<td className="p-2">
								{item.box?.type === "photo" ? (
									<Image
										src={`/media/${item.box?.file}`}
										width={200}
										height={200}
										className="hover:scale-[2] transition"
										alt={item.retailer}
									/>
								) : item.box?.type === "video" ? (
									<video
										width={200}
										src={`/media/${item.box?.file}`}
										controls
									/>
								) : null}
							</td>
							<td className="p-2 max-w-xs">
								{item.payment.options.join(", ")}
							</td>
							<td className="p-2 max-w-xs">{item.payment.terms}</td>
							<td className="p-2">{item.manufacturing_timeframe}</td>
							<td className="p-2">{item.delivery_timeframe}</td>
							<td className="p-2">
								<a href={item.link} target="_blank">
									{item.link}
								</a>
							</td>
							<td className="p-2">
								<a
									href={item.reviews.link}
									target="_blank"
								>{`${item.reviews.num_reviews} ${item.reviews.type} reviews of ${item.reviews.rating} stars`}</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Items;
