import { makeStyles } from "@material-ui/styles";
import background from "../../assets/Bedrooms/Purple-Bedroom/Purple-bedroom.jpg";

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
    },



});
