import React, { useState } from 'react';

function PanoItems(props){
    const [state, setState] = useState({
        imgChecked : false,
        imgStyle : 'none',
        imgColor : '#848484',
        imgBorder: '1px solid #aaa',
        bgmChecked : false,
        bgmStyle : 'none',
        bgmColor : '#848484',
        bgmBorder: '1px solid #aaa'
    })

    const changePanoImgInput = e => {
        let result = props.changePanoImgInput(e);
        if(result){
            setState({...state, imgChecked:true, imgStyle:'#36D7B7', imgColor:'white', imgBorder:'none'});
        }else{
            setState({...state, imgChecked:false, imgStyle:'none', imgColor:'#848484', imgBorder:'1px solid #aaa'});
        }
    }
    const changePanoBgmInput = e => {
        let result = props.changePanoBgmInput(e);
        if(result){
            setState({...state, bgmChecked:true, bgmStyle:'#36D7B7', bgmColor:'white', bgmBorder:'none'});
        }else{
            setState({...state, bgmChecked:false, bgmStyle:'none', bgmColor:'#848484', bgmBorder:'1px solid #aaa'});
        }
    }
    let imgTitle = '사진을 선택해주세요.';
    if(props.lang == 1) imgTitle = 'Please select a picture.';
    if(props.lang == 2) imgTitle = 'Vui lòng chọn một hình ảnh.';
    let imgTitle2 = '사진이 선택되었습니다.';
    if(props.lang == 1) imgTitle2 = 'The picture has been selected.';
    if(props.lang == 2) imgTitle2 = 'Hình ảnh đã được chọn.';
    let bgmTitle = '배경음악을 선택해주세요.';
    if(props.lang == 1) bgmTitle = 'Please select a background music.';
    if(props.lang == 2) bgmTitle = 'Vui lòng chọn nhạc nền.';
    let bgmTitle2 = '배경음악이 선택되었습니다.';
    if(props.lang == 1) bgmTitle2 = 'Background music has been selected.';
    if(props.lang == 2) bgmTitle2 = 'Nhạc nền đã được chọn.';
    return (
    <React.Fragment>
        <div className="write_panarama mt-20">
            <ul className="col_row">
                <li className="col_2">
                    <div className="write_input_wrap">
                        <div className="write_input_title">
                            {props.lang == 0 && '파노라마 사진 업로드 (선택)'}
                            {props.lang == 1 && 'Upload panoramic photo (optional)'}
                            {props.lang == 2 && 'Tải lên ảnh toàn cảnh (tùy chọn)'}
                        </div>
                        <div className="write_input input_default" >
                            <label id="pano_label" htmlFor="panorama" 
                                style={{border:state.imgBorder,borderRadius:"5px",padding:"10px 0px",cursor:"pointer",width:'100%',
                                    textAlign:"center",
                                    fontWeight:'bold',
                                    background:state.imgStyle,
                                    color:state.imgColor
                                }}>
                                { !state.imgChecked && imgTitle }
                                { state.imgChecked && imgTitle2 }
                            </label>
                            <input id="panorama"  type="file" name="panorama" placeholder="파노라마영상.video" style={{display:"none"}}  accept="image/*"
                                onChange={changePanoImgInput}
                            />
                        </div>
                    </div>
                </li>
                <li className="col_2">
                    <div className="write_input_wrap">
                            <div className="write_input_title">
                            {props.lang == 0 && '파노라마 음원 업로드 (선택)'}
                            {props.lang == 1 && 'Panoramic sound source upload (optional)'}
                            {props.lang == 2 && 'Tải lên nguồn âm thanh toàn cảnh (tùy chọn)'}
                            </div>
                        <div className="write_input input_default" >
                            <label id="bgm_label" htmlFor="bgm" style={{border:state.bgmBorder,borderRadius:"5px",padding:"10px 0px",
                            cursor:"pointer",
                            width:'100%',
                            fontWeight:'bold',
                            textAlign:"center",
                            background:state.bgmStyle,
                            color:state.bgmColor
                            }}>
                                { !state.bgmChecked && bgmTitle }
                                { state.bgmChecked && bgmTitle2 }
                            </label>
                            <input id="bgm" type="file" name="bgm" placeholder="파노라마음원.mp3" style={{display:'none'}} accept="audio/*"
                                onChange={changePanoBgmInput}
                            />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </React.Fragment>
    )
}
export default PanoItems;