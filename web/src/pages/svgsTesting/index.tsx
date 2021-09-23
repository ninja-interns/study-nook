import { useState } from "react";
import { Fade } from "@material-ui/core";
import { useHistory, Route, Redirect } from "react-router-dom";

import { useStyles } from "./svgTestingCss";
import { ReactComponent as Character } from "../../assets/gee_me_001.svg";

export function SVGSTesting() {
    const css = useStyles();
    const history = useHistory();
    const [redirect, setRedirect] = useState<string | null>(null);

    return (
        <>
            <Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
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
