import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TagCreater from '../../components/tagCreater/TagCreater';
import ImagePreviewV2 from '../../components/imagePreviewV2';
import Footage from '../../components/footagePreview';
import { validationInput } from '../../utils/InputValitaion';
import { create, show, update, _delete } from '../../apis/footageApi';
import { Redirect } from 'react-router';

export default function FootageUpdate (props) {
    const [redirect, setRedirect] = useState(false);
    
    const [thumbnail, setThumbnail] = useState({
        origin : null,
        resize : null,
        preview : null 
    });
    const [footage, setFootage] = useState({
        file : null,
        preview : null
    });

    const [title , setTitle] = useState("");
    const [content, setContent] = useState("");
    const [addr , setAddr] = useState("");
    const changeInput = e => {
        const value = e.target.value;
        const name = e.target.name;
        console.log(`value : ${value} , name : ${name}`);
        if(name === 'title') setTitle(value);
        else if(name === 'content') setContent(value);
        else if(name === 'addr') setAddr(value);
    } 

    const [tags, setTags] = useState([]);
    const addTagList = tag =>{
        let result = true;
        tags.map(e => {
            if(e == tag){
                let message = '중복되는 태그입니다.';
                if(props.lang == 1) message = 'This is a duplicate tag.';
                if(props.lang == 2) message = 'Đây là một thẻ trùng lặp.';
                props.setSnackbar({
                    type:'WARNING',
                    open:true, 
                    message: message,
                    time : 2000,
                });
                result = false;
                return;
            }
        });
        if(result !== false){
            setTags(tags.concat(tag));
        }
        console.log(tags);
    }
    const removeTag = tag => {
        console.log(`삭제할 태그 : ${tag}`);
        const filterTags = tags.filter(e => {
            if(e != tag){
                return e;
            }
        });
        setTags([].concat(filterTags))
        console.log(tags);
    }

    const [isPrivate, setIsPrevate] = useState(false);

    useEffect( async ()=> {
        const res = await show(`/api/footages/${location.pathname.split('/')[2]}/`);
        const footage = res.result.footage;
        const _tags = res.result.tags;
        console.log(footage);
        console.log(_tags);
        setThumbnail({...thumbnail, preview : '/media/'+footage.thumbnail})
        setTitle(footage.title);
        setContent(footage.content);
        setAddr(footage.addr);
        setIsPrevate(footage.is_private === 0 ? false : true);
        const _tags_temp = [];
        for(let tag of _tags){
            console.log(tag);
            _tags_temp.push(tag.name);
        }
        setTags(_tags_temp);
    }, []);

    const onSubmit = async ( ) => {
        //유효성 검사
        let result = validationInput(thumbnail.preview, (message="썸네일 이미지를 등록해주세요.") => {
            if(props.lang == 1) message = 'Please register a thumbnail image';
            if(props.lang == 2) message = 'Vui lòng đăng ký một hình ảnh thu nhỏ';
            props.setSnackbar({type:'WARNING', open:true, message: message, time : 2000,});
        });
        if(!result) return;
        result = validationInput(title, (message="제목을 입력해주세요.") => {
            if(props.lang == 1) message = 'Please enter the subject.';
            if(props.lang == 2) message = 'Vui lòng nhập chủ đề.';
            props.setSnackbar({type:'WARNING', open:true, message: message, time : 2000,});
        });
        if(!result) return;
        result = validationInput(content, (message="내용을 입력해주세요.") => {
            if(props.lang == 1) message = 'Please enter your details.';
            if(props.lang == 2) message = 'Vui lòng nhập thông tin chi tiết của bạn.';
            props.setSnackbar({type:'WARNING', open:true, message: message, time : 2000,});
        });
        if(!result) return;
        result = validationInput(addr, (message="여행지 주소를 입력해주세요.") => {
            if(props.lang == 1) message = 'Please enter your travel address.';
            if(props.lang == 2) message = 'Vui lòng nhập địa chỉ du lịch của bạn.';
            props.setSnackbar({type:'WARNING', open:true, message: message, time : 2000,});
        });
        if(!result) return;

        props.isLoading(true);

        let message = '여행클립을 등록중입니다.';
        if(props.lang == 1) message = 'footage is being registered.';
        if(props.lang == 2) message = 'footage đang được đăng ký.';
        props.setSnackbar({
            type:'INFO',
            open:true, 
            message: message,
            result : true,
            time : 5000,
        });

        //폼데이터 생성
        console.log(title, content, addr);
        const formData = new FormData();
        formData.append('thumbnail', thumbnail.origin);
        formData.append('thumbnail_preview', thumbnail.resize);
        formData.append('footage', footage.file);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('addr', addr);
        formData.append('isPrivate', isPrivate);
        tags.map(tag => {
            formData.append('tags', tag);
        })
        const res = await update(`/api/footages/${location.pathname.split('/')[2]}/update/`, formData);

        props.isLoading(false);
        
        if(res.status === 200) {
            let message = '여행클립이 등록되었습니다.';
            if(props.lang == 1) message = 'The footage has been registered.';
            if(props.lang == 2) message = 'Vị trí đã được đăng ký.';
            props.setSnackbar({
                type:'SUCCESS',
                open:true, 
                message: message,
                result : true,
                time : 2000,
            });
            setRedirect(true);
        }
    }

    
    if(redirect){
        return <Redirect to={`/tripo-clips/${location.pathname.split('/')[2]}`} />
    }

    let titleText = '제목을 입력하세요.';
    let contentText = '내용을 입력해주세요';
    let addrText = '여행 주소를 입력하세요';
    if(props.lang == 1) {
        titleText = 'Title of your video clip';
        contentText = 'Content of your video clip';
        addrText = 'Address of your travel destination';
    } else if(props.lang == 2){
        titleText = 'Vui lòng nhập tiêu đề.';
        contentText = 'Vui lòng nhập thông tin chi tiết của bạn';
        addrText = 'Vui lòng nhập địa chỉ du lịch của bạn';
    }
    return (
        <div className="tripo-clip-container">
            
            <div className="tripo-clip-create-wrap">
                {/* <div className="top-buttons-wrap">
                    <button className="spot_detail_top_button top_button_back" onClick={
                        ()=> { history.back(); }
                    }>
                        <i className="fas fa-arrow-circle-left"></i>
                        { props.lang == 0 && '뒤로가기'}
                        { props.lang == 1 && 'Back'}
                        { props.lang == 2 && 'Quay lại'}
                    </button>
                </div> */}
                <h2>
                    { props.lang == 0 && '여행클립 수정'}
                    { props.lang == 1 && 'Edit TripClip'}
                    { props.lang == 2 && 'Chỉnh sửa clip du lịch'}
                </h2>

                <div className="upload-wrap">
                    <ImagePreviewV2
                        thumbnail={thumbnail.preview}
                        setThumbnail={ (result)=> setThumbnail({...result}) }
                        setSnackbar={props.setSnackbar}
                        lang={props.lang}
                        update
                    />
                    {/* <Footage
                        footage={footage.preview}
                        setFootage={ (result) => setFootage({...result}) }
                        setSnackbar={props.setSnackbar}
                        lang={props.lang}
                    /> */}
                </div>
                
                <div className="title-wrap">
                    <h4>
                    { props.lang == 0 && '여행 제목'}
                    { props.lang == 1 && 'Tripclip title'}
                    { props.lang == 2 && 'Tiêu đề du lịch'}
                    </h4>
                    <input
                        name="title" 
                        placeholder={titleText}
                        onChange={changeInput}
                        value={title}
                    />
                </div>
                <div className="content-wrap">
                    <h4>
                        { props.lang == 0 && '여행 내용'}
                        { props.lang == 1 && 'Trip content'}
                        { props.lang == 2 && 'Nội dung du lịch'}
                    </h4>
                    <textarea
                        name="content" 
                        placeholder={contentText}
                        onChange={changeInput}
                        value={content}
                    ></textarea>
                </div>
                <div className="title-wrap">
                    <h4>
                        { props.lang == 0 && '여행지 주소'}
                        { props.lang == 1 && 'Trip adress'}
                        { props.lang == 2 && 'Địa chỉ đích'}
                    </h4>
                    <input
                        name="addr" 
                        placeholder={addrText}
                        onChange={changeInput}
                        value={addr}
                    />
                </div>
                <div className="tag-wrap">
                    <h4>
                        { props.lang == 0 && '여행 태그'}
                        { props.lang == 1 && 'Trip tag'}
                        { props.lang == 2 && 'Thẻ du lịch'}
                    </h4>
                    <TagCreater 
                        lang={props.lang}
                        tags={tags}
                        addTagList={addTagList}
                        removeTag={removeTag}
                        setSnackbar={props.setSnackbar}
                    />
                </div>
                <div className="setting-wrap">
                    <h4>
                        { props.lang == 0 && '공개 설정'}
                        { props.lang == 1 && 'Privacy settings'}
                        { props.lang == 2 && 'Những thiết lập riêng tư'}
                    </h4>
                    <label className="form_input" htmlFor="" style={{
                        width:'100%',
                        display:'flex',
                        justifyContent :'flex-start',
                        marginTop:'10px'
                    }}>
                        <div className="form_input_checkbox" style={{
                            display:'flex',
                        }}>
                            <label htmlFor="public" className="check_box"  style={{
                                width:'auto',
                                marginRight:'20px'
                            }}>
                                <span >
                                { props.lang == 0 && '공개'}
                                { props.lang == 1 && 'Public'}
                                { props.lang == 2 && 'Đàn ông'}
                                </span>
                                <input id="public" type="radio" name="public" defaultValue="public" 
                                    checked={isPrivate === false ? true : false}
                                    onChange={ () => { setIsPrevate(false) } }
                                />
                                <span className="check_icon" ></span>
                            </label>
                            <label htmlFor="private"  className="check_box" style={{
                                width:'auto'
                            }}>
                                <span>
                                { props.lang == 0 && '비공개'}
                                { props.lang == 1 && 'Private'}
                                { props.lang == 2 && 'Đàn bà'}
                                </span>
                                <input id="private" type="radio" name="private" defaultValue="private" 
                                    checked={isPrivate === true ? true : false}
                                    onChange={ () => { setIsPrevate(true) } }
                                />
                                <span className="check_icon"></span>
                            </label>
                        </div>
                    </label>
                </div>
                
                <div className="bottom-buttons-wrap">
                    <Button
                        style={{padding:'9px 20px',marginRight:'10px'}}
                        variant="contained"
                        color="default"
                        onClick={
                            ()=>{
                                let text = '게시물을 삭제하시겠습니까?';
                                if(props.lang == 1) text = 'Are you sure you want to delete the post?';
                                if(props.lang == 2) text = 'Bạn có chắc chắn muốn xóa bài viết không?';
                                let result = confirm(text);
                                if(!result) return false;
                                _delete(`/api/footages/${location.pathname.split('/')[2]}/delete/`);
                            }
                        }
                    >
                    { props.lang == 0 && '삭제'}
                    { props.lang == 1 && 'delete'}
                    { props.lang == 2 && 'xóa bỏ'}
                    </Button>
                    <Button
                        style={{padding:'9px 20px',marginRight:'10px'}}
                        variant="contained"
                        color="default"
                        onClick={
                            ()=> { history.back(); }
                        }
                    >
                    { props.lang == 0 && '취소'}
                    { props.lang == 1 && 'cancel'}
                    { props.lang == 2 && 'hủy bỏ'}
                    </Button>
                    <Button
                        style={{padding:'10px 20px'}}
                        variant="contained"
                        color="primary"
                        //className={classes.button}
                        startIcon={<CloudUploadIcon />}
                        onClick={onSubmit}
                    >
                    { props.lang == 0 && '업로드'}
                    { props.lang == 1 && 'upload'}
                    { props.lang == 2 && 'tải lên'}
                    </Button>
                </div>
            </div>
        </div>
    )
}