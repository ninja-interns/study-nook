import { Box, makeStyles } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import LeftBar from "./LeftBar"
import NavBar from "./NavBar"
import { Link } from "react-router-dom"
import React, { useState, useRef, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { FormLabel } from "@material-ui/core"
import { IUser, IErrorMessage, isIErrorMessage } from "./UserCreatePage"

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
				.then((json) => setUser(json))
		} catch (err) {
			console.log(err)
		}
	}, [])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// Hitting the API endpoint: UPDATE /admin/users/123

		try {
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
			console.error(err)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setIsError(false)
		const { name, value } = e.target
		setUser((prevState) => ({ ...prevState, [name]: value } as typeof user))
	}

	const handleDelete = async (e: React.MouseEvent<HTMLAnchorElement>) => {
		try {
			const res = await fetch(`/admin/users/${userID}`, {
				method: "DELETE",
			})
			const response: IErrorMessage = await res.json()
			if (isIErrorMessage(response)) {
			}
		} catch (err) {
			console.log(err)
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
								<Button color="primary" style={{ maxHeight: "36px", marginRight: "10px" }} startIcon={<DeleteIcon />} variant="contained">
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
									{isError && (
										<Grid item xs={12}>
											<Box component="span" display="inline" color="text.secondary">
												{response?.message}
											</Box>
										</Grid>
									)}
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
												style={{ textTransform: "none" }}
												onClick={() => {
													setUpdatePassword(true)
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
												color="primary"
												style={{ textTransform: "none" }}
												onClick={() => {
													setUpdatePassword(false)
												}}
											>
												Click to not update the password.
											</Button>
										</Grid>
									)}
									<Grid item xs={4} sm={4}>
										<Button name="submit" type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
											SUBMIT
										</Button>
									</Grid>
								</Grid>
							</form>
						</div>
					</Container>
				</Grid>
			</Grid>
		</div>
	)
}

export default UserEditPage
