import { Typography } from "@material-ui/core";
import React from "react";
import { IShopList } from "../../models/shopModels";
import { ShopItemCard } from "../shopItemCard";
import { useStyles } from "./shopListCss";

export default function ShopList({ category, array }: IShopList) {
	const css = useStyles();

	if (array === null) return null;

	return (
		<div className={css.container}>
			<Typography variant="h5" className={css.category}>
				{category}
			</Typography>
			<div className={css.content}>
				{array.map((x) => (
					<ShopItemCard key={x.id} name={x.name} cost={x.cost} level={x.level} src={x.src} />
				))}
			</div>
		</div>
	);
}
