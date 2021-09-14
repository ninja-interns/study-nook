import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { IShopItem } from "../../models/shopModels";
import { useStyles } from "./inventoryItemCss";

export function InventoryItemCard({ id, name, category, level, cost, src }: IShopItem) {
	const css = useStyles();

	async function handleApply() {
		//apply this item ID to game interface
		console.log("applied");
	}

	return (
		<Card className={css.container}>
			<CardMedia className={css.media} component="img" alt={name} height="140" src={`/assets/${src}`} />
			<CardContent className={css.content}>
				<div className={css.level}>
					<Typography>{name}</Typography>
					<Typography>lv: {level}</Typography>
				</div>
			</CardContent>
			<CardActions>
				<Button className={css.button} variant="outlined" color="primary" onClick={handleApply}>
					Apply
				</Button>
			</CardActions>
		</Card>
	);
}
