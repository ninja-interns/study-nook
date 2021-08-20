import React from "react";
import { IProps } from "./ProfileInterface";

export class PlayerProfileSettings extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <button onClick={ (event) => {this.handleProfileOpen}}>Settings</button>
            </div>
        );
    }

    handleProfileOpen(event: any) {

    }
}
