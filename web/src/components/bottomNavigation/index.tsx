import DashboardIcon from "@mui/icons-material/Dashboard"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import TimerIcon from "@mui/icons-material/Timer" // Could use this for nooking setup
import { Box, Paper } from "@mui/material"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import * as React from "react"
import { Link, useRouteMatch } from "react-router-dom"

/**
 * * NAVIGATION BAR COMPONENT
 * * This component adds a navigation bar feature at the bottom of a page
 * * The bar displays an icon for the pages and the icon and text for the current page
 */
export default function NavigationBar() {
	//* If nooking is set to false redirect the user to the nooking setup page instead of nooking
	const [nookingRoute, setNookingRoute] = React.useState("/nooking")
	chrome.storage.sync.get(["key"], function (result) {
		if (result.key === false) {
			setNookingRoute("/nookingSetup")
		}
	})

	//* Checks which route matches the current page and displays the label for that nav action button
	const routeMatch = useRouteMatch(["/dashboard", nookingRoute, "/menu"])
	const currentTab = routeMatch?.path

	return (
		<Paper elevation={3} sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
			<BottomNavigation value={currentTab}>
				<BottomNavigationAction label="Dashboard" value="/dashboard" to="/dashboard" component={Link} icon={<DashboardIcon />} />
				<BottomNavigationAction label="Nooking" value={nookingRoute} to={nookingRoute} component={Link} icon={<TimerIcon />} />
				<BottomNavigationAction label="Menu" value="/menu" to="/menu" component={Link} icon={<MoreHorizIcon />} />
			</BottomNavigation>
		</Paper>
	)
}
