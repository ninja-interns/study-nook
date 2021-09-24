import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface IDeleteAlertDialogProps {
	message: string;
	title: string;
	open: boolean;
	setOpen: (arg: boolean) => void;
	onConfirm: () => Promise<void>;
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
						setOpen(false);
						onConfirm();
					}}
					autoFocus
				>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export { DeleteAlertDialog };
