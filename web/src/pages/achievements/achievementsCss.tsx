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
    badgeElement: {
        width: "50px",
        margin: "20px",
        marginBottom: "10px",
        cursor: "pointer",
        '&:hover': {
            "& ~ $textBox": {
                display: "block",
                position: "absolute",
            }
        }
    },
    badgeCaption: {
        textAlign: "center",
        marginRight: "5px",
        marginBottom: "20px",
        cursor: "pointer",
        '&:hover': {
            "& + $textBox": {
                display: "block",
            }
        }
    },
    textBox: {
        background: "#F8F8F8",
        border: "5px solid #DFDFDF",
        color: "#717171",
        fontSize: "13px",
        height: "40px",
        width: "310px",
        letterSpacing: "1px",
        lineHeight: "20px",
        position: "absolute",
        textAlign: "center",
        textTransform: "uppercase",
        display: "none",
        padding: "0 0px",
        overflow: "auto"
    }

});
