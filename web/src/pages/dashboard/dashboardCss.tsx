import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({

    container: {
        width: "400px",
        height: "600px",
        position: "relative",
        border: "solid black",
    },
    menuButton: {
        position: "absolute",
        margin: "20px",
        bottom: "0px",
        right: "0px",
    },
    startNookingButton: {
        position: "absolute",
        margin: "20px",
        top: "0px",
        left: "0px",
    },
});
