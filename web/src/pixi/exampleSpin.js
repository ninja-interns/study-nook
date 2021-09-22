import * as PIXI from "pixi.js"
import ReactPixi from "@inlet/react-pixi"
import * as React from "react"
import { ReactDOM } from "react"

const ExampleSpin = () => {
	const { Sprite, render } = ReactPixi
	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

	const app = new PIXI.Application({ backgroundColor: 0x012b30 })
	document.body.appendChild(app.view)

	let rotation = 0

	const RotatingBunny = () => (
		<Sprite
			image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
			x={400}
			y={300}
			scale={[2 + Math.abs(2 * rotation), 2 + Math.abs(2 * rotation)]}
			rotation={rotation}
			anchor={[0.5, 0.5]}
		/>
	)

	const loop = (t) => {
		rotation += (Math.cos(t / 1000) || 0) * 0.1
		requestAnimationFrame(loop)

		// custom render components into PIXI Container
		render(<RotatingBunny />, app.stage)
	}
	loop()
}
export default ExampleSpin
