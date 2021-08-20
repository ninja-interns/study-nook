import { isAbsolute } from "path";


export function NookInterface() {
    const boxStyle = {
        width: 375,
        height: 440,
        display: "flex",
        flex: "auto",
        border: '1px solid black',
    }

    return (
        <div style={boxStyle}>
            Nook Interface
        </div>
    );
}