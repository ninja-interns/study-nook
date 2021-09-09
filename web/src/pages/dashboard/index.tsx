import { Button, Fade, Typography } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { DeleteAccount, Logout } from "../../components";
import { ContextContainer } from "../../contexts/ContextContainer";
import { useGetState } from "./../../utils/getState";
import ShopList from "../../components/shopList";
import { IShopItem } from "../../models/shopModels";
import exampleBackground from "../../assets/exampleBackground.jpg";

const ShopItemArray: IShopItem[] = [{ title: "Example", description: "example", level: 3, price: 25, src: exampleBackground }];

export function Dashboard() {
	useGetState();
	const { currentUser } = ContextContainer.useContainer();
	const history = useHistory();

	return (
		<Fade in={true} timeout={1000}>
			<div>
				<Logout />
				<DeleteAccount />
				<Typography variant="body1">Welcome to your StudyNook Dashboard, {currentUser.name}!</Typography>
				<Button onClick={() => history.push("/profile")}>Profile</Button>
				<Link to="/updateUser">Update User</Link>
				<Link to="/updatePassword">Update Password</Link>
				<ShopList category="Backgrounds" array={ShopItemArray} />
			</div>
		</Fade>
	);
}
