import { Fade } from "@material-ui/core";

import { useStyles } from "./gameInterfaceCss";
import { ReactComponent as Character } from "../../assets/Avatars/gee_me_007.svg";

export function GameInterface() {
    const css = useStyles();

    return (
        <>
            <Fade in={true} timeout={1000}>
                <div className={css.container}>
                    <div className={css.svgBox}>
                        <Character className={css.svgCharacter} />
                    </div>
                </div>
            </Fade>
        </>
    );
}
