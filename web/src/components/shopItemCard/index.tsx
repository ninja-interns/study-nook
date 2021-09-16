import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IInventoryItem, IShopItem } from "../../models/shopModels";
import { useStyles } from "./shopItemCardCss";

export function ShopItemCard({ id, name, category, level, cost, src }: IShopItem) {
	const css = useStyles();
	const [invArray, setInvArray] = useState<IInventoryItem[] | null>(null);

	useEffect(() => {
		let isMounted = true;
		(async () => {
			try {
				const invResponse = await fetch("/api/getInventoryItems", {
					method: "GET",
					headers: { "content-type": "application/json" },
				});
				const invData = await invResponse.json();
				if (isMounted) {
					setInvArray(invData);
				}
			} catch (err) {
				console.error(err);
			}
		})();
		return () => {
			isMounted = false;
		};
	}, []);

	let isOwned;
	invArray?.map((x) => {
		console.log("inventory", invArray, "shopitem from inv", x.shopitemid, "current item", id);
		if (x.shopitemid === id) {
			return (isOwned = 1);
		} else {
			return (isOwned = 0);
		}
	});

	async function handleBuy() {
		console.log(id);
		try {
			const response = await fetch("/api/buyItem", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ shopItemID: id, category: category, level: level, name: name, src: src }),
			});
			const data = await response.json();
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
				<Button disabled={isOwned} className={css.button} variant="outlined" color="primary" onClick={handleBuy}>
					Buy
				</Button>
			</CardActions>
		</Card>
	);
}
