
import React from "react";
import { useState } from "react";
import { render } from "react-dom";
import { fileURLToPath } from "url";
import { useStyles } from "./profileStyle";

function Profile() {
    const style = useStyles();
    return (
        <div className={style.root}>
                    <h1>User Profile</h1>
                    <button className={style.startNookButton}>
                        Start Nooking
                    </button>
                    <input id="fileInput" type="file" accept="image/jpeg,image/png" style={{display: 'none'}}
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

export default Profile;