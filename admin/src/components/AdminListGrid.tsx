import { DataGrid } from "@material-ui/data-grid"
import { Button, makeStyles, Typography } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { deleteAdmin, getAllAdmins, IResponse, isIResponse, IAdminResponse } from "../api/admin"
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

const AdminListGrid = () => {
	const classes = useStyles()
	const [admins, setAdmins] = useState<IAdminResponse[]>([])
	const [open, setOpen] = useState(false)
	const [adminID, setAdimID] = useState("")
	const [errorOpen, setErrorOpen] = useState(false)
	const [successOpen, setSuccessOpen] = useState(false)

	useEffect(() => {
		async function fetchAllAdmins() {
			const res: IResponse | IAdminResponse[] = await getAllAdmins()
			if (isIResponse(res)) {
				setErrorOpen(true)
			} else {
				setAdmins(res)
			}
		}
		fetchAllAdmins()
	}, [])

	//Columns of Datagrid
	const columns = [
		{ field: "id", headerName: "ID", width: 200 },
		{
			field: "name",
			headerName: "Full Name ",
			width: 200,
			editable: true,
		},
		{
			field: "email",
			headerName: "Email",
			width: 200,
			editable: true,
		},
		{
			field: "adminType",
			headerName: "Admin Type",
			width: 200,
			editable: true,
		},
		{
			field: "action",
			headerName: "Action",
			width: 200,
			renderCell: (params: any) => {
				return (
					<>
						<Link to={"/admins-edit/" + params.row.id} style={{ textDecoration: "none" }}>
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
								setAdimID(params.row.id)
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
			const res = await deleteAdmin(adminID)
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
					RECENT ADMINS
				</Typography>
				<Link to="/admins-create" style={{ textDecoration: "none" }}>
					<Button color="primary" size="medium" startIcon={<AddIcon />} variant="contained">
						CREATE ADMIN
					</Button>
				</Link>
			</div>

			<DataGrid autoHeight rows={admins} columns={columns} pageSize={8} checkboxSelection disableSelectionOnClick />

			<DeleteAlertDialog
				title="Delete Admin?"
				message="Are you sure you want to delete this admin?"
				open={open}
				setOpen={setOpen}
				onConfirm={handleDelete}
			/>

			<SimpleDialog open={errorOpen} title="Error" message="Internal server error" setOpen={setErrorOpen} onConfirm={() => {}} />
			<SimpleDialog
				open={successOpen}
				title="Success"
				message="Successfully deleted the admin"
				setOpen={setSuccessOpen}
				onConfirm={() => setAdmins(admins.filter((user: IAdminResponse) => user.id !== adminID))}
			/>
		</div>
	)
}

export { AdminListGrid }
