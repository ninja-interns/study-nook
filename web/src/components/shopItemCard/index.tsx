import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { IShopItem } from "../../models/shopModels";
import { useStyles } from "./shopItemCardCss";

export function ShopItemCard({ name, level, cost, src }: IShopItem) {
	const css = useStyles();
	return (
		<Card className={css.container}>
			<CardMedia className={css.media} component="img" alt={name} height="140" src={`data:image/png;base64, ${src}`} />
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
				<Button className={css.button} variant="outlined" color="primary">
					Buy
				</Button>
			</CardActions>
		</Card>
	);
}
