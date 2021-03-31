import React, { useState } from 'react';
import { dataURLtoFile, ImageResize } from '../../utils/imageResize/ImageResize';

function ImagePreviewV2 ({ thumbnail, setThumbnail, setSnackbar, lang, update }) {


    const changeThumbnailInput = e => {
        let message = '사진을 등록중입니다...';
        if(lang == 1) message = 'Registering photos...';
        if(lang == 2) message = 'Đang đăng ký ảnh ...';
        setSnackbar({
            type:'INFO',
            open:true, 
            message:message,
            time : 3000,
        });
        const thumbnailFile = e.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(thumbnailFile);
        reader.onloadend = async () => {
            let {bitData, base64Data} = await ImageResize(reader.result, 500);
            var resizeFile = dataURLtoFile(bitData, thumbnailFile.name);
            console.log(thumbnailFile);
            console.log(resizeFile);
            setThumbnail({
                origin : thumbnailFile,
                resize : resizeFile,
                preview: base64Data
            })
            let message2 = '사진 등록이 완료되었습니다!';
            if(lang == 1) message2 = 'Photo registration is complete!';
            if(lang == 2) message2 = 'Đăng ký ảnh đã hoàn tất!';
            setSnackbar({
                type:'SUCCESS',
                open:true, 
                message:message2,
                time : 3000,
            });
        };
    }

    const deleteThumbnail = ( ) => {
        let message = '이미지를 다시 등록하시겠습니까?';
        if(lang == 1) message = 'Would you like to re-register the image?';
        if(lang == 2) message = 'Bạn có muốn đăng ký lại hình ảnh?';
        let result = confirm(message);
        if(result){
            document.querySelector('#thumbnail-upload-input').value = "";
            setThumbnail({
                origin : null,
                resize : null,
                preview: null
            });
        }
    }

    return (
    <React.Fragment>
        {
            thumbnail === null ?
            <label className="thumbnail-upload-wrap" htmlFor="thumbnail-upload-input"
                style={ update && {
                    minWidth:'100%'
                }}
            >
                <i className="fas fa-image"></i>
                <span>
                { lang == 0 && '미리보기 사진 선택'}
                { lang == 1 && 'Choose a thumbnail photo'}
                { lang == 2 && 'Chọn một ảnh thu nhỏ'}
                </span>
            </label>:
            <div className="thumbnail-upload-wrap">
                <div className="delete_button" onClick={deleteThumbnail}>
                    <i className="fas fa-trash-alt"></i>
                </div>
                <img src={thumbnail} alt="preview"/> 
            </div>
            
        }
        <input 
            id="thumbnail-upload-input" 
            type="file" 
            onChange={changeThumbnailInput}
        />
    </React.Fragment>
    )
}
export default ImagePreviewV2;