import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
        },
        content: {
            display: "flex",
            flex: "1 0 auto",
            // flexDirection: "column",
            alignItems: "center",
            width: "100%",
        },
        root: {
            display: "flex",
            height: "100%",
            width: "100%",
        },
        details: {
            display: "flex",
            flexDirection: "column",
        },
        controls: {
            display: "flex",
            alignItems: "center",
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
        formControl: {},
    }),
)
