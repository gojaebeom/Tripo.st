import React from 'react'; 

function Footage ({ footage, setFootage, setSnackbar, lang }) {

    const changeFootageInput = e => {
        const footageFile = e.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(footageFile);
        reader.onloadend = async () => {
            setFootage({
                file : footageFile,
                preview: reader.result
            })
        };
    }

    const deleteFootage = ( ) => {
        let message = '동영상을 다시 등록하시겠습니까?';
        if(lang == 1) message = 'Would you like to re-register the footage?';
        if(lang == 2) message = 'Bạn có muốn đăng ký lại hình ảnh?';
        let result = confirm(message);
        if(result){
            document.querySelector('#video-upload-input').value = "";
            setFootage({
                file : null,
                preview: null
            })
        }
    }

    return (
        <React.Fragment>
            {
                footage === null ?
                <label className="video-upload-wrap" htmlFor="video-upload-input">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <span>
                    { lang == 0 && '업로드할 동영상 선택'}
                    { lang == 1 && 'Choose a video'}
                    { lang == 2 && 'Lựa chọn video'}
                    </span>
                </label> :
                <div className="video-upload-wrap">
                    <div className="delete_button" onClick={deleteFootage}>
                        <i className="fas fa-trash-alt"></i>
                    </div>
                    <video controls width="100%" style={{
                        borderRadius:'5px'
                    }}>
                        <source src={footage} type="video/webm"/>
                        <source src={footage} type="video/mp4"/>
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                </div>
                
            }
            
            <input id="video-upload-input" type="file" 
                onChange={changeFootageInput}
            />
        </React.Fragment>
    )
}

export default Footage;