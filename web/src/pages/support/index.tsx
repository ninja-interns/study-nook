import React, { useRef, useState } from "react";
import { useStyles } from "./supportCss";
import { TextField, Card, Button, Typography, TextareaAutosize } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import closeButton from "../../assets/close-button.png";

export function SupportPage() {
    const css = useStyles();
    const history = useHistory();

    const [error, setError] = useState("");
    const [popup, setPopup] = useState(false);
    const messageRef = useRef<HTMLInputElement>();

    /*async function handleReportSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        //hitting the backend route of /loginUser with the body of necessary values
        try {
            const response = await fetch("/api/reportSubmission", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ massage: messageRef?.current?.value }),
            });
            //awaiting the response to comeback and turn it into readable json data
            //if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back
            if (data.isValid) {
                history.push("/dashboard");
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.log(err);
        }s
    }*/

    const handlePopupOpen = () => {

    }

    const handlePopupClose = () => {

    }

    return (
        <div className={css.container}>
            <img className={css.closeButton} src={closeButton} alt="Close button" onClick={() => history.goBack()}></img>

            <Typography className={css.pageTitle} variant="h5">Submit a ticket</Typography>

            <div>
                <Typography className={css.userInfo} variant="h5">Username:</Typography>
                <Typography className={css.userInfo} variant="h5">Message:</Typography>

                <form>
                    <TextareaAutosize className={css.textArea} minRows={15}></TextareaAutosize>
                    <Button className={css.submitReportButton} type="submit" variant="contained" color="primary" onClick={handlePopupOpen}>Submit</Button>
                </form>
            </div>

        </div >
    );
}
