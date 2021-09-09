import { Button, makeStyles, Modal } from "@material-ui/core";
import { render } from "@testing-library/react";
import React from "react";
import { IProgressPercentage, IProps } from "./IProfile";
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
            <Button variant="contained" color="primary" component="span" onClick={handleOpen}>
                User Name
            </Button>
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


const modalComponentStyle = makeStyles({
    root: {
        
    }
});

/**Contains all the modal UI structure for settings/menu interface**/
class ModalComponents extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }


    render() {
        return (
            <div>
                <div>Settings</div>
                <div>Achiements</div>
                <div>Past Sessions</div>
                <div>Study History</div>
                <div>Support</div>
            </div>
        );
    }

}
