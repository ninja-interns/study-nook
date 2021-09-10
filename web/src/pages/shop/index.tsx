import { Divider, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect } from "react";
import ShopList from "../../components/shopList";
import { ShopItemArray } from "../../models/shopModels";
import { useStyles } from "./shopCss";

export function Shop() {
	const css = useStyles();

	useEffect(() => {
		let isMounted = true;
		(async () => {
			try {
				const response = await fetch("/api/getShopItems", {
					method: "GET",
					headers: { "content-type": "application/json" },
				});
				const data = await response.json();
				if (isMounted) {
					console.log(data);
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
			<ShopList category="Backgrounds" array={ShopItemArray} />

			<Typography variant="h5">Avatars</Typography>
			<div className={css.placeholder}>
				<Typography variant="h6" className={css.soon}>
					Coming soon!
				</Typography>
			</div>
		</div>
	);
}
