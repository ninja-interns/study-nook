import { makeStyles, AppBar, Toolbar, Typography, Badge, Avatar } from "@material-ui/core"
import { Mail, Notifications } from "@material-ui/icons"

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
}))

const NavBar = () => {
	const classes = useStyles()
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
				</div>
			</Toolbar>
		</AppBar>
	)
}

export default NavBar
