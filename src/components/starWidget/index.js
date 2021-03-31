import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { create } from '../../apis/footageApi';
import { validationInput } from '../../utils/InputValitaion';
import { loginCheck } from '../../utils/loginCheck';

export default function StarWidget (props) {

    const [review, setReview] = useState({
        rate : 0,
        description : '',
        userId : null,
        footageId : location.pathname.split('/')[2] ? location.pathname.split('/')[2] : 0,
    });

    const changeRate = e => {
        const value = e.target.value;
        console.log(`별점 : ${value}`);
        setReview({...review, rate:value});
    }

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

        const formData = new FormData();
        formData.append('rate' , review.rate);
        formData.append('description' , review.description);
        formData.append('userId' , review.userId);
        formData.append('footageId' , review.footageId);

        const res = await create('/api/footages/reviews/create/', formData);
        if(res.status === 200){

        }else{

        }
    }

    return ( 
    <div className="review-wrap">
        <div className="star-widget">
            <div className="rate-wrap">
                <input type="radio" id="rate-5" name="rate" value="5" onChange={changeRate}/>
                <label htmlFor="rate-5">
                    <i className="fas fa-star"></i>
                </label>
                <input type="radio" id="rate-4" name="rate" value="4" onChange={changeRate}/>
                <label htmlFor="rate-4">
                    <i className="fas fa-star"></i>
                </label>

                <input type="radio" id="rate-3" name="rate" value="3" onChange={changeRate}/>
                <label htmlFor="rate-3">
                    <i className="fas fa-star"></i>
                </label>

                <input type="radio" id="rate-2" name="rate" value="2" onChange={changeRate}/>
                <label htmlFor="rate-2">
                    <i className="fas fa-star"></i>
                </label>

                <input type="radio" id="rate-1" name="rate" value="1" onChange={changeRate}/>
                <label htmlFor="rate-1">
                    <i className="fas fa-star"></i>
                </label>
            </div>
            <header>

            </header>
            <div className="textarea">
                <textarea cols="30" placeholder="Describe your experience.." 
                value={review.description}
                onChange={changeDescription}
                ></textarea> 
                <button type="submit"
                    onClick={submitForm}
                >Post</button>
            </div>
        </div>
    </div>
    )
};