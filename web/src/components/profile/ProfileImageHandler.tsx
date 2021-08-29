
import { useStyles } from "./profileStyle";

export function ChangeProfileImage() {
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

