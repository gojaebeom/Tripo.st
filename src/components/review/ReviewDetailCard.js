import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FollowButton from '../buttons/FollowButton';
import SelfCheckWrapper from '../Wrapper/SelfCheckWrapper';

function ReviewDetailCard(props){
    const [state, setState] = useState({
        rateArr : [1,2,3,4,5],
        isFollowed : false
    });

    useEffect(()=>{
        new Swiper('.swiper-container-v2', {
            autoHeight : true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
        });   
    });

    if(!props.reviewDetailOpen){
        return false;
    }else{
        console.log('hello');
    }

    let moveType = <i className="fas fa-car spot_detail_move_type"></i>;
    if(props.reviewDetail.review.move_type == 1){
        moveType = <i className="fas fa-car spot_detail_move_type"></i>;
    }else if(props.reviewDetail.review.move_type == 2){
        moveType = <i className="fas fa-bus spot_detail_move_type"></i>;
    }else if(props.reviewDetail.review.move_type == 3){
        moveType = <i className="fas fa-walking spot_detail_move_type"></i>;
    }else {
        moveType = <i className="fas fa-plane-departure spot_detail_move_type"></i>;
    }

    return(
    <React.Fragment>
        <div className="detail_review_detail box_default">
            <div className="detail_gallery">
                <div className="swiper-container-v2 review-swiper-container gallery_container" >
                    <div className="swiper-wrapper spot_detail_photo_slider">
                        {props.reviewDetail.photo_list.map((e, index)=>{
                                let path = (e.path != '') ? `/media/${e.path}` : '/static/img/tripo_no_photo04.png';
                                return (
                                    <div className="swiper-slide" key={index}>
                                        <img className="gallery_img point" src={path} alt="image" />
                                    </div>
                                )
                        }) }
                    </div>
                    <div className="swiper-pagination"></div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
                <div className="detail_gallery_action">
                    <ul>
                        <SelfCheckWrapper
                            matchId={props.reviewDetail.user.pk}
                            hide={false}
                        >
                            <li style={{marginRight:'10px'}}>
                                <Link className="point" to={'/reviews/'+props.reviewDetail.review.pk+'/update'}>
                                    <img className="i_24 i_close_round" src="/static/img/edit_round.png" alt="close_round"/>
                                </Link>
                            </li>
                        </SelfCheckWrapper>
                        <li>
                            <a className="point" onClick={()=>{
                                props.reviewDetailClose();
                            }}>
                                <img className="i_24 i_close_round" src="/static/img/close_round.png" alt="close_round"/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="detail_gallery_rating">
                    <ul>
                        {
                            state.rateArr.map((e, index)=>{
                                if(props.reviewDetail.review.rate >= index+1){
                                    return <li key={index}><img className="i_24" src="/static/img/rating_on.png" alt="rating_on"/></li> 
                                }else{
                                    return <li key={index}><img className="i_24" src="/static/img/rating_off.png" alt="rating_off"/></li>
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="detail_contents">
                <div className="detail_contents_inner">
                    <div className="detail_contents_profile">
                        <div className="profile">
                            <Link className="profile_img_wrap" to={'/users/'+props.reviewDetail.user.pk}>
                                
                                <img className="profile_img profile_default point"
                                src={props.reviewDetail.user.profile_photo ? 
                                    '/media/'+props.reviewDetail.user.profile_photo : 
                                    "/static/img/profile_default.png" }
                                alt="profile_default"
                                style={{width:"80px",height:"80px"}}
                                />
                                {props.reviewDetail.user.expert == 1 && <div className="master_img"><img src="/static/img/master.png" alt="master"/></div>}
                            </Link>
                            <div className="user_name profile_name point">{props.reviewDetail.user.nickname}</div>
                        </div>
                        <div className="profile_action">

                            <SelfCheckWrapper 
                                matchId={props.reviewDetail.user.pk}
                                hide={true}
                            >
                                <FollowButton
                                    lang={props.lang}
                                    isLoading={props.isLoading}
                                    userId={props.reviewDetail.user.pk}
                                    setFollow={ (result)=> setState({ isFollowed : result }) }
                                    isFollowed={ props.isFollowed }
                                />
                            </SelfCheckWrapper>
                        </div>
                    </div>
                    <div className="detail_contents_info">
                        <div className="detail_contents_title">
                            <h3>
                                {props.lang == 0 && props.reviewDetail.review.title_kr}
                                {props.lang == 1 && props.reviewDetail.review.title_en}
                                {props.lang == 2 && props.reviewDetail.review.title_vi}
                            </h3>
                        </div>
                        <div className="detail_contents_middle" style={{minHeight:"100px"}}>
                            <div className="detail_contents_desc">
                                {props.lang == 0 && props.reviewDetail.review.content_kr}
                                {props.lang == 1 && props.reviewDetail.review.content_en}
                                {props.lang == 2 && props.reviewDetail.review.content_vi}
                            </div>
                        </div>
                        <div className="detail_contents_travel">
                            <div className="detail_contents_travel_own">
                                <div className="detail_contents_travel_own_start">
                                        <h5>
                                            <span>{props.reviewDetail.user.nickname}</span>
                                            <span>
                                                { props.lang == 0 && ' 님의 여행'}
                                                { props.lang == 1 && ' `s travel'}
                                                { props.lang == 2 && ' Chuyến đi'}
                                            </span>
                                        </h5>
                                        <div className="detail_contents_travel_own_start_desc">
                                            {moveType}
                                            <p>
                                                <span>
                                                { props.lang == 0 && props.reviewDetail.review.time }
                                                { 
                                                    (props.lang == 1 || props.lang == 2) && 
                                                    <>
                                                        {props.reviewDetail.review.time == '당일' && 'A day'}
                                                        {props.reviewDetail.review.time == '1박 2일' && '2 days'}
                                                        {props.reviewDetail.review.time == '2박 3일' && '3 days'}
                                                        {props.reviewDetail.review.time == '3박 4일' && '4 days'}
                                                        {props.reviewDetail.review.time == '일주일' && 'A week'}
                                                        {props.reviewDetail.review.time == '한달' && 'A month'}
                                                    </> 
                                                }
                                                </span>
                                                <span>
                                                    { props.lang == 0 && ' 여행'}
                                                    { props.lang == 1 && ' travel'}
                                                    { props.lang == 2 && ' Chuyến đi'}
                                                </span>
                                                <span>
                                                (  
                                                    { props.lang == 0 && <>여행 출발 주소 : {props.reviewDetail.review.start_kr }</>}
                                                    { props.lang == 1 && <>Departure address : {props.reviewDetail.review.start_en }</>}
                                                    { props.lang == 2 && <>Địa chỉ khởi hành du lịch : {props.reviewDetail.review.start_vi }</>}
                                                ) 
                                                </span>
                                            </p>
                                        </div>
                                </div>
                                <div className="detail_contents_travel_own_money">
                                        <span className="round_check_box on">
                                        { props.lang == 0 && ' 여행 경비 '}
                                        { props.lang == 1 && ' Expense '}
                                        { props.lang == 2 && ' Chi phí đi lại '}
                                        : {props.reviewDetail.review.cost} {props.reviewDetail.review.cost_type}
                                        </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
    )
}
export default ReviewDetailCard;