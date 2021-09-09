import { Typography } from "@material-ui/core";
import React from "react";
import ShopList from "../../components/shopList";
import { ShopItemArray } from "../../models/shopModels";
import { useStyles } from "./shopCss";

export function Shop() {
	const css = useStyles();
	return (
		<div className={css.container}>
			<div className={css.title}>
				<Typography variant="h4">Shop</Typography>
				<div>Menu</div>
			</div>
			<div className={css.level}>
				<Typography>Level: ~~level~~</Typography>
				<Typography>Coins: ~~coins~~</Typography>
			</div>

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
