import { useState, useRef } from "react";
import { Fade, Button, TextField } from "@material-ui/core";
import { useHistory, Route, Redirect } from "react-router-dom";

import { useStyles } from "../expTesting/expTestingCss";

interface IData {
    level: string;
}

export function EXPTesting() {
    const css = useStyles();
    const history = useHistory();
    const [redirect, setRedirect] = useState<string | null>(null);
    const expRef = useRef<HTMLInputElement>();
    const [level, setLevel] = useState<string | null>(null);
    const [exp, setExp] = useState();

    async function fetchData() {
        try {
            const response = await fetch("/api/calculate_exp", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ experience: exp }),
            });
            //awaiting the response to comeback and turn it into readable json data
            //if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back
            const data: IData = await response.json()
            if (response.ok) {
                console.log(level);
                setLevel(data.level);
                console.log(level);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleEXP = (e: React.ChangeEvent<any>) => {
        setExp(e.target.value);
    };

    return (
        <>
            <Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
            <Fade in={true} timeout={1000}>
                <div className={css.container}>
                    <Fade in={true} timeout={2000}>
                        <div>
                            <TextField className={css.input} required label="EXP to calculate" type="text" onChange={handleEXP} />
                            <h3 className={css.text}>You are level: {level}</h3>
                            <Button className={css.ButtonSubmit} variant="contained" color="primary" onClick={fetchData}>Submit</Button>
                        </div>
                    </Fade>
                </div>
            </Fade>
        </>
    );
}
