import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
    container: {
        marginLeft: "50px",
        marginRight: "50px",
        alignContent: 'center',
        textAlign: 'center',
    },
    right: {
        alignSelf: 'center',
        marginLeft: "45px",
    },
    left: {
        alignSelf: 'center',

    },
    verticalCenter: {
        margin: '0',
        position: 'absolute',
        top: '50%'
    },
    buttonsClass: {
        position: "fixed",
        bottom: "70px",
        display: "flex",
        alignItems: 'center',
    },
    imageCss: {
        textAlign: 'center',
    }
});
