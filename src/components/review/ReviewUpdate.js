import React, { useEffect, useState } from 'react';
import ImagePreivew from '../imagePreview/ImagePreview';
import MoveSwitch from '../moveSwitch/MoveSwitch';
import { Redirect } from 'react-router-dom';
import { reviewDelete, reviewUpdate, reviewDetail } from '../../apis/reviewApi/reviewApis';
import { avoidClickDom } from '../../utils/clickDom';

function ReviewCreate(props){
    const [state, setState] = useState({
        open : true,
        redirect : false, 
        complete : false,
        id : '',
        title : '',
        content : '',
        imgFiles : [],
        previewImgFiles : [],
        start : '',
        cost : 0,
        costType : 'KRW',
        moveType : 1,
        time : '',
        rate : 1,
        rateArr : [1,2,3,4,5],
        reviewCount : 0
    });
    useEffect(async ()=> {
        let id = location.pathname.split('/')[2];
        let result = await reviewDetail(id);
        console.log(result);

        setState({
            ...state, 
            id : result.review.pk,
            title : result.review.title,
            content : result.review.content,
            imgFiles : result.photo_list,
            previewImgFiles : [],
            start : result.review.start,
            cost : result.review.cost,
            costType : result.review.cost_type,
            moveType : result.review.move_type,
            time : result.review.time,
            rate : result.review.rate,
        })
    }, []);

    //이미치 추가
    const appendImages = (imgFile) => {
        setState({...state, imgFiles : state.imgFiles.concat(imgFile)});
        console.log(state.imgFiles);
    }
    const appendPreviewImages = (imgFile) =>{
        setState({...state, previewImgFiles : state.previewImgFiles.concat(imgFile)});
        console.log('리사이징 이미지 파일--------------------->');
        console.log(state.previewImgFiles);
    }
    const removeImage = () => {
        setState({...state, imgFiles : [], previewImgFiles : [] });
        console.log(state.imgFiles);
    }
    // 기본 택스트, 숫자를 작성하는 input 관련
    const changeInput = (e) => {
        let value = e.target.value;
        if(e.target.name == 'title') setState({...state, title : value});
        if(e.target.name == 'content') setState({...state, content : value});
        if(e.target.name == 'start') setState({...state, start : value});
        if(e.target.name == 'theme') setState({...state, theme : value});
        if(e.target.name == 'time') setState({...state, time : value});
        if(e.target.name == 'cost') setState({...state, cost : value});
        if(e.target.name == 'costType') setState({...state, costType : value});
    }
    const clickRate = (e) => {
        e.target.value;
        setState({...state, rate:+e.target.value});
    }
    const checkMoveType = (e) => {
        console.log(e.target);
        setState({...state, moveType : e.target.value});
        console.log(state.moveType);
    }
    const submitForm = async (e) =>{
        /**-------------유효성 검사------------- */
        if(state.imgFiles.length == 0){
            let message = '한장 이상의 사진을 등록해주세요.';
            if(props.lang == 1) message = 'Please register more than one photo.';
            if(props.lang == 2) message = 'Vui lòng đăng ký nhiều hơn một bức ảnh.';
            props.setSnackbar({
                type:'WARNING',
                open:true, 
                message: message,
                time : 2000,
            });
            return false;
        }
        avoidClickDom(e.target);

        setState({...state, open:false});

        let message = '리뷰를 수정중입니다..';
        if(props.lang == 1) message = 'Updating review..';
        if(props.lang == 2) message = 'Đang cập nhật bài đánh giá..';
        props.setSnackbar({
            type:'INFO',
            open:true, 
            message:message,
            time : 5000,
        });
        // window.scrollTo({top:0, left:0, behavior:'smooth'});
        props.isLoading(true);
        const formData = new FormData();
        formData.append('title', state.title);
        formData.append('content', state.content);
        
        for(let file of state.imgFiles){
            formData.append('imgs', file);
        }
        for(let file of state.previewImgFiles){
            formData.append('previews', file);
        }
        formData.append('start', state.start);
        formData.append('cost', state.cost);
        formData.append('costType', state.costType);
        formData.append('move_type', state.moveType);
        formData.append('time', state.time);
        formData.append('rate', state.rate);
        let data = await reviewUpdate(formData, state.id);
        props.isLoading(false);
        if(data.result){
            history.back();
        }else if(data.result == 'image_error'){
            let message = '한장 이상의 사진을 등록해주세요.';
            if(props.lang == 1) message = 'Please register more than one photo.';
            if(props.lang == 2) message = 'Vui lòng đăng ký nhiều hơn một bức ảnh.';
            props.setSnackbar({
                type:'WARNING',
                open:true, 
                message:message,
                time : 3000,
            });
        }else if(data.result == false){
            avoidClickDom(e.target);
            props.setSnackbar({
                type:'ERROR',
                open:true, 
                message:data.message,
                time : 3000,
            });
        }
        setState({...state, complete:true, imgFiles : [], previewImgFiles : []});
        let message2 = '리뷰가 수정되었습니다.';
        if(props.lang == 1) message2 = 'The review has been updated';
        if(props.lang == 2) message2 = 'Bài đánh giá đã được cập nhật';
        props.setSnackbar({
            type:'SUCCESS',
            open:true, 
            message: message2,
            time : 2000,
        });
    }

    //리뷰 삭제
    const deleteReview = async () =>{
        let result = await reviewDelete(state.id);
        history.back();
        let message = '리뷰가 삭제되었습니다.';
        if(props.lang == 1) message = 'The review has been deleted.';
        if(props.lang == 2) message = 'Bài đánh giá đã bị xóa.';
        props.setSnackbar({
            type:'SUCCESS',
            open:true, 
            message:message,
            time : 2000,
        });
    }

    if(state.redirect){
        return <Redirect to="/users/login" />
    }

    let startText = '여행 출발 주소 입력';
    let titleText = '제목을 입력하세요.';
    let contentText = '내용을 입력해주세요';
    let addrText = '여행 주소를 입력하세요';
    if(props.lang == 1) {
        startText = 'Enter your travel departure address';
        titleText = 'Please enter a title.';
        contentText = 'Please enter your details';
        addrText = 'Please enter your travel address';
    } else if(props.lang == 2){
        startText = 'Nhập địa chỉ khởi hành chuyến du lịch của bạn';
        titleText = 'Vui lòng nhập tiêu đề.';
        contentText = 'Vui lòng nhập thông tin chi tiết của bạn';
        addrText = 'Vui lòng nhập địa chỉ du lịch của bạn';
    }
    return(
    <React.Fragment>
        <div className="detail" style={{display:'flex',justifyContent:'space-between',marginBottom:'0px',marginTop:'20px'}}>
            <div style={{display:'flex',justifyContent:'center'}}>
                <button className="spot_detail_top_button top_button_back" onClick={
                    ()=> { history.back(); }
                }>
                    <span><i className="fas fa-arrow-circle-left"></i></span>
                    <span>
                    { props.lang == 0 && '뒤로가기'}
                    { props.lang == 1 && 'Go back'}
                    { props.lang == 2 && 'Quay lại'}
                    </span>
                </button>
            </div>
        </div>
        <div className="detail_review_write box_default">
        <div className="detail_review_write_inner">
            <div className="detail_review_write_top" style={{marginBottom:'20px'}}>
                <div className="detail_review_write_rating">
                    <div className="rating_box">
                        <span className="number">
                        { props.lang == 0 && '리뷰 수정'}
                        { props.lang == 1 && 'Edit Review'}
                        { props.lang == 2 && 'Chỉnh sửa đánh giá'}
                        </span>
                    </div>
                </div>
            </div>
            <div className={(state.open)?'open detail_review_write_bottom':'detail_review_write_bottom'}>
                <form className="spot_review_form">
                    <div className="file_upload_gallery">
                        <ImagePreivew 
                            imgFiles={state.imgFiles}
                            appendImages={appendImages}
                            appendPreviewImages={appendPreviewImages}
                            removeImage={removeImage}
                            setSnackbar={props.setSnackbar}
                        />
                    </div>
                    <div className="write">
                        <div className="write_travel_info">
                            <ul className="col_row">
                                <li className="col_2">
                                    <div className="write_input_wrap">
                                        <div className="write_input_title">
                                        {props.lang == 0 && '여행 출발 주소'}
                                        {props.lang == 1 && 'Travel departure address'}
                                        {props.lang == 2 && 'Địa chỉ khởi hành du lịch'}
                                        </div>
                                        <div className="write_input input_default"><input type="text" name="start" placeholder={startText}
                                        onChange={changeInput}
                                        value={state.start}
                                        /></div>
                                    </div>
                                </li>
                                <li className="col_1">
                                    <div className="write_input_wrap">
                                        <div className="write_input_title">
                                        {props.lang == 0 && '여행 경비'}
                                        {props.lang == 1 && 'Expense'}
                                        {props.lang == 2 && 'Chi phí đi lại'}
                                        </div>
                                        <div className="write_input input_default input_money">
                                            <div className="cost_input_wrap">
                                                <input type="number" name="cost" style={{border:'none',width:'100%',padding:"0px"}}
                                                value={state.cost}
                                                onChange={changeInput}
                                                />
                                                <select className="a-current-coin" name="costType"
                                                    onChange={changeInput}
                                                    value={state.costType}
                                                >
                                                    <option value="KRW">KRW</option>
                                                    <option value="USD">USD</option>
                                                    <option value="VND">VND</option>
                                                    <option value="EUR">EUR</option>
                                                    <option value="CNY">CNY</option>
                                                    <option value="JPY">JPY</option>
                                                    <option value="CAD">CAD</option>
                                                    <option value="AUD">AUD</option>
                                                    <option value="NZD">NZD</option>
                                                    <option value="TWD">TWD</option>
                                                    <option value="MXN">MXN</option>
                                                    <option value="CHF">CHF</option>
                                                    <option value="PHP">PHP</option>
                                                    <option value="THB">THB</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="col_1">
                                    <MoveSwitch 
                                        lang={props.lang}
                                        moveType={state.moveType}
                                        checkMoveType={checkMoveType}
                                    />
                                </li>
                                <li className="col_1">
                                    <div className="write_input_wrap">
                                        <div className="write_input_title">
                                        {props.lang == 0 && '여행 기간'}
                                        {props.lang == 1 && 'Travel period'}
                                        {props.lang == 2 && 'Thời gian du lịch'}
                                        </div>
                                        <div className="write_input input_default">
                                            <select name="time" value={state.time} 
                                            onChange={changeInput}>
                                                <option value="당일">
                                                {props.lang == 0 && '당일'}
                                                {props.lang == 1 && 'A day'}
                                                {props.lang == 2 && 'ngày'}
                                                </option>
                                                <option value="1박 2일">
                                                {props.lang == 0 && '1박 2일'}
                                                {props.lang == 1 && '2 days'}
                                                {props.lang == 2 && '1 đêm 2 ngày'}
                                                </option>
                                                <option value="2박 3일">
                                                {props.lang == 0 && '2박 3일'}
                                                {props.lang == 1 && '3 days'}
                                                {props.lang == 2 && '2 đêm 3 ngày'}
                                                </option>
                                                <option value="3박 4일">
                                                {props.lang == 0 && '3박 4일'}
                                                {props.lang == 1 && '4 days'}
                                                {props.lang == 2 && '4 ngày 3 đêm'}
                                                </option>
                                                <option value="일주일">
                                                {props.lang == 0 && '일주일'}
                                                {props.lang == 1 && 'A week'}
                                                {props.lang == 2 && 'một tuần'}
                                                </option>
                                                <option value="한달">
                                                {props.lang == 0 && '한달'}
                                                {props.lang == 1 && 'A month'}
                                                {props.lang == 2 && 'mot thang'}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="write_title mt-20">
                            <ul className="col_row">
                                <li className="col_3">
                                    <div className="write_input_wrap">
                                        <div className="write_input_title">
                                        {props.lang == 0 && '여행 제목'}
                                        {props.lang == 1 && 'Travel title'}
                                        {props.lang == 2 && 'Tiêu đề du lịch'}
                                        </div>
                                        <div className="write_input input_default">
                                            <input type="text" name="title" placeholder={titleText}
                                                value={state.title}
                                                onChange={changeInput}
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li className="col_1">
                                    <div className="write_input_wrap">
                                        <div className="write_input_title">
                                        {props.lang == 0 && '별점'}
                                        {props.lang == 1 && 'Star point'}
                                        {props.lang == 2 && 'Điểm sao'}  
                                        </div>
                                        <div className="box_line start_rate_box">
                                            <input type="radio" id="rate-5" name="rate" value="5" onClick={clickRate}
                                                defaultChecked={state.rate == 1 ? true : false }
                                                style={{display:'none'}}
                                            />
                                            <label htmlFor="rate-5">
                                                <i className="fas fa-star"></i>
                                            </label>
                                            <input type="radio" id="rate-4" name="rate" value="4" onClick={clickRate}
                                                defaultChecked={state.rate == 2 ? true : false }
                                                style={{display:'none'}}
                                            />
                                            <label htmlFor="rate-4">
                                                <i className="fas fa-star"></i>
                                            </label>

                                            <input type="radio" id="rate-3" name="rate" value="3" onClick={clickRate}
                                                defaultChecked={state.rate == 3 ? true : false }
                                                style={{display:'none'}}
                                            />
                                            <label htmlFor="rate-3">
                                                <i className="fas fa-star"></i>
                                            </label>

                                            <input type="radio" id="rate-2" name="rate" value="2" onClick={clickRate}
                                                defaultChecked={state.rate == 4 ? true : false }
                                                style={{display:'none'}}
                                            />
                                            <label htmlFor="rate-2">
                                                <i className="fas fa-star"></i>
                                            </label>

                                            <input type="radio" id="rate-1" name="rate" value="1" onClick={clickRate}
                                                defaultChecked={state.rate == 5 ? true : false }
                                                style={{display:'none'}}
                                            />
                                            <label htmlFor="rate-1">
                                                <i className="fas fa-star"></i>
                                            </label>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="write_desc" style={{marginTop:'35px'}}>
                            <div className="write_textarea_wrap">
                                <div className="write_textarea_title">
                                {props.lang == 0 && '리뷰 설명'}
                                {props.lang == 1 && 'Review description'}
                                {props.lang == 2 && 'Xem lại mô tả'}  
                                </div>
                                <div className="textarea_default">
                                    <textarea name="content" id="" placeholder={contentText}
                                        value={state.content}
                                        onChange={changeInput}
                                    ></textarea>
                                    
                                </div>
                            </div>
                        </div>
                            
                        
                        <div className="submit mt-20">
                            <div className="submit_inner">
                                <div className="cancel_box mr-10 point" onClick={
                                    ()=>{
                                        let text = '게시물을 삭제하시겠습니까?';
                                        if(props.lang == 1) text = 'Are you sure you want to delete the post?';
                                        if(props.lang == 2) text = 'Bạn có chắc chắn muốn xóa bài viết không?';
                                        let result = confirm(text);
                                        if(!result) return false;
                                        deleteReview();
                                    }
                                }>
                                    <a>
                                    {props.lang == 0 && '리뷰 삭제'}
                                    {props.lang == 1 && 'Delete review'}
                                    {props.lang == 2 && 'Xóa bài đánh giá'}  
                                    </a>
                                </div>
                                <div className="cancel_box mr-10 point" 
                                    onClick={()=> history.back()} 
                                >
                                    <a>
                                    {props.lang == 0 && '취소'}
                                    {props.lang == 1 && 'cancel'}
                                    {props.lang == 2 && 'hủy bỏ'}  
                                    </a>
                                </div>
                                <button type="button" className="submit_box" style={{border:"none",display:"flex",justifyContent:"center",alignItems:"center",
                                    color:"white",cursor:"pointer"}}
                                    onClick={submitForm}
                                >
                                    <span>
                                    {props.lang == 0 && '수정'}
                                    {props.lang == 1 && 'Modify'}
                                    {props.lang == 2 && 'Sửa đổi'}
                                    </span>
                                    <img className="i_18 i_submit ml-10"src="/static/img/submit.png" alt="submit" />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </React.Fragment>
    )
}
export default ReviewCreate;