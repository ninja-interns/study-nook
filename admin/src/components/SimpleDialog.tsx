import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

interface IDialogProps {
	message: string
	title: string
	open: boolean
	setOpen: (arg: boolean) => void
	onConfirm: () => void
}

const SimpleDialog = ({ title, message, open, setOpen, onConfirm }: IDialogProps) => {
	return (
		<Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="dialog-title" aria-describedby="dialog-description">
			<DialogTitle id="dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="dialog-description">{message}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					name="ok"
					onClick={() => {
						setOpen(false)
						onConfirm()
					}}
					autoFocus
				>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export { SimpleDialog }
