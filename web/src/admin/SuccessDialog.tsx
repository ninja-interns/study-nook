import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

interface ISuccessDialogProps {
	message: string
	title: string
	open: boolean
	setOpen: (arg: boolean) => void
	onConfirm: () => void
}

const SuccessDialog = ({ title, message, open, setOpen, onConfirm }: ISuccessDialogProps) => {
	return (
		<Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="success-dialog-title" aria-describedby="success-dialog-description">
			<DialogTitle id="success-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="success-dialog-description">{message}</DialogContentText>
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

export { SuccessDialog }
