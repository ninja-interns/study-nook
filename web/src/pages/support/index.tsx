import React, { ChangeEventHandler, EventHandler, TextareaHTMLAttributes, useRef, useState } from "react";
import { useStyles } from "./supportCss";
import { TextField, Card, Button, Typography, TextareaAutosize, TextareaAutosizeProps } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import closeButton from "../../assets/close-button.png";

export function SupportPage() {
    const css = useStyles();
    const history = useHistory();


    const [error, setError] = useState("");
    const [popup, setPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [user, setUsername] = useState("");

    const messageRef = useRef<HTMLInputElement>();

    async function handleReportSubmit() {
        setError("");

        //hitting the backend route of /loginUser with the body of necessary values
        try {
            const response = await fetch("/api/reportSubmission", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ message }),
            });
            //awaiting the response to comeback and turn it into readable json data
            //if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back
            /*if (data.isValid) {
                history.push("/dashboard");
            } else {
                setError(data.message);
            }*/
        } catch (err) {
            console.log(err);
        }
    }

    const handlePopupOpen = () => {
        setPopup(true);
    };

    const handlePopupClose = () => {
        setPopup(false);
    };

    const handleMessage = (e: React.ChangeEvent<any>) => {
        setMessage(e.target.value);
    };


    const body = (
        <div className={css.popUpBody}>
            <Typography variant="h5" className={css.popUpTitle}>Confirmation</Typography>
            <Typography variant="h6" className={css.popUpContent}>Username: </Typography>
            <Typography variant="h6" className={css.popUpContent}>Date: </Typography>
            <Typography variant="h6" className={css.popUpContent}>Message: <br />some message here </Typography>

            <div className={css.buttonsClass}>
                <Button variant="contained" color="primary" onClick={handleReportSubmit}> Submit </Button>

                <Button variant="contained" color="primary" onClick={handlePopupClose}> Cancel </Button>

            </div>

        </div>
    );

    return (
        <div className={css.container}>
            <img className={css.closeButton} src={closeButton} alt="Close button" onClick={() => history.goBack()}></img>

            <Typography className={css.pageTitle} variant="h5">Submit a ticket</Typography>

            <div>
                <Typography className={css.userInfo} variant="h5">Username:</Typography>
                <Typography className={css.userInfo} variant="h5">Message:</Typography>

                <TextareaAutosize required className={css.textArea} minRows={15} onKeyUp={handleMessage}></TextareaAutosize>
                <Button className={css.submitReportButton} variant="contained" color="primary" onClick={handlePopupOpen}>Submit</Button>

                <div className={css.centralizeModal}>
                    <Modal
                        open={popup}
                        onClose={handlePopupClose}
                        aria-labelledby="Confirm"
                        aria-describedby="Idk"
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={popup}>
                            {body}
                        </Fade>
                    </Modal>
                </div>
            </div>

        </div >
    );
}
