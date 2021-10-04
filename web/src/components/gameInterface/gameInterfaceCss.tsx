import { makeStyles } from "@material-ui/styles";
import background from "../../assets/Bedrooms/gaming-room.jpg";

export const useStyles = makeStyles({

    container: {
        width: "400px",
        height: "600px",
        position: "absolute",
        border: "solid black",
    },
    svgBox: {
        width: "350px",
        height: "200px",
        border: "solid black",
        position: "absolute",
        bottom: "100px",
        margin: "20px",
        borderWidth: "1px",
        backgroundImage: `url(${background})`,
        backgroundSize: "350px 200px",

        display: "block",
    },
    svgCharacter: {
        width: "80",
        height: "120",
        position: "relative",
        display: "block",
        left: "120px",
        top: "70px",
        bottom: "0px",

    },



});
