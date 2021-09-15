import { Typography } from "@material-ui/core";
import React from "react";
import { IShopList } from "../../models/shopModels";
import { ShopItemCard } from "../shopItemCard";
import { useStyles } from "./shopListCss";

export function ShopList({ category, shopArray }: IShopList) {
	const css = useStyles();

	if (shopArray === null) return null;

	return (
		<div className={css.container}>
			<Typography variant="h5" className={css.category}>
				{category}
			</Typography>
			<div className={css.content}>
				{shopArray.map((x) => (
					<ShopItemCard key={x.id} id={x.id} category={category} name={x.name} cost={x.cost} level={x.level} src={x.src} />
				))}
			</div>
		</div>
	);
}
