import React, { useState } from 'react';
import ImagePreivew from '../imagePreview/ImagePreview';
import MoveSwitch from '../moveSwitch/MoveSwitch';
import { loginCheck } from '../../utils/loginCheck';
import { Redirect } from 'react-router-dom';
import { reviewCreate } from '../../apis/reviewApi/reviewApis';
import { avoidClickDom } from '../../utils/clickDom';

function ReviewCreate(props){
    const [state, setState] = useState({
        open : false,
        redirect : false, 
        title : '제목',
        content : '내용',
        imgFiles : [],
        previewImgFiles : [],
        start : '없음',
        cost : 0,
        costType : 'KRW',
        moveType : 1,
        time : '당일',
        rate : 1,
        tags : [],
        rateArr : [1,2,3,4,5],
        reviewCount : 0
    });
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
    const clickReviewOpen = () => {
        let { login, move } = loginCheck();
        if(move){
            setState({...state, redirect : true});
        }
        if(login){
            setState({...state, open:!state.open});
        }
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

        let message = '리뷰를 등록중입니다..';
        if(props.lang == 1) message = 'registering a review..';
        if(props.lang == 2) message = 'Bạn đang đăng ký một bài đánh giá ..';
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
        let data = await reviewCreate(formData, props.spotId);
        props.isLoading(false);
        if(data.result){
            props.getSpotDetailApi(props.spotId);

            let message = '리뷰가 등록되었습니다.';
            if(props.lang == 1) message = 'Your review has been registered.';
            if(props.lang == 2) message = 'Đánh giá của bạn đã được đăng ký.';
            props.setSnackbar({
                type:'SUCCESS',
                open:true, 
                message:message,
                time : 2000,
            });
        }else if(data.result == 'image_error'){
            let message = '한장 이상의 사진을 등록해주세요.';
            if(props.lang == 1) message = 'Please register more than one photo.';
            if(props.lang == 2) message = 'Vui lòng đăng ký nhiều hơn một bức ảnh.';
            props.setSnackbar({
                type:'WARNING',
                open:true, 
                message: message,
                time : 2000,
            });
        }else if(data.result == 'error'){
            console.log(e.target);
            avoidClickDom(e.target);
            alert('500 error');
        }
        setState({...state, open:false,  imgFiles : [], previewImgFiles : []});
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
        {(!state.open)?
        <div className="detail_review_write_inner" style={{height:"86px"}}>
            <div className="detail_review_write_top">
                <div className="detail_review_write_rating">
                    <div className="rating_box">
                        <span className="number">
                            {(props.reviewRateTotal)?
                                Math.round(props.reviewRateTotal/props.reviewCount)+'.0':
                                0.0
                            }
                        </span>
                        <span className="star">
                            <ul>
                                {state.rateArr.map((e, index)=>{
                                    if(Math.round(props.reviewRateTotal/props.reviewCount) >= index+1){
                                        return <li key={index}><img className="i_14" src="/static/img/rating_on.png" alt="rating_on"/></li> 
                                    }else{
                                        return <li key={index}><img className="i_14" src="/static/img/rating_off.png" alt="rating_off"/></li>
                                    }
                                })}
                            </ul>
                            <span className="star_desc">{props.reviewCount}
                            {props.lang == 0 && '개의 후기'}
                            {props.lang == 1 && 'review'}
                            {props.lang == 2 && 'bài đánh giá'}
                            </span>
                        </span>
                    </div>
                </div>
                <div className="detail_review_write_open">
                    <div className="open_box point" onClick={clickReviewOpen}>
                        <span>
                        {props.lang == 0 && '리뷰 등록'}
                        {props.lang == 1 && 'Post a review'}
                        {props.lang == 2 && 'Đăng ký đánh giá'}
                        </span>
                        <img className="i_18 i_edit ml-10" src="/static/img/edit.png" alt="edit"/>
                    </div>
                </div>
            </div>
        </div> :
        <div className="detail_review_write_inner">
            <div className="detail_review_write_top" style={{marginBottom:'20px'}}>
                <div className="detail_review_write_rating">
                    <div className="rating_box">
                        <span className="number">
                            {(props.reviewRateTotal)?
                                Math.round(props.reviewRateTotal/props.reviewCount)+'.0':
                                0.0
                            }
                        </span>
                        <span className="star">
                            <ul>
                                {state.rateArr.map((e, index)=>{
                                    if(Math.round(props.reviewRateTotal/props.reviewCount) >= index+1){
                                        return <li key={index}><img className="i_14" src="/static/img/rating_on.png" alt="rating_on"/></li> 
                                    }else{
                                        return <li key={index}><img className="i_14" src="/static/img/rating_off.png" alt="rating_off"/></li>
                                    }
                                })}
                            </ul>
                            <span className="star_desc">{props.reviewCount}
                            {props.lang == 0 && '개의 후기'}
                            {props.lang == 1 && 'review'}
                            {props.lang == 2 && 'bài đánh giá'}
                            </span>
                        </span>
                    </div>
                </div>
                <div className="detail_review_write_open">
                        <div className="open_box point" onClick={clickReviewOpen}>
                            <span>
                            {props.lang == 0 && '리뷰 등록'}
                            {props.lang == 1 && 'Post a review'}
                            {props.lang == 2 && 'Đăng ký đánh giá'}
                            </span>
                            <img className="i_18 i_edit ml-10" src="/static/img/edit.png" alt="edit"/>
                        </div>
                </div>
            </div>
            <div className={(state.open)?'open detail_review_write_bottom':'detail_review_write_bottom'}>
                <form className="spot_review_form">
                    <div className="file_upload_gallery">
                        <ImagePreivew 
                            lang={props.lang}
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
                                                onChange={changeInput}
                                                />
                                                <select className="a-current-coin" name="costType"
                                                    onChange={changeInput}
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
                                            <select name="time" defaultValue={'당일'} 
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
                            <ul className="col_row" style={{listStyle:"none"}}>
                                <li className="col_3">
                                    <div className="write_input_wrap">
                                        <div className="write_input_title">
                                        {props.lang == 0 && '여행 제목'}
                                        {props.lang == 1 && 'Title of your review'}
                                        {props.lang == 2 && 'Tiêu đề du lịch'}
                                        </div>
                                        <div className="write_input input_default"><input type="text" name="title" placeholder={titleText}
                                            onChange={changeInput}/></div>

                                    </div>
                                </li>
                                <li className="col_1">
                                    <div className="write_input_wrap">
                                        <div className="write_input_title">
                                        {props.lang == 0 && '별점'}
                                        {props.lang == 1 && 'Click to rate'}
                                        {props.lang == 2 && 'Điểm sao'}  
                                        </div>
                                        <div className="box_line start_rate_box">
                                            <input type="radio" id="rate-5" name="rate" value="5" onClick={clickRate}
                                                style={{display:'none'}}
                                            />
                                            <label htmlFor="rate-5">
                                                <i className="fas fa-star"></i>
                                            </label>
                                            <input type="radio" id="rate-4" name="rate" value="4" onClick={clickRate}
                                                style={{display:'none'}}
                                            />
                                            <label htmlFor="rate-4">
                                                <i className="fas fa-star"></i>
                                            </label>

                                            <input type="radio" id="rate-3" name="rate" value="3" onClick={clickRate}
                                                style={{display:'none'}}
                                            />
                                            <label htmlFor="rate-3">
                                                <i className="fas fa-star"></i>
                                            </label>

                                            <input type="radio" id="rate-2" name="rate" value="2" onClick={clickRate}
                                                style={{display:'none'}}
                                            />
                                            <label htmlFor="rate-2">
                                                <i className="fas fa-star"></i>
                                            </label>

                                            <input type="radio" id="rate-1" name="rate" value="1" onClick={clickRate}
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
                                {props.lang == 1 && 'Your review'}
                                {props.lang == 2 && 'Xem lại mô tả'}  
                                </div>
                                <div className="textarea_default">
                                    <textarea name="content" id="" placeholder={contentText}
                                        onChange={changeInput}
                                    ></textarea>
                                    
                                </div>
                            </div>
                        </div>
                            
                        
                        <div className="submit mt-20">
                            <div className="submit_inner">
                                <div className="cancel_box mr-10 point" 
                                    onClick={()=>setState({...state, open:false})}
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
                                    {props.lang == 0 && '등록'}
                                    {props.lang == 1 && 'Enrollment'}
                                    {props.lang == 2 && 'Ghi danh'}
                                    </span>
                                    <img className="i_18 i_submit ml-10"src="/static/img/submit.png" alt="submit" />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        }
    </React.Fragment>
    )
}
export default ReviewCreate;