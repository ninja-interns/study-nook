import { Typography } from "@material-ui/core";
import React from "react";
import { InventoryItemCard } from "../inventoryItemCard";
import { IInventoryList } from "./../../models/shopModels";
import { useStyles } from "./inventoryListCss";

export function InventoryList({ category, array }: IInventoryList) {
	const css = useStyles();

	if (array === null) return null;

	return (
		<div className={css.container}>
			<Typography variant="h5" className={css.category}>
				{category}
			</Typography>
			<div className={css.content}>
				{array.map((x) => (
					<InventoryItemCard key={x.id} category={category} name={x.name} level={x.level} src={x.src} />
				))}
			</div>
		</div>
	);
}
