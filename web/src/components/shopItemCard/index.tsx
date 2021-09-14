import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { IShopItem } from "../../models/shopModels";
import { useStyles } from "./shopItemCardCss";

export function ShopItemCard({ id, name, level, cost, src }: IShopItem) {
	const css = useStyles();

	async function handleBuy() {
		try {
			const response = await fetch("/api/buyItem", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ shopItemID: id }),
			});
			const data = response.json();
			console.log(data);
		} catch (err) {
			console.log(err);
			return;
		}
	}

	return (
		<Card className={css.container}>
			<CardMedia className={css.media} component="img" alt={name} height="140" src={`/assets/${src}`} />
			<CardContent className={css.content}>
				<div className={css.level}>
					<Typography>lv: {level}</Typography>
					<Typography>${cost}</Typography>
				</div>
				<Typography className={css.title} variant="h6">
					{name}
				</Typography>
			</CardContent>
			<CardActions>
				<Button className={css.button} variant="outlined" color="primary" onClick={handleBuy}>
					Buy
				</Button>
			</CardActions>
		</Card>
	);
}
