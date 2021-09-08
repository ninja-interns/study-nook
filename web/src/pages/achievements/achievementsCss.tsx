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
        margin: "-70px",
        marginLeft: "-30px",
        background: "#F8F8F8",
        border: "1px solid black",
        color: "#717171",
        fontSize: "10px",
        height: "40px",
        width: "160px",
        letterSpacing: "1px",
        lineHeight: "20px",
        position: "absolute",
        textAlign: "left",
        textTransform: "uppercase",
        display: "none",
        padding: "3px",
        paddingLeft: "8px",
        paddingRight: "8px",
        pointerEvents: "none",
    },
    bar: {
        background: "#353b48",
        display: "block",
        height: "7px",
        border: "1px solid rgba(0,0,0, 0.3)",
        width: "140px",
        borderRadius: "10%",
        overflow: "hidden",
    },
    achievementLevel1: {

    },
    tracker: {
        float: "right",
    }
});
