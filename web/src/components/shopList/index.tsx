import { Typography } from "@material-ui/core";
import React from "react";
import { IShopList } from "../../models/shopModels";
import { ShopItemCard } from "../shopItemCard";

export default function ShopList({ category, array }: IShopList) {
	return (
		<div>
			<Typography variant="h4">{category}</Typography>
			<div>
				{array.map((x) => (
					<ShopItemCard title={x.title} description={x.description} price={x.price} level={x.level} src={x.src} />
				))}
			</div>
		</div>
	);
}
