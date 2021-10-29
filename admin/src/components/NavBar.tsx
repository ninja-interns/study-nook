import { makeStyles, AppBar, Toolbar, Typography, Badge, Avatar } from "@material-ui/core"
import { Mail, Notifications } from "@material-ui/icons"
import { ExitToApp } from "@material-ui/icons"
import { ContextContainer } from "../contexts/ContextContainer"
import { useHistory } from "react-router"
import { logout, IResponse } from "../api/admin"

const useStyles = makeStyles((theme) => ({
	toolbar: {
		display: "flex",
		justifyContent: "space-between",
	},

	logoLarge: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},

	logoSmall: {
		display: "block",
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},

	icons: {
		alignItems: "center",
		display: "flex",
	},

	badge: {
		marginRight: theme.spacing(2),
	},

	icon: {
		marginLeft: theme.spacing(2),
	},
}))

const NavBar = () => {
	const { setIsLoggedIn } = ContextContainer.useContainer()
	const classes = useStyles()
	let history = useHistory()
	const handleLogout = async () => {
		const r: IResponse = await logout()
		if (r.status === 200) {
			setIsLoggedIn(false)
			history.push("/login")
		}
	}
	return (
		<AppBar position="fixed">
			<Toolbar className={classes.toolbar}>
				<Typography variant="h6" className={classes.logoLarge}>
					Study Nook
				</Typography>
				<Typography variant="h6" className={classes.logoSmall}>
					SN
				</Typography>
				<div className={classes.icons}>
					<Badge badgeContent={4} color="secondary" className={classes.badge}>
						<Mail />
					</Badge>
					<Badge badgeContent={2} color="secondary" className={classes.badge}>
						<Notifications />
					</Badge>
					<Avatar
						alt="Sanam Limbu"
						src="https://images.pexels.com/photos/4355346/pexels-photo-4355346.jpeg?cs=srgb&dl=pexels-murat-esibatir-4355346.jpg&fm=jpg"
					/>
					<ExitToApp className={classes.icon} onClick={handleLogout} display="pointer" />
				</div>
			</Toolbar>
		</AppBar>
	)
}

export { NavBar }
