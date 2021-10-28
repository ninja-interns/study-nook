import { DataGrid } from "@material-ui/data-grid"
import { Button, makeStyles, Typography } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { deleteUser, getAllUsers, IResponse, isIResponse, IUserResponse } from "../api/api"
import { SimpleDialog } from "./SimpleDialog"
import { DeleteAlertDialog } from "./DeleteAlertDialog"

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
	const [users, setUsers] = useState<IUserResponse[]>([])
	const [open, setOpen] = useState(false)
	const [userID, setUserID] = useState("")
	const [errorOpen, setErrorOpen] = useState(false)
	const [successOpen, setSuccessOpen] = useState(false)

	useEffect(() => {
		async function fetchAllUsers() {
			const res: IResponse | IUserResponse[] = await getAllUsers()
			if (isIResponse(res)) {
				setErrorOpen(true)
			} else {
				setUsers(res)
			}
		}
		fetchAllUsers()
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
						<Link to={"/users-edit/" + params.row.id} style={{ textDecoration: "none" }}>
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
							onClick={() => {
								setUserID(params.row.id)
								setOpen(true)
							}}
						>
							Delete
						</Button>
					</>
				)
			},
		},
	]

	const handleDelete = async () => {
		try {
			const res = await deleteUser(userID)
			if (res.status === 200) {
				setSuccessOpen(true)
			} else {
				setErrorOpen(true)
			}
		} catch (err) {
			setErrorOpen(true)
		}
	}

	return (
		<div>
			<div className={classes.title}>
				<Typography variant="h6" color="primary" gutterBottom>
					RECENT USERS
				</Typography>
				<Link to="/users-create" style={{ textDecoration: "none" }}>
					<Button color="primary" size="medium" startIcon={<AddIcon />} variant="contained">
						CREATE USER
					</Button>
				</Link>
			</div>

			<DataGrid autoHeight rows={users} columns={columns} pageSize={8} checkboxSelection disableSelectionOnClick />

			<DeleteAlertDialog
				title="Delete User?"
				message="Are you sure you want to delete this user?"
				open={open}
				setOpen={setOpen}
				onConfirm={handleDelete}
			/>

			<SimpleDialog open={errorOpen} title="Error" message="Internal server error!" setOpen={setErrorOpen} onConfirm={() => {}} />
			<SimpleDialog
				open={successOpen}
				title="Success"
				message="Successfully deleted the user."
				setOpen={setSuccessOpen}
				onConfirm={() => setUsers(users.filter((user: IUserResponse) => user.id !== userID))}
			/>
		</div>
	)
}

export { UserListGrid }
