import { makeStyles, Modal } from "@material-ui/core";
import React from "react";
import { useStyles } from "./profileStyle";

/**Player settings/menu**/


export function PlayerProfileSettings() {
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const modalStyles = useStyles().modal;

    /**Modal handlers for open and closing the modal view**/
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    /**Layout of the button that opens the modal**/
    const modalButton = {
        width: '90px',
        height: '40px',
        backgroundColor: 'transparent',
    }

    /**Modal body**/
    const body = (
        <div style={modalStyle} className={modalStyles}>
            <h2 id="simple-modal-title">User Profile</h2>
            <p id="modal-description">
                Settings
            </p>
            <PlayerProfileSettings />
        </div>
    );

    return (
        <div>
            <button style={modalButton} type="button" onClick={handleOpen}>User Name</button>
            <Modal open={open} onClose={handleClose} 
                aria-labelledby="simple-modal-title" 
                aria-describedby="modal-description">{body}</Modal>
        </div>
    );
}

/**Style layout for modal **/
function getModalStyle() {
    const top = 50;
    const left = 50;
    
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

