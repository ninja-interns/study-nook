<<<<<<< HEAD
import React from "react"
import { Home } from "../../components"

export function HomePage() {
	return (
		<div>
			<Home />
		</div>
	)
=======
import React from "react";
import { Home } from "../../components";
import { Fade } from "@material-ui/core";

export function HomePage() {
	return (
		<Fade in={true} timeout={1000}>
			<div>
				<Home />
			</div>
		</Fade>
	);
>>>>>>> d2b5e9b056b859125bc141a27c27ed87a2ea864c
}
