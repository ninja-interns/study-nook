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
        fontSize: "13px",
    },
    username: {
        position: "absolute",
        margin: "25px",
        top: "0px",
        right: "0px",
        fontFamily: "arial",
        fontSize: "17px",
        textTransform: "uppercase",
    },
    levelBar: {
        position: "absolute",
        margin: "25px",
        top: "50px",
        right: "0px",
    },
    levelNumber: {
        float: "right",
        marginTop: "3px",
    }
});
