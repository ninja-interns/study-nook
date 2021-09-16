import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        details: {
            display: "flex",
            flexDirection: "column",
        },
        content: {
            flex: "1 0 auto",
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
