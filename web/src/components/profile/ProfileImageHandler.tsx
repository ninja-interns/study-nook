import defaultImage from '../../assets/default-profile.png'
import { Avatar, IconButton } from "@material-ui/core";
import { FunctionComponent, useRef, useState } from "react";
import { useStyles } from "./profileStyle";
import { ImageProfileState, IProps } from './IProfile';
import { read } from 'fs';


export const ChangeProfileImage:FunctionComponent<{ initial?: string}> = ({initial = defaultImage}) => {
    const [imageFile,setImage] = useState(initial);
    return (
        <div>
            <input accept="image/png"  id="icon-button-file" type="file" style={{display: 'none'}} 
            onChange={async (e) =>  {
                console.log(e.target.value);
                if(e.target.files) {
                    setImage(e.target.value);
                    const img = new Image();
                    img.src = URL.createObjectURL(e.target.value);
                    document.getElementById("avatar")?.setAttribute("src", img.src);
                }
                }}
            />
            <label htmlFor="icon-button-file">
                <IconButton  color="primary" aria-label="upload picture" component="span" >
                    <Avatar id="avatar" src={imageFile} />
                </IconButton>
            </label>
        </div>
    )
}




async function postImage(imgFile: any) {
    const fileExt = imgFile.split('.').pop();
    const imgBlob = imgFile.toBlob();
    const formData = new FormData();
    const file = imgFile;
    formData.append('file', file);
    fetch('/api/image-upload/', {
        method: 'POST',
        body: formData
        }).then((value) => {
            console.log(value);
        // expected output: "Success!"
    });
}

