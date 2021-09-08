import FormControl from "@material-ui/core/FormControl"
import { Input, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	root: {},
}))
export default function CreateUserForm() {
	const classes = useStyles()

	return (
		<div>
			<h1>Hello Form</h1>
			<form className={classes.root} noValidate autoComplete="off">
				<Input defaultValue="Hello world" inputProps={{ "aria-label": "description" }} />
				<Input placeholder="Placeholder" inputProps={{ "aria-label": "description" }} />
				<Input defaultValue="Disabled" disabled inputProps={{ "aria-label": "description" }} />
				<Input defaultValue="Error" error inputProps={{ "aria-label": "description" }} />
			</form>
		</div>
	)
}
