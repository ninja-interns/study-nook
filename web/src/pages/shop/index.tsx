import { Divider, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect, useState } from "react";
import { ShopList } from "../../components";
import { IShopItem } from "../../models/shopModels";
import { useStyles } from "./shopCss";

export function Shop() {
	const css = useStyles();
	const [bgArray, setBgArray] = useState<IShopItem[] | null>(null);

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
					setBgArray(
						data.filter((x: IShopItem) => {
							return x.category === "backgrounds";
						}),
					);
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
			<ShopList category="Backgrounds" array={bgArray} />

			<Typography variant="h5">Avatars</Typography>
			<div className={css.placeholder}>
				<Typography variant="h6" className={css.soon}>
					Coming soon!
				</Typography>
			</div>
		</div>
	);
}
