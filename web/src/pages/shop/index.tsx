import { Button, Divider, Typography } from "@material-ui/core";
import React from "react";
import ShopList from "../../components/shopList";
import { ShopItemArray } from "../../models/shopModels";
import { useStyles } from "./shopCss";
import MenuIcon from "@material-ui/icons/Menu";

export function Shop() {
	const css = useStyles();
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
