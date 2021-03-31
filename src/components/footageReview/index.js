import { red } from '@material-ui/core/colors';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { create, update, _delete } from '../../apis/footageApi';
import { FootageReviewContainer, FootageReviewCreater, ReviewListContainer } from '../../containers/footageDetail/styles';
import { validationInput } from '../../utils/InputValitaion';
import { loginCheck } from '../../utils/loginCheck';
import SelfCheckWrapper from '../Wrapper/SelfCheckWrapper';

export default function FootageReview (props) {

    const [review, setReview] = useState({
        description : '',
        footageId : location.pathname.split('/')[2] ? location.pathname.split('/')[2] : 0,
    });

    const changeDescription = e => {
        const value = e.target.value;
        console.log(`내용 : ${value}`);
        setReview({...review, description:value});
    }

    const submitForm = async () => {
        let {login, move} = loginCheck(props.lang);
        if(login == false){
            if(move) location.href='/users/login';
            else return;
        }
        //유효성 검사
        let result = validationInput(review.description, (message="내용을 입력해주세요.") => {
            if(props.lang == 1) message = 'Please enter your details.';
            if(props.lang == 2) message = 'Vui lòng nhập thông tin chi tiết của bạn.';
            props.setSnackbar({type:'WARNING', open:true, message: message, time : 2000,});
        });
        if(!result) return;

        let message = '리뷰를 등록중입니다.';
        if(props.lang == 1) message = '리뷰를 등록중입니다.';
        if(props.lang == 2) message = '리뷰를 등록중입니다.';
        props.setSnackbar({type:'INFO', open:true, message: message, time : 2000,});

        const formData = new FormData();
        formData.append('description' , review.description);
        formData.append('footageId' , review.footageId);

        const res = await create('/api/footages/reviews/create/', formData);
        if(res.status === 200){
            let message = '리뷰가 등록되었습니다.';
            if(props.lang == 1) message = '리뷰가 등록되었습니다.';
            if(props.lang == 2) message = '리뷰가 등록되었습니다.';
            setReview({...review, description : ''})
            props.setSnackbar({type:'SUCCESS', open:true, message: message, time : 2000,});
            props.setReviews(res.result);
        }else{
            alert('error');
        }
    }

    let reviewPlaceholder = "간단한 리뷰를 남겨주세요 (100 글자 제한)";
    if(props.lang == 1) reviewPlaceholder = "Write a review (100 characters limit)";
    if(props.lang == 2) reviewPlaceholder = "Viết nhận xét (Giới hạn 100 ký tự)";
    return ( 
        <>
        <FootageReviewContainer>
            <div className="container-header">
                <i className="fas fa-comments"></i>
                <span>
                    { props.reviews.length } 
                    { props.lang == 0 && ' 개의 리뷰'}
                    { props.lang == 1 && ' reviews'}
                    { props.lang == 2 && ' nhận xét'}
                </span>
            </div>
            <ReviewListContainer>
            {
                props.reviews.map( e => {
                    return (
                        <li key={e.review.id} >
                            <div className="header">
                                <Link to={'/users/'+e.user.id} >
                                    <img className="profile" src={ 
                                        e.user.profile_photo !== '' ? 
                                        '/media/'+ e.user.profile_photo :
                                        '/static/img/profile_default.png'
                                        }
                                        style={{width:'32px',height:'32px',borderRadius:'100%'}}
                                    />
                                </Link>
                                <span>
                                    <span>{ e.user.nickname }</span>
                                    <SelfCheckWrapper 
                                        matchId={e.user.id}
                                        hide={false}
                                    >
                                        <span style={{color:'#FF8000',cursor:'pointer'}}
                                            onClick={ async ()=>{
                                                let message = '수정할 내용을 입력해주세요.';
                                                if(props.lang == 1) message = '';
                                                if(props.lang == 2) message = '';
                                                let result = prompt(message, e.review.content);
                                                console.log(result);
                                                if(result !== null){
                                                    const formData = new FormData();
                                                    formData.append('description' , result);
                                                    formData.append('footageId' , review.footageId);
                                                    let res = await update(`/api/footages/reviews/${e.review.id}/update/`, formData);
                                                    console.log(res);
                                                    if(res.status === 200){
                                                        let message = '리뷰가 수정되었습니다.';
                                                        if(props.lang == 1) message = '리뷰가 수정되었습니다.';
                                                        if(props.lang == 2) message = '리뷰가 수정되었습니다.';
                                                        props.setSnackbar({type:'SUCCESS', open:true, message: message, time : 2000,});
                                                        props.setReviews(res.result);
                                                    }else{
                                                        alert('error');
                                                    }
                                                }
                                            }}
                                        > 
                                        { props.lang == 0 && ' 수정'}
                                        { props.lang == 1 && ' edit'}
                                        { props.lang == 2 && ' Sửa đổi'}
                                        </span> •
                                        <span style={{color:'red',cursor:'pointer'}}
                                            onClick={async ()=>{
                                                let message = '리뷰를 삭제하시겠습니까?';
                                                if(props.lang == 1) message = '리뷰를 삭제하시겠습니까?';
                                                if(props.lang == 2) message = '리뷰를 삭제하시겠습니까?';
                                                let result = confirm(message);
                                                if (result){
                                                    const formData = new FormData();
                                                    formData.append('footageId' , review.footageId);
                                                    let res = await _delete(`/api/footages/reviews/${e.review.id}/delete/`, formData);
                                                    if(res.status === 200){
                                                        let message = '리뷰가 삭제되었습니다.';
                                                        if(props.lang == 1) message = '리뷰가 삭제되었습니다.';
                                                        if(props.lang == 2) message = '리뷰가 삭제되었습니다.';
                                                        props.setSnackbar({type:'SUCCESS', open:true, message: message, time : 2000,});
                                                        props.setReviews(res.result);
                                                    }else{
                                                        alert('error');
                                                    }
                                                }
                                            }}
                                        > 
                                        { props.lang == 0 && ' 삭제'}
                                        { props.lang == 1 && ' delete'}
                                        { props.lang == 2 && ' xóa bỏ'}
                                        </span>            
                                    </SelfCheckWrapper>
                                </span>
                            </div>
                            <div className="body">
                                { props.lang == 0 && e.review.content_kr }
                                { props.lang == 1 && e.review.content_en }
                                { props.lang == 2 && e.review.content_vi }
                            </div>
                        </li>
                    )
                })
            }
        </ReviewListContainer>
    </FootageReviewContainer>
    <FootageReviewCreater>
        <input type="text" placeholder={reviewPlaceholder}
            value={review.description}
            onChange={changeDescription}
        />
        <button onClick={submitForm}>
            <i className="fas fa-paper-plane"></i>
        </button>
    </FootageReviewCreater>
    </>    
    )
};