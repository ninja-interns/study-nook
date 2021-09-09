import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({

    container: {
        width: "400px",
        height: "600px",
        position: "absolute",
        border: "solid black",
        overflowY: "scroll",
        '&::-webkit-scrollbar': {
            display: "none",
        },
    },
    closeButton: {
        width: "40px",
        position: "absolute",
        top: "0px",
        right: "0px",
        margin: "20px",
        cursor: "pointer",
    },
    badgesTable: {
        margin: "40px",
        marginTop: "80px",
        display: "grid",
        gridTemplateColumns: "auto auto auto",
    },
});
