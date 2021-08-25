import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({

    container: {
        width: "400px",
        height: "600px",
        position: "absolute",
        border: "solid black",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",

        margin: "auto",
    },
    closeButton: {
        width: "40px",
        position: "absolute",
        top: "0px",
        right: "0px",
        margin: "20px",
        cursor: "pointer",
    },
    pageTitle: {
        margin: "20px",
        fontSize: "30px",
    },
    userInfo: {
        margin: "20px",
        marginTop: "40px",
    },
    submitReportButton: {
        margin: "0 auto",
        display: "block",
        marginTop: "40px",
    },
    textArea: {
        marginLeft: "20px",
        width: "360px",
    },
});
