import defaultImage from '../../assets/default-profile.png'
import { Avatar, IconButton } from "@material-ui/core";
import { FunctionComponent, useRef, useState } from "react";
import { useStyles } from "./profileStyle";
import { ImageProfileState, IProps } from './IProfile';


export const ChangeProfileImage:FunctionComponent<{ initial?: string}> = ({initial = defaultImage}) => {
    const [imageFile,setImage] = useState(initial);
    return (
        <div>
            <input accept="image/png"  id="icon-button-file" type="file" style={{display: 'none'}} 
            onChange={async (e) =>  {
                console.log(e.target.value);
                setImage(e.target.value)}}
            />
        <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span" >
                <Avatar src={imageFile} />
            </IconButton>
        </label>
        </div>
    )
}


export function ChangeProfilePicture() {
    const style = useStyles();
    return (
        <div className={style.root}>
                    <h1>User Profile</h1>
                    <button className={style.startNookButton}>
                        Start Nooking
                    </button>
                    <input id="fileInput" type="image" accept="image/jpeg,image/png" style={{display: 'none'}}
                                onChange={(e) => 
                                    { 
                                        /* Check if file input is null, throws error if i don't check it*/
                                        if(e.target.files) {
                                            const imgFile = e.target.files[0];
                                            postImage(imgFile);
                                        } 
                                    } }/>
                    <button className={style.profileIconButton} 
                                onClick={() => 
                                    {
                                        document.getElementById('fileInput')?.click();
                                    } }>
                                        Upload Profile photo
                                    </button>
                </div>
    );
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

