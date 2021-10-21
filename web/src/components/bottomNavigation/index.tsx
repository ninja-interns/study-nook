import DashboardIcon from "@mui/icons-material/Dashboard"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import TimerIcon from "@mui/icons-material/Timer" // Could use this for nooking setup
import { Box } from "@mui/material"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import { Link, useRouteMatch } from "react-router-dom"

/**
 * * NAVIGATION BAR COMPONENT
 * * This component adds a navigation bar feature at the bottom of a page
 * * The bar displays an icon for the pages and the icon and text for the current page
 */
export default function NavigationBar() {
	//! COMMENT
	const routeMatch = useRouteMatch(["/dashboard", "/nooking", "/menu"])
	const currentTab = routeMatch?.path

	return (
		<Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
			<BottomNavigation value={currentTab}>
				<BottomNavigationAction label="Dashboard" value="/dashboard" to="/dashboard" component={Link} icon={<DashboardIcon />} />
				<BottomNavigationAction label="Nooking" value="/nooking" to="/nooking" component={Link} icon={<TimerIcon />} />
				<BottomNavigationAction label="Menu" value="/menu" to="/menu" component={Link} icon={<MoreHorizIcon />} />
			</BottomNavigation>
		</Box>
	)
}
