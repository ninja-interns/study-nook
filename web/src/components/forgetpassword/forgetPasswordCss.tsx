import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: "50px",
        marginLeft: "50px",
    },
    verticalCenter: {
        width: "200px",
        height: "200px",
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        margin: "auto",
    },
    recoverButton: {
        marginTop: "30px",
    }

});
