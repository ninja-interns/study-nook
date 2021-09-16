import { DataGrid } from "@material-ui/data-grid"
import { Button, makeStyles, Typography } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
	title: {
		display: "flex",
		justifyContent: "space-between",
		margin: "1",
	},
}))

const UserListGrid = () => {
	const classes = useStyles()
	const [users, setUsers] = useState([])

	useEffect(() => {
		try {
			//Fetch User list from the API endpoint
			fetch("/admin/users")
				.then((response) => response.json())
				.then((json) => setUsers(json))
		} catch (err) {
			console.log(err)
		}
	}, [])

	//Columns of Datagrid
	const columns = [
		{ field: "id", headerName: "ID", width: 90 },
		{
			field: "name",
			headerName: "Full Name ",
			width: 150,
			editable: true,
		},
		{
			field: "username",
			headerName: "Username",
			width: 150,
			editable: true,
		},
		{
			field: "email",
			headerName: "Email",
			width: 200,
			editable: true,
		},
		{
			field: "token",
			headerName: "Token",
			width: 150,
			editable: true,
		},
		{
			field: "isVerified",
			headerName: "Is Verified",
			sortable: false,
			width: 150,
			renderCell: (params: any) => {
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
			renderCell: (params: any) => {
				return (
					<>
						<Link to={"/admin/users/" + params.row.id} style={{ textDecoration: "none" }}>
							<Button variant="contained" size="small" color="primary" className={classes.button} startIcon={<EditIcon />}>
								Edit
							</Button>
						</Link>

						<Button
							variant="contained"
							size="small"
							color="secondary"
							className={classes.button}
							startIcon={<DeleteIcon />}
							onClick={() => handleDelete(params.row.id)}
						>
							Delete
						</Button>
					</>
				)
			},
		},
	]

	const handleDelete = (id: string) => {
		setUsers(users.filter((user: any) => user.id !== id))
	}

	return (
		<div>
			<div className={classes.title}>
				<Typography variant="h6" color="primary" gutterBottom>
					RECENT USERS
				</Typography>
				<Link to="/admin/users/create" style={{ textDecoration: "none" }}>
					<Button color="primary" size="medium" startIcon={<AddIcon />} variant="contained">
						CREATE USER
					</Button>
				</Link>
			</div>

			<DataGrid rows={users} columns={columns} pageSize={8} checkboxSelection disableSelectionOnClick />
		</div>
	)
}

export default UserListGrid
