import React from "react";
import { useStyles } from "./homeCss";

export function Home() {
    const css = useStyles();
    return (
        <div className={css.container}>
            <h2 className="appTitle">Study Hook</h2>
        </div>
    );
}
