import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { IShopItem } from "../../models/shopModels";
import { useStyles } from "./shopItemCardCss";

export function ShopItemCard({ title, level, price, src }: IShopItem) {
	const css = useStyles();
	return (
		<Card className={css.container}>
			<CardMedia className={css.media} component="img" alt="example" height="140" image={src} title="Contemplative Reptile" />
			<CardContent className={css.content}>
				<div className={css.level}>
					<Typography>lv: {level}</Typography>
					<Typography>${price}</Typography>
				</div>
				<Typography className={css.title} variant="h6">
					{title}
				</Typography>
			</CardContent>
			<CardActions>
				<Button className={css.button} variant="outlined" color="primary">
					Buy
				</Button>
			</CardActions>
		</Card>
	);
}
