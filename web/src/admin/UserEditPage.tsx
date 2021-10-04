import { makeStyles } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import { LeftBar } from "./LeftBar"
import { NavBar } from "./NavBar"
import { Link } from "react-router-dom"
import React, { useState, useRef, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { FormLabel } from "@material-ui/core"
import { IUser, IErrorMessage, isIErrorMessage } from "./UserCreatePage"
import { Alert } from "@mui/material"
import { deleteUserByID } from "./user"
import { SimpleDialog } from "./SimpleDialog"
import { DeleteAlertDialog } from "./DeleteAlertDialog"

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
	userID: string
}

const UserEditPage = () => {
	const classes = useStyles()
	const history = useHistory()
	const { userID } = useParams<ParamTypes>()
	const [user, setUser] = useState<IUser>()
	const [open, setOpen] = useState(false)
	const [errorOpen, setErrorOpen] = useState(false)
	const [successOpen, setSuccessOpen] = useState(false)

	const [updatePassword, setUpdatePassword] = useState(false)
	const [response, setResponse] = useState<IUser | IErrorMessage>()
	const [isError, setIsError] = useState(false)

	const usernameRef = useRef<HTMLInputElement>()
	const nameRef = useRef<HTMLInputElement>()
	const emailRef = useRef<HTMLInputElement>()
	const passwordRef = useRef<HTMLInputElement>()
	const confirmPasswordRef = useRef<HTMLInputElement>()

	useEffect(() => {
		try {
			//Fetch User from the API endpoint
			fetch(`/admin/users/${userID}`)
				.then((response) => response.json())
				.then((json) => (json === undefined ? setIsError(true) : setUser(json)))
		} catch (err) {
			setIsError(true)
		}
	}, [])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (updatePassword) {
			try {
				// Hitting the API endpoint: PUT /admin/users/123
				const res = await fetch(`/admin/users/${userID}`, {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						id: user?.id,
						username: usernameRef?.current?.value,
						name: nameRef?.current?.value,
						email: emailRef?.current?.value,
						password: passwordRef?.current?.value,
						isVerified: user?.isVerified,
						token: user?.token,
						confirmPassword: confirmPasswordRef?.current?.value,
					}),
				})

				const data: IUser | IErrorMessage = await res.json()
				if (res.status === 200 && !isIErrorMessage(data)) {
					history.push("/admin/users")
				} else {
					setIsError(true)
					setResponse(data)
				}
			} catch (err) {
				setErrorOpen(true)
			}
		} else {
			try {
				// Hitting the API endpoint: PUT /admin/user_details_only/123
				const res = await fetch(`/admin/user_details_only/${userID}`, {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						id: user?.id,
						username: usernameRef?.current?.value,
						name: nameRef?.current?.value,
						email: emailRef?.current?.value,
						isVerified: user?.isVerified,
						token: user?.token,
					}),
				})

				const data: IUser | IErrorMessage = await res.json()
				if (res.status === 200 && !isIErrorMessage(data)) {
					history.push("/admin/users")
				} else {
					setIsError(true)
					setResponse(data)
				}
			} catch (err) {
				setErrorOpen(true)
			}
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setIsError(false)
		const { name, value } = e.target
		setUser((prevState) => ({ ...prevState, [name]: value } as typeof user))
	}

	const handleDelete = async () => {
		try {
			const msg = await deleteUserByID(userID)
			console.log(msg)
			if (msg.isValid) {
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
								EDIT USER
							</Typography>
							<div style={{ display: "flex", justifyContent: "right" }}>
								<Button
									color="primary"
									style={{ maxHeight: "36px", marginRight: "10px" }}
									startIcon={<DeleteIcon />}
									variant="contained"
									onClick={() => setOpen(true)}
								>
									DELETE USER
								</Button>
								<Link to="/admin/users/create" style={{ textDecoration: "none" }}>
									<Button color="primary" size="medium" startIcon={<AddIcon />} variant="contained">
										CREATE USER
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
											placeholder={user?.id}
											contentEditable="false"
										/>
									</Grid>
									<Grid item xs={12}>
										<FormLabel>Token</FormLabel>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="id"
											name="id"
											autoComplete="id"
											placeholder={user?.token}
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
											value={user?.name}
											onChange={handleChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<FormLabel>Username</FormLabel>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="username"
											name="username"
											autoComplete="username"
											value={user?.username}
											inputRef={usernameRef}
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
											value={user?.email}
											inputRef={emailRef}
											onChange={handleChange}
										/>
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
											<Alert severity="error">
												{response?.message === undefined ? "Internal server error. Try again." : response.message}
											</Alert>
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
								onConfirm={() => {
									history.push("/admin/users")
								}}
							/>
						</div>
					</Container>
				</Grid>
			</Grid>
		</div>
	)
}

export { UserEditPage }
