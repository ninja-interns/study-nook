import DashboardIcon from "@mui/icons-material/Dashboard"
import DesktopMacIcon from "@mui/icons-material/DesktopMac"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import { AppBar, Tab, Tabs } from "@mui/material"
import { Link, useRouteMatch } from "react-router-dom"

/**
 * * APP BAR COMPONENT
 * * Tab style app bar, when you click on a tab it will redirect you to that page, it highlights the page you are currently on
 */
export default function AppBarComponent() {
	const routeMatch = useRouteMatch(["/dashboard", "/nookingSetup", "/shop", "/menu"])
	const currentTab = routeMatch?.path

	return (
		<AppBar position="static">
			<Tabs value={currentTab} textColor="inherit" variant="fullWidth" indicatorColor="secondary">
				<Tab label="Dashboard" icon={<DashboardIcon />} value="/dashboard" to="/dashboard" component={Link} />
				<Tab label="Nooking Setup" icon={<DesktopMacIcon />} value="/nookingSetup" to="/nookingSetup" component={Link} />
				<Tab label="Shop" icon={<ShoppingBagIcon />} value="/shop" to="/shop" component={Link} />
				<Tab label="More" icon={<MoreHorizIcon />} value="/menu" to="/menu" component={Link} />
			</Tabs>
		</AppBar>
	)
}
