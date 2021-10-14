import { Paper } from "@mui/material"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import * as React from "react"
import { Link, useRouteMatch } from "react-router-dom"
import DashboardIcon from "@mui/icons-material/Dashboard"
import TimerIcon from "@mui/icons-material/Timer" // Could use this for nooking setup
import StorefrontIcon from "@mui/icons-material/Storefront"
import MenuIcon from "@mui/icons-material/Menu" // Could use this for menu
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import ListIcon from "@mui/icons-material/List"

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
		<Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
			<BottomNavigation value={currentTab}>
				<BottomNavigationAction label="Dashboard" value="/dashboard" to="/dashboard" component={Link} icon={<DashboardIcon />} />
				<BottomNavigationAction label="Setup" value="/nookingSetup" to="/nookingSetup" component={Link} icon={<ListIcon />} />
				<BottomNavigationAction label="Shop" value="/shop" to="/shop" component={Link} icon={<StorefrontIcon />} />
				<BottomNavigationAction label="Menu" value="/menu" to="/menu" component={Link} icon={<MoreHorizIcon />} />
			</BottomNavigation>
		</Paper>
	)
}
