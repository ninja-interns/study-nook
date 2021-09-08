import React from "react";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import { useStyles } from "./modalCss";

interface ISimpleModalProps {
	children: JSX.Element;
	buttonName: string;
	buttonColor?: "primary" | "secondary" | "default" | "inherit";
	buttonVariant?: "text" | "outlined" | "contained";
}

export function SimpleModal({ children, buttonName, buttonColor, buttonVariant }: ISimpleModalProps): JSX.Element {
	const [open, setOpen] = React.useState<boolean>(false);
	const css = useStyles();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button type="button" variant={buttonVariant} color={buttonColor} onClick={handleOpen}>
				{buttonName}
			</Button>
			<Modal className={css.modal} open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
				<div className={css.body}>{children}</div>
			</Modal>
		</div>
	);
}
