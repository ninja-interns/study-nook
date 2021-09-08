import Snackbar from "@material-ui/core/Snackbar"
import { Alert, Color } from "@material-ui/lab"
import React from "react"

interface ISnackbarProps {
    message: string
    severity: Color | undefined
    isOpen: boolean
    handleClose: () => void
}

export function Snackbars({ message, severity, isOpen, handleClose }: ISnackbarProps): JSX.Element {
    return (
        <Snackbar anchorOrigin={{ horizontal: "center", vertical: "top" }} open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            {/* @ts-ignore */}
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}
