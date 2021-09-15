import { Divider, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect, useState } from "react";
import { InventoryList } from "../../components";
import { IInventoryItem } from "../../models/shopModels";
import { useStyles } from "./inventoryCss";

export function Inventory() {
	const css = useStyles();
	const [bgInvArray, setBgInvArray] = useState<IInventoryItem[] | null>(null);

	useEffect(() => {
		let isMounted = true;
		(async () => {
			try {
				const response = await fetch("/api/getInventoryItems", {
					method: "GET",
					headers: { "content-type": "application/json, image/jpeg" },
				});
				const data = await response.json();
				if (isMounted) {
					console.log(data);
					setBgInvArray(
						data.filter((x: IInventoryItem) => {
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
				<Typography variant="h4">Inventory</Typography>
				<button className={css.button}>
					<MenuIcon fontSize="large" />
				</button>
			</div>
			<Divider />
			<InventoryList category="Backgrounds" array={bgInvArray} />
		</div>
	);
}
