import { FormControlLabel, makeStyles, Radio, RadioGroup } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import { LeftBar } from "../components/LeftBar"
import { NavBar } from "../components/NavBar"
import { Link } from "react-router-dom"
import React, { useState, useRef, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { FormLabel } from "@material-ui/core"
import { IAdminResponse, IResponse, isIResponse, deleteAdmin, getAdminByID, updateAdmin, IAdminRequest, updateAdminExceptPassword } from "../api/admin"
import { Alert } from "@material-ui/lab"
import { SimpleDialog } from "../components/SimpleDialog"
import { DeleteAlertDialog } from "../components/DeleteAlertDialog"
import { Console } from "console"

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(10),
	},
	title: {
		display: "flex",
		justifyContent: "space-between",
		margin: "1",
	},
	main: {
		width: "50%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(0),
		display: "inline",
	},
}))

interface ParamTypes {
	adminID: string
}

const AdminEdit = () => {
	const classes = useStyles()
	const history = useHistory()
	const { adminID } = useParams<ParamTypes>()
	const [admin, setAdmin] = useState<IAdminResponse>()
	const [open, setOpen] = useState(false)
	const [errorOpen, setErrorOpen] = useState(false)
	const [successOpen, setSuccessOpen] = useState(false)

	const [updatePassword, setUpdatePassword] = useState(false)
	const [response, setResponse] = useState<IAdminResponse | IResponse>()
	const [isError, setIsError] = useState(false)

	const [adminType, setAdminType] = useState("")
	const nameRef = useRef<HTMLInputElement>()
	const emailRef = useRef<HTMLInputElement>()
	const passwordRef = useRef<HTMLInputElement>()
	const confirmPasswordRef = useRef<HTMLInputElement>()

	useEffect(() => {
		async function fetchAdminByID() {
			try {
				const res = await getAdminByID(adminID)
				console.log(res)
				if (isIResponse(res)) {
					setIsError(true)
				} else {
					setAdmin(res)
					setAdminType(res.adminType)
				}
			} catch (err) {
				setIsError(true)
			}
		}
		fetchAdminByID()
	}, [])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		let name = nameRef?.current?.value
		let email = emailRef?.current?.value
		let password = passwordRef?.current?.value
		let confirmPassword = confirmPasswordRef?.current?.value
		let admin: IAdminRequest
		if (updatePassword) {
			try {
				if (adminType !== undefined && name !== undefined && email !== undefined && password !== undefined && confirmPassword !== undefined) {
					admin = {
						adminType: adminType,
						name: name,
						email: email,
						password: password,
						confirmPassword: confirmPassword,
					}
					const res = await updateAdmin(adminID, admin)
					if (!isIResponse(res)) {
						history.push("/admins")
					} else {
						setIsError(true)
						setResponse(res)
					}
				} else {
					setIsError(true)
				}
			} catch (err) {
				setErrorOpen(true)
			}
		} else {
			try {
				if (adminType !== undefined && name !== undefined && email !== undefined) {
					admin = {
						adminType: adminType,
						name: name,
						email: email,
					}
					const res = await updateAdminExceptPassword(adminID, admin)
					if (!isIResponse(res)) {
						history.push("/admins")
					} else {
						setIsError(true)
						setResponse(res)
					}
				} else {
					setIsError(true)
				}
			} catch (err) {
				setErrorOpen(true)
			}
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setIsError(false)
		const { name, value } = e.target
		setAdmin((prevState) => ({ ...prevState, [name]: value } as typeof admin))
	}

	const handleAdminTypeChange = (e: any) => {
		setAdminType(e.target.value)
	}
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
			<NavBar />
			<Grid container>
				<Grid item sm={2} xs={2}>
					<LeftBar />
				</Grid>
				<Grid item sm={10} xs={10}>
					<Container className={classes.container} style={{ height: 650, width: "100%" }}>
						<CssBaseline />
						<div className={classes.title}>
							<Typography variant="h6" color="primary" gutterBottom>
								EDIT ADMIN
							</Typography>
							<div style={{ display: "flex", justifyContent: "right" }}>
								<Button
									color="primary"
									style={{ maxHeight: "36px", marginRight: "10px" }}
									startIcon={<DeleteIcon />}
									variant="contained"
									onClick={() => setOpen(true)}
								>
									DELETE ADMIN
								</Button>
								<Link to="/admins-create" style={{ textDecoration: "none" }}>
									<Button color="primary" size="medium" startIcon={<AddIcon />} variant="contained">
										CREATE ADMIN
									</Button>
								</Link>
							</div>
						</div>

						<div className={classes.main}>
							<form className={classes.form} noValidate onSubmit={handleSubmit}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<FormLabel>ID</FormLabel>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="id"
											name="id"
											autoComplete="id"
											placeholder={admin?.id}
											contentEditable="false"
										/>
									</Grid>
									<Grid item xs={12}>
										<FormLabel>Name</FormLabel>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="name"
											name="name"
											autoComplete="name"
											inputRef={nameRef}
											value={admin?.name}
											onChange={handleChange}
										/>
									</Grid>

									<Grid item xs={12}>
										<FormLabel>Email</FormLabel>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="email"
											name="email"
											autoComplete="email"
											value={admin?.email}
											inputRef={emailRef}
											onChange={handleChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<FormLabel component="legend">Admin Type</FormLabel>
										<RadioGroup row aria-label="adminType" name="adminType" value={adminType} onChange={handleAdminTypeChange}>
											<FormControlLabel value="admin" control={<Radio />} label="Admin" />
											<FormControlLabel value="superadmin" control={<Radio />} label="Super" />
										</RadioGroup>
									</Grid>

									{!updatePassword && (
										<Grid item xs={12}>
											<Button
												color="primary"
												type="button"
												style={{ textTransform: "none" }}
												onClick={() => {
													setUpdatePassword(true)
													setIsError(false)
												}}
											>
												Click to update the password.
											</Button>
										</Grid>
									)}

									{updatePassword && (
										<>
											<Grid item xs={12}>
												<FormLabel>New Password</FormLabel>
											</Grid>
											<Grid item xs={12}>
												<TextField
													variant="outlined"
													required
													fullWidth
													name="password"
													label="New Password"
													type="password"
													id="password"
													autoComplete="password"
													inputRef={passwordRef}
													onChange={handleChange}
												/>
											</Grid>
											<Grid item xs={12}>
												<FormLabel>Confirm password</FormLabel>
											</Grid>
											<Grid item xs={12}>
												<TextField
													variant="outlined"
													required
													fullWidth
													name="confirmPassword"
													label="Confirm Password"
													type="password"
													id="confirmPassword"
													autoComplete="confirmPassword"
													inputRef={confirmPasswordRef}
													onChange={handleChange}
												/>
											</Grid>
										</>
									)}
									{updatePassword && (
										<Grid item xs={12}>
											<Button
												type="button"
												color="primary"
												style={{ textTransform: "none" }}
												onClick={() => {
													setUpdatePassword(false)
													setIsError(false)
												}}
											>
												Click to not update the password.
											</Button>
										</Grid>
									)}
									{isError && (
										<Grid item xs={12}>
											<Alert severity="error">{response?.text === undefined ? "Internal server error, try again" : response.text}</Alert>
										</Grid>
									)}
									<Grid item xs={4} sm={4}>
										<Button name="submit" type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
											SUBMIT
										</Button>
									</Grid>
								</Grid>
							</form>

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
								message="Successfully deleted the admin."
								setOpen={setSuccessOpen}
								onConfirm={() => {
									history.push("/admin")
								}}
							/>
						</div>
					</Container>
				</Grid>
			</Grid>
		</div>
	)
}

export { AdminEdit }
