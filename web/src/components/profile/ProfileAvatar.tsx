import { profile } from 'console'
import { useState } from 'react';
import defaultImage from '../../assets/default-profile.png'
import { IProps } from './ProfileInterface';

export function ProfileAvatarViewer() {
    const circleStyle  = {
        cx: "50",
        cy: "50",
        r: "50",
        stroke: "#F0CE01",
        strokeWidth: "2"
    }
    const imgStyle = {
        borderRadius: "50%",
        width: 50,
        height: 50,
        display: "block"
    }
    return (
        <div>
            <circle style={circleStyle}>
                <img src={defaultImage}  style={imgStyle}/>
            </circle>
        </div>
    );
}
