import React, { useEffect, useState } from 'react';
import { image_check } from '../../utils/file_check';
import { dataURLtoFile, ImageResize } from '../../utils/imageResize/ImageResize';
import { Sleep } from '../../utils/sleep/Sleep';

class ImagePreivew extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imgs : [],
            updateState : false,
        }
    }

    componentDidUpdate(){
        if(this.props.imgFiles[0]){
            if(this.props.imgFiles[0].path){
                if(!this.state.updateState){
                    let arr = [];
                    for(let file of this.props.imgFiles){
                        arr.push(`/media/${file.path}`);
                    }
                    this.setState({imgs:arr, updateState: true});
                }
            }
        }
    }

    //이미지 등록시
    async changeThumbnailInput(e){
        let result = image_check(e.target);
        if(result){
            
            let files = e.target.files;
            if(files.length > 5){
                let message = '사진은 5장 이하만 등록이 가능합니다.';
                if(this.props.lang == 1) message = 'Only 5 or fewer photos can be registered.';
                if(this.props.lang == 2) message = 'Chỉ có thể đăng ký từ 5 ảnh trở xuống.';
                this.props.setSnackbar({
                    type:'WARNING',
                    open:true, 
                    message:message,
                    time : 3000,
                });
                return false;
            }

            let message = '사진을 등록중입니다...';
            if(this.props.lang == 1) message = 'Registering photos...';
            if(this.props.lang == 2) message = 'Đang đăng ký ảnh ...';
            this.props.setSnackbar({
                type:'INFO',
                open:true, 
                message:message,
                time : 3000,
            });
            
            for(let i = 0; i< files.length; i++){
                let reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onloadend = async () => {
                    let {bitData, base64Data} = await ImageResize(reader.result, 500);
                    var resizeFile = dataURLtoFile(bitData, files[i].name);
                    this.props.appendImages(files[i]);
                    this.props.appendPreviewImages(resizeFile);
                    this.setState({imgs:this.state.imgs.concat(base64Data)});
                };
            }
            await Sleep(3500);
            
            let message2 = '사진 등록이 완료되었습니다!';
            if(this.props.lang == 1) message2 = 'Photo registration is complete!';
            if(this.props.lang == 2) message2 = 'Đăng ký ảnh đã hoàn tất!';
            this.props.setSnackbar({
                type:'SUCCESS',
                open:true, 
                message:message2,
                time : 3000,
            });
            
        }else {
            this.props.removeImage(0);
        }
    }

    deleteThumbnail(e){
        let message = '이미지를 다시 등록하시겠습니까?';
        if(this.props.lang == 1) message = 'Would you like to re-register the image?';
        if(this.props.lang == 2) message = 'Bạn có muốn đăng ký lại hình ảnh?';
        let result = confirm(message);
        if(result){
            this.setState({imgs:[]});
            this.props.removeImage(0);
        }
    }

    render(){
        return (
            <React.Fragment>
                {this.state.imgs.length == 0 ?
                    <div className="file_upload_thumnail">
                        <div className="upload_gallery_box spot_create_image_bigbox">
                            <div className="upload_box">
                                <div className="upload_box_input">
                                    <input 
                                    multiple="multiple" type='file' id="imgInp" name="imgs" readOnly 
                                    onChange={this.changeThumbnailInput.bind(this)} 
                                    accept="image/gif, image/jpeg, image/png"/>
                                </div>
                                <div className="upload_box_result on">
                                    <img className="spot_create_img" src="/static/img/upload_plus.png" alt="" />
                                </div>
                            </div>
                        
                            <div className="upload_box_close">
                                <a href=""><img className="i_24" src="/static/img/upload_close.png" alt=""/></a>
                            </div>
                        </div>
                    </div>:
                    <div className="imgs_preview_wrap_v2">
                        <div className="delete_button" onClick={this.deleteThumbnail.bind(this)}>
                            <i className="fas fa-trash-alt"></i>
                        </div>
                        <div className="thumbnail_img_box">
                            <img src={this.state.imgs[0]} />
                        </div>
                        <div className="img_box_wrap">
                            {this.state.imgs.map((e, index)=> {
                                if(index != 0){
                                    return(
                                        <div className="img_box" key={index}>
                                            <img className="m_img" src={e} />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}
export default ImagePreivew;
