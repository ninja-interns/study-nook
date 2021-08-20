/**Layout and Style for the Profile Page using Material UI**/
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { palette } from "@material-ui/system";

/** Haven't been touching up on this, finishing the 
 * main functionality of the profile page first**/
export const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.primary.main,
        },

        startNookButton: {
            
        },

        profileIconButton: {

        },


        profileBackground: {

        },

        levelBar: {

        },

        profileSettings: {
            width: '50px',
            height: '50px',
        },

        /**CSS Style for the modal view of the user profile setting/menu**/
        modal: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },

        
    }));

