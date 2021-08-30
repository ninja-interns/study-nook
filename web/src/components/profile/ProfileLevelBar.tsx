
import React from "react";
import {IProps, IProgressPercentage} from "./IProfile";
const Filler = (prop: any) => {
    return (<div className="filler" />);
}


/**Level bar doesn't work properly**/
const LevelBar = (props: any) => {
    return (
    <div className="progress-bar">
        <Filler percentage={props.percentage} />
    </div>
    )
}

export class PlayerProgressBar extends React.Component<IProps, IProgressPercentage> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            percentage: 0,
        }
    }

    render() {
        return (
            <div>
                <LevelBar percentage={this.state.percentage} />
            </div>
        );
    }
}
