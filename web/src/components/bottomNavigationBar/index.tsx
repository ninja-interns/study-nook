import FavoriteIcon from "@mui/icons-material/Favorite"
import FolderIcon from "@mui/icons-material/Folder"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import RestoreIcon from "@mui/icons-material/Restore"
import { Paper } from "@mui/material"
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
	//! COMMENT
	const routeMatch = useRouteMatch(["/dashboard", "/nookingSetup", "/shop", "/menu"])
	const currentTab = routeMatch?.path

	return (
		<Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
			<BottomNavigation value={currentTab}>
				<BottomNavigationAction label="Dashboard" value="/dashboard" to="/dashboard" component={Link} icon={<RestoreIcon />} />
				<BottomNavigationAction
					label="Nooking Setup"
					value="/nookingSetup"
					to="/nookingSetup"
					component={Link}
					icon={<RestoreIcon />}
					sx={{
						fontSize: 2,
					}}
				/>
				<BottomNavigationAction label="Shop" value="/shop" to="/shop" component={Link} icon={<RestoreIcon />} />
				<BottomNavigationAction label="Menu" value="/menu" to="/menu" component={Link} icon={<RestoreIcon />} />
			</BottomNavigation>
		</Paper>
	)
}
