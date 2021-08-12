import React from "react";
import { useStyles } from "./exampleCss";

export function Example() {
	const css = useStyles();
	return (
		<div className={css.container}>
			<h1>I'm an example:)</h1>
		</div>
	);
}
