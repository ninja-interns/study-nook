import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

interface IDeleteAlertDialogProps {
	message: string
	title: string
	open: boolean
	setOpen: (arg: boolean) => void
	onConfirm: () => Promise<void>
}

const DeleteAlertDialog = ({ title, message, open, setOpen, onConfirm }: IDeleteAlertDialogProps) => {
	return (
		<Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{message}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button name="no" onClick={() => setOpen(false)}>
					No
				</Button>
				<Button
					name="yes"
					onClick={() => {
						setOpen(false)
						onConfirm()
					}}
					autoFocus
				>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export { DeleteAlertDialog }
