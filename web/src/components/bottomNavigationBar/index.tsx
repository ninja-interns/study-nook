import { AppBar, Box, Paper, Tab, Tabs, useTheme } from "@mui/material"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import { Link, useRouteMatch } from "react-router-dom"
import DashboardIcon from "@mui/icons-material/Dashboard"
import StorefrontIcon from "@mui/icons-material/Storefront"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import ListIcon from "@mui/icons-material/List"
import TimerIcon from "@mui/icons-material/Timer" // Could use this for nooking setup
import MenuIcon from "@mui/icons-material/Menu" // Could use this for menu

/**
 * * NAVIGATION BAR COMPONENT
 * * This component adds a navigation bar feature at the bottom of a page
 * * The bar displays an icon for the pages and the icon and text for the current page
 */
export default function NavigationBar() {
	//! COMMENT
	const routeMatch = useRouteMatch(["/dashboard", "/nookingSetup", "/shop", "/menu"])
	const currentTab = routeMatch?.path

	return (
		<Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "primary.main" }}>
			<Tabs value={currentTab} textColor="inherit" indicatorColor="secondary">
				<Tab label="Dashboard" value="/dashboard" to="/dashboard" component={Link} icon={<DashboardIcon />} />
				<Tab label="Setup" value="/nookingSetup" to="/nookingSetup" component={Link} icon={<ListIcon />} />
				<Tab label="Shop" value="/shop" to="/shop" component={Link} icon={<StorefrontIcon />} />
				<Tab label="Menu" value="/menu" to="/menu" component={Link} icon={<MoreHorizIcon />} />
			</Tabs>
		</Box>
	)
}
