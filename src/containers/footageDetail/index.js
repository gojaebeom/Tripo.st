import { background } from 'jimp';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { show } from '../../apis/footageApi';
import FollowButton from '../../components/buttons/FollowButton';
import FootageLikeButton from '../../components/buttons/FootageLikeButton';
import FootageReview from '../../components/footageReview';
import SelfCheckWrapper from '../../components/Wrapper/SelfCheckWrapper';

function FootageDetail ( props ) {

    const [isFollowed, setIsFollowed] = useState(false);

    const [isLiked , setIsLiked] = useState({
        result : false,
        count : 0
    });
    
    const [footage, setFootage] = useState({
        id : '',
        footage : null, 
        title_kr : '안녕하세요. 제목입니다.',
        title_en : '',
        title_vi : '',
        content_kr : '',
        content_en : '',
        content_vi : '',
        addr_kr : '',
        addr_en : '',
        addr_vi : '',
        date : '',
        count : 0,
        rate : 0,
        created_at: '',
        tags:[],
        user:{
            id : 0,
            nickname: '',
            expert  : 0,
            profile : ''
        }
    });
    const [reviews, setReviews] = useState([]);
    useEffect( async () => {
        const res = await show(`/api/footages/${location.pathname.split('/')[2]}/`);
        const footage = res.result.footage;
        const reviews = res.result.reviews;
        const footageUser = res.result.user;
        const isFollowed = res.result.is_followed;
        const _isLiked = res.result.is_liked;
        const tags = res.result.tags;
        console.log(footage);
        console.log(reviews);
        console.log(_isLiked);
        setIsLiked(_isLiked);
        setIsFollowed(isFollowed);
        setFootage({
            id : footage.id,
            footage :  footage.footage_file, 
            title_kr : footage.title_kr,
            title_en : footage.title_en,
            title_vi : footage.title_vi,
            content_kr : footage.content_kr,
            content_en : footage.content_en,
            content_vi : footage.content_vi,
            addr_kr : footage.addr_kr,
            addr_en : footage.addr_en,
            addr_vi : footage.addr_vi,
            date : footage.created_at,
            count : footage.count,
            rate : 0,
            created_at : footage.created_at.split('T')[0].replaceAll("-","."),
            tags:tags,
            user:{
                id : footageUser.id,
                nickname:footageUser.nickname,
                expert : footageUser.expert,
                profile: '/media/'+footageUser.profile_photo
            }
        });
        setReviews(reviews);

    }, []);

    return (
        <>
         <div className="tripo-clip-detail-container" style={{marginBottom:'0px'}}>
            <div style={{display:'flex',justifyContent:'center'}}>
                <button className="spot_detail_top_button top_button_back" onClick={
                    ()=> { history.back(); }
                }>
                    <i className="fas fa-arrow-circle-left"></i>
                    { props.lang == 0 && '뒤로가기'}
                    { props.lang == 1 && 'Back'}
                    { props.lang == 2 && 'Quay lại'}
                </button>
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <SelfCheckWrapper 
                    matchId={footage.user.id}
                    hide={false}
                >
                    <Link to={'/tripo-clips/'+footage.id+'/update'} className="spot_detail_top_button">
                        <span>
                            { props.lang == 0 && '수정하기'}
                            { props.lang == 1 && 'Update'}
                            { props.lang == 2 && 'Sửa đổi'}
                        </span>
                        <i className="fas fa-edit"></i>
                    </Link>
                </SelfCheckWrapper>
            </div>
        </div>
        <div className="tripo-clip-detail-container">
            <div className="footage-wrap">
                <div className="footage">
                    {
                        footage.footage !== null &&
                        <>
                            <video controls autoPlay muted width="100%" height="100%" style={{
                                maxHeight:'500px',
                                borderRadius:'5px',
                                background:'black'
                            }}>
                                <source src={'/media/'+footage.footage} type="video/mp4"/>
                                <source src={'/media/'+footage.footage} type="video/webm"/>
                                Sorry, your browser doesn't support embedded videos.
                            </video>
                            {/* <iframe src={'/media/'+footage.footage} allow="autoplay" id="audio" style={{display:'none'}}></iframe> */}
                        </>
                        
                    }
                </div>
                <div className="content">
                    <div className="top">
                        <div className="left">
                            <div className="title">
                                { props.lang == 0 && footage.title_kr }
                                { props.lang == 1 && footage.title_en }
                                { props.lang == 2 && footage.title_vi }
                            </div>
                            <div className="count" style={{color:'#BDBDBD'}}>
                                { props.lang == 0 && '조회수 ' }
                                { props.lang == 1 && 'views ' }
                                { props.lang == 2 && 'lượt xem ' }
                                {footage.count} • {footage.created_at}
                            </div>
                        </div>
                        <div className="right">
                            {/* <div className="rated">
                                <i className="fas fa-star"></i>
                                <span>{footage.rate}</span>
                            </div> */}
                            <FootageLikeButton 
                                lang={props.lang}
                                isLoading={props.isLoading}
                                footageId={footage.id}
                                setLike={(result)=> setIsLiked(result)}
                                isLiked={isLiked}
                            />
                            <CopyToClipboard text={window.location.href}
                                onCopy={() => {
                                let message = '링크가 복사되었습니다.';
                                if(props.lang == 1) message = 'The link has been copied.';
                                if(props.lang == 2) message = 'Liên kết đã được sao chép.';
                                props.setSnackbar({
                                    type:'SUCCESS',
                                    open:true, 
                                    message: message,
                                    time : 2000,
                                })
                            }}>
                                <button className="spot_detail_top_button top_button_link" >
                                    <span>
                                        { props.lang == 0 && '공유하기'}
                                        { props.lang == 1 && 'Share'}
                                        { props.lang == 2 && 'chia sẻ'}
                                    </span>
                                    <i className="fas fa-link"></i>
                                </button>
                            </CopyToClipboard>
                        </div>
                    </div>
                    <hr className="footage-hr"/>
                    <div className="bottom">
                        <div className="top">
                            <div className="detail_contents_profile">
                                <div>
                                    <Link to={`/users/${footage.user.id}`} className="profile_img_wrap">
                                        <img className="point"
                                        src={
                                            footage.user.profile !== null && footage.user.profile !== ''?
                                            footage.user.profile :
                                            '/static/img/profile_default.png'
                                        }
                                        alt="profile_default"/>
                                        {footage.user.expert == 1 && <div className="master_img"><img src="/static/img/master.png" alt="master"/></div>}
                                    </Link>
                                    <div className="username" style={{color:'#2E2E2E'}}>{footage.user.nickname}</div>
                                </div>
                                <div className="profile_action">

                                    <SelfCheckWrapper 
                                        matchId={footage.user.id}
                                        hide={true}
                                    >
                                        <FollowButton
                                            lang={props.lang}
                                            isLoading={props.isLoading}
                                            userId={footage.user.id}
                                            setFollow={(result)=> setIsFollowed(result)}
                                            isFollowed={isFollowed}
                                        />
                                    </SelfCheckWrapper>
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            { props.lang == 0 && footage.content_kr }
                            { props.lang == 1 && footage.content_en }
                            { props.lang == 2 && footage.content_vi }
                            <br/>
                            <ul style={{display:'flex',marginTop:'10px',marginBottom:'0px'}}>
                                {footage.tags.map((e, index)=>{
                                    return (
                                        <li key={index} style={{marginRight:'3px'}}>
                                            <div className="round_box_btn">
                                                <a>{e.name}</a>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="review-wrap">
                <FootageReview
                    lang={props.lang}
                    reviews={reviews}
                    setSnackbar={props.setSnackbar}
                    setReviews={setReviews}
                />
            </div>
        </div>
        </>
    )
}
export default FootageDetail;