import { DataGrid } from "@material-ui/data-grid"
import { Button, makeStyles, Typography } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import { useState, useEffect } from "react"
import { useRouteMatch, Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
	title: {
		display: "flex",
		justifyContent: "space-between",
	},
}))

export default function Users() {
	const classes = useStyles()

	const { url } = useRouteMatch()

	const [users, setUsers] = useState([])

	//Fetch User list from the API endpoint
	fetch("https://mocki.io/v1/9d8366db-f92f-4d65-9638-90e33aec0ae0") //Fake REST API
		.then((response) => response.json())
		.then((json) => setUsers(json))

	//Columns of Datagrid
	const columns = [
		{ field: "id", headerName: "ID", width: 90 },
		{
			field: "name",
			headerName: "Full Name ",
			width: 200,
			editable: true,
		},
		{
			field: "username",
			headerName: "Username",
			width: 200,
			editable: true,
		},
		{
			field: "email",
			headerName: "Email",
			width: 250,
			editable: true,
		},
		{
			field: "isVerified",
			headerName: "Is Verified",
			sortable: false,
			width: 150,
			renderCell: (params) => {
				if (params.row.isVerified) {
					return <CheckIcon color="primary" />
				}
				return <ClearIcon color="secondary" />
			},
		},
		{
			field: "action",
			headerName: "Action",
			width: 200,
			renderCell: (params) => {
				return (
					<>
						<Button variant="contained" size="small" color="primary" className={classes.button} startIcon={<EditIcon />}>
							Edit
						</Button>
						<Button variant="contained" size="small" color="secondary" className={classes.button} startIcon={<DeleteIcon />}>
							Delete
						</Button>
					</>
				)
			},
		},
	]

	return (
		<div style={{ height: 600, width: "100%" }}>
			<div className={classes.title}>
				<Typography variant="h6" color="primary" gutterBottom>
					RECENT USERS
				</Typography>
				<Link to={`${url}/users/create`} style={{ textDecoration: "none" }}>
					<Button color="primary" startIcon={<AddIcon />}>
						CREATE USER
					</Button>
				</Link>
			</div>

			<DataGrid rows={users} columns={columns} pageSize={10} checkboxSelection disableSelectionOnClick />
		</div>
	)
}
