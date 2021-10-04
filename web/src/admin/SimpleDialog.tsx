import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

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
