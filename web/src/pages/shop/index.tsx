import { Divider, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect, useState } from "react";
import { ShopList } from "../../components";
import { IInventoryItem, IShopItem } from "../../models/shopModels";
import { useStyles } from "./shopCss";

export function Shop() {
	const css = useStyles();
	const [shopArray, setShopArray] = useState<IShopItem[] | null>(null);
	const [invArray, setInvArray] = useState<IInventoryItem[] | null>(null);

	useEffect(() => {
		let isMounted = true;
		(async () => {
			try {
				const response = await fetch("/api/getShopItems", {
					method: "GET",
					headers: { "content-type": "application/json" },
				});
				const data = await response.json();
				const invResponse = await fetch("/api/getInventoryItems", {
					method: "GET",
					headers: { "content-type": "application/json" },
				});
				const invData = await invResponse.json();
				if (isMounted) {
					console.log(data);
					setShopArray(data);
					setInvArray(invData);
					console.log(invData);
				}
			} catch (err) {
				console.error(err);
			}
		})();
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className={css.container}>
			<div className={css.title}>
				<Typography variant="h4">Shop</Typography>
				<button className={css.button}>
					<MenuIcon fontSize="large" />
				</button>
			</div>
			<Divider />
			<div className={css.level}>
				<Typography>Level: ~~level~~</Typography>
				<Typography>Coins: ~~coins~~</Typography>
			</div>
			<Divider />
			<ShopList category="Backgrounds" shopArray={shopArray} invArray={invArray} />

			<Typography variant="h5">Avatars</Typography>
			<div className={css.placeholder}>
				<Typography variant="h6" className={css.soon}>
					Coming soon!
				</Typography>
			</div>
		</div>
	);
}
