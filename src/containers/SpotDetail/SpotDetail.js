import React from 'react';
import { spotDetail  } from '../../apis/spotApi/spotApis';
import BookmarkButton from '../../components/buttons/BookmarkButton';
import RelatedPostCardWrap from '../../components/relatedPost/RelatedPostCardWrap';
import LikeButton from '../../components/buttons/LikeButton';
import FollowButton from '../../components/buttons/FollowButton';
import { Link, Redirect } from 'react-router-dom';
import ReviewCreate from '../../components/review/ReviewCreate';
import ReviewCard from '../../components/review/ReviewCard';
import ReviewDetailCard from '../../components/review/ReviewDetailCard';
import SelfCheckWrapper from '../../components/Wrapper/SelfCheckWrapper';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { loginCheck } from '../../utils/loginCheck';
import { createPonorama } from '../../utils/panorama/Panorama';
import { detailGoogleMap } from '../../utils/googleMap/GoogleMap';

class SpotDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect : false,
            redirectTo : '/',

            isBookmarked : false,
            isLiked : false,
            isFollowed : false,
            review : [],
            reviewRateTotal : 0,
            reviewCount : 0,
            reviewDetailOpen : false, //리뷰 상세보기 모달 열기
            reviewDetail:{},
            spot : {
                title : '',
                title_kr : '',
                title_en : '',
                title_vi : '',
                content : '',
                content_kr : '',
                content_en : '',
                content_vi : '',
                imgFiles : [],
                panoImg : null,
                panoBgm : null,
                start : '',
                start_kr : '',
                start_en : '',
                start_vi : '',
                theme : 0,
                cost : 0,
                costType : 'KRW',
                moveType : 1,
                time : '당일',
                young : false,
                disabled : false,
                animal : false,
                tags : [],
                addr : '대한민국',
                addr_kr : '대한민국',
                addr_en : '대한민국',
                addr_vi : '대한민국',
                complete : false,
            },
            user:{
                id : 0,
                nickname : '작성자',
                profile : '/static/img/profile_default.png',
                expert : 0,
            },
            related:{
                checkedData: [],
            }
        }
    }

    async componentDidMount(){
        // 💡 스팟 상세 api 요청
        await this.getSpotDetailApi(location.pathname.split('/')[2]);
        // 💡 스와이퍼 객체 생성
        await new Swiper('.swiper-container', {
            autoHeight : true,
            lazyLoading: true,
            lazyLoadingInPrevNext: true,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
        });
        // 💡 구글 맵 객체 생성
        await detailGoogleMap(this.state.spot.addr);
        // 💡 파노라마 객체 생성
        await createPonorama(this.state.spot.panoImg, this.state.spot.panoBgm);
        // 스크롤 올리기
        window.scrollTo(0, 0);
    }

    async getSpotDetailApi(spotId){
        this.props.isLoading(true);

        // 💡 pathname에서 spot id 추출이후 spotId를 통해 스팟 상세 api 호출
        let id = spotId;
        let result = await spotDetail(id);
        result = result.data[0];
        console.log(result);

        // 💡 응답된 상세 api 값들로 상태 변경
        this.setState({
            isBookmarked : result.is_bookmarked,
            isLiked : result.is_liked,
            isFollowed : result.is_followed,
            review : result.review_list,
            reviewRateTotal : result.rate_total,
            reviewCount : result.review_count,
            spot : {
                id : result.spot.pk,
                title : result.spot.title,
                title_kr : result.spot.title_kr !== null ? result.spot.title_kr : result.spot.title,
                title_en : result.spot.title_en !== null ? result.spot.title_en : result.spot.title,
                title_vi : result.spot.title_vi !== null ? result.spot.title_vi : result.spot.title,
                content : result.spot.content,
                content_kr : result.spot.content_kr !== null ? result.spot.content_kr : result.spot.content,
                content_en : result.spot.content_en !== null ? result.spot.content_en : result.spot.content,
                content_vi : result.spot.content_vi !== null ? result.spot.content_vi : result.spot.content,
                imgFiles : result.spotphotos,
                panoImg : (result.spotpanos.length != 0)? `/media/${result.spotpanos[0].path}` : null ,
                panoBgm : (result.spotpanos.length != 0)? `/media/${result.spotpanos[0].bgm}` : null,
                start : result.spot.start,
                start_kr : result.spot.start_kr !== null ? result.spot.start_kr : result.spot.start,
                start_en : result.spot.start_en !== null ? result.spot.start_en : result.spot.start,
                start_vi : result.spot.start_vi !== null ? result.spot.start_vi : result.spot.start,
                theme : result.spot.theme,
                cost : result.spot.cost,
                costType : result.spot.cost_type,
                moveType : result.spot.move_type,
                time : result.spot.time,
                young : result.spot.young,
                disabled : result.spot.disabled,
                animal : result.spot.animal,
                tags : result.spottags,
                addr : result.spot.addr,
                addr_kr : result.spot.addr_kr !== null ? result.spot.addr_kr : result.spot.addr,
                addr_en : result.spot.addr_en !== null ? result.spot.addr_en : result.spot.addr,
                addr_vi : result.spot.addr_vi !== null ? result.spot.addr_vi : result.spot.addr,
            },
            user:{
                id : result.user_info.id,
                nickname : result.user_info.nickname,
                profile : result.user_info.profile_photo != '' ? '/media/'+result.user_info.profile_photo : '/static/img/profile_default.png',
                expert : result.user_info.expert
            },
            related : {
                checkedData: result.relateds ? result.relateds : []
            }
        });

        this.props.isLoading(false);
    }

    // 💡 파노라마 전체보기 
    // rendering 이후 화면에서는 숨겨져있지만 파노라마 사진을 클릭하면 해당 매서드가 실행됨
    // 파노라마가 전체화면이 되면 fullscreen인지 감지하는 이벤트 리스너를 통해 파노라마와 연결된 adio 파일 실행/종료
    clickPanoImg(){ document.querySelector('.psv-fullscreen-button').click(); }
    
    // 💡 리뷰의 개수를 반환하는 함수
    getReviewCount(){ return this.state.reviewCount;}

    // 💡 이전 화면으로 돌아가는 함수
    goToBack(e){ if(e.currentTarget === e.target) history.back(); }

    render(){
        if(this.state.redirect && this.state.redirectTo == '/') return <Redirect to={this.state.redirectTo}/>
        else if(this.state.redirect && this.state.redirectTo == '/users/login') return <Redirect to={this.state.redirectTo}/>

        let moveType = <i className="fas fa-car spot_detail_move_type"></i>;
        if(this.state.spot.move_type == 1){
            moveType = <i className="fas fa-car spot_detail_move_type"></i>;
        }else if(this.state.spot.move_type == 2){
            moveType = <i className="fas fa-bus spot_detail_move_type"></i>;
        }else if(this.state.spot.move_type == 3){
            moveType = <i className="fas fa-walking spot_detail_move_type"></i>;
        }else {
            moveType = <i className="fas fa-plane-departure spot_detail_move_type"></i>;
        }

        return (
            <React.Fragment>
                <div className="popup_container" >
                    <div className="detail" style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
                        <div style={{display:'flex',justifyContent:'center'}}>
                            <button className="spot_detail_top_button top_button_back" onClick={
                                ()=> { history.back(); }
                            }>
                                <i className="fas fa-arrow-circle-left"></i>
                                { this.props.lang == 0 && '뒤로가기'}
                                { this.props.lang == 1 && 'Back'}
                                { this.props.lang == 2 && 'Quay lại'}
                            </button>
                            <CopyToClipboard text={window.location.href}
                                onCopy={() => {
                                let message = '링크가 복사되었습니다.';
                                if(this.props.lang == 1) message = 'The link has been copied.';
                                if(this.props.lang == 2) message = 'Liên kết đã được sao chép.';
                                this.props.setSnackbar({
                                    type:'SUCCESS',
                                    open:true, 
                                    message: message,
                                    time : 2000,
                                })
                            }}>
                                <button className="spot_detail_top_button top_button_link" >
                                    <span>
                                        { this.props.lang == 0 && '공유하기'}
                                        { this.props.lang == 1 && 'Share'}
                                        { this.props.lang == 2 && 'chia sẻ'}
                                    </span>
                                    <i className="fas fa-link"></i>
                                </button>
                            </CopyToClipboard>
                        </div>
                        <div style={{display:'flex',justifyContent:'center'}}>
                            <SelfCheckWrapper 
                                matchId={this.state.user.id}
                                hide={false}
                            >
                                <Link to={'/spots/'+this.state.spot.id+'/update'} className="spot_detail_top_button">
                                    <span>
                                        { this.props.lang == 0 && '수정하기'}
                                        { this.props.lang == 1 && 'Update'}
                                        { this.props.lang == 2 && 'Sửa đổi'}
                                    </span>
                                    <i className="fas fa-edit"></i>
                                </Link>
                            </SelfCheckWrapper>
                        </div>
                    </div>
                    <div className="popup_detail" onClick={this.goToBack.bind(this)}>
                        <div className="detail box_default">
                            <div className="detail_gallery gallery">
                                <div className="swiper-container gallery_container">
                                    <div className="swiper-wrapper spot_detail_photo_slider">
                                        {this.state.spot.imgFiles.map((e, index)=>{
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
                            </div>
                            <div id="spot_detail_map" style={{height:'300px'}}></div>
                            <div className="detail_contents">
                                <div className="detail_contents_inner" style={{cursor:'default'}}>
                                    <div className="detail_contents_profile">
                                        <div className="profile" style={{minWidth:'150px'}}>
                                            <Link to={`/users/${this.state.user.id}`} className="profile_img_wrap">
                                                <img className="profile_img profile_default point"
                                                src={this.state.user.profile}
                                                alt="profile_default"/>
                                                {this.state.user.expert == 1 && <div className="master_img"><img src="/static/img/master.png" alt="master"/></div>}
                                            </Link>
                                            <div className="user_name profile_name spot_detail_user_name point">{this.state.user.nickname}</div>
                                        </div>
                                        <div className="profile_action">

                                            <SelfCheckWrapper 
                                                matchId={this.state.user.id}
                                                hide={true}
                                            >
                                                <FollowButton
                                                    lang={this.props.lang}
                                                    isLoading={this.props.isLoading}
                                                    userId={this.state.user.id}
                                                    setFollow={(result)=> this.setState({isFollowed : result})}
                                                    isFollowed={this.state.isFollowed}
                                                />
                                            </SelfCheckWrapper>
                                        </div>
                                    </div>
                                    <div className="detail_contents_info">
                                        <div className="detail_contents_title" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <h3 className="spot_detail_title">
                                                { this.props.lang == 0 && this.state.spot.title_kr }
                                                { this.props.lang == 1 && this.state.spot.title_en }
                                                { this.props.lang == 2 && this.state.spot.title_vi }
                                            </h3>
                                            <div className="detail_contents_title_action" style={{minWidth:'250px'}}>
                                                
                                                <BookmarkButton 
                                                    lang={this.props.lang}
                                                    isLoading={this.props.isLoading}
                                                    spotId={this.state.spot.id}
                                                    setBookmark={(result)=> this.setState({isBookmarked : result})}
                                                    isBookmarked={this.state.isBookmarked}
                                                />
                                            
                                                <LikeButton 
                                                    lang={this.props.lang}
                                                    isLoading={this.props.isLoading}
                                                    spotId={this.state.spot.id}
                                                    setLike={(result)=> this.setState({isLiked : result})}
                                                    isLiked={this.state.isLiked}
                                                />

                                            </div>
                                        </div>
                                        <ul className="spot_detail_taglist" style={{display:'flex',marginTop:'10px',marginBottom:'0px'}}>
                                            {this.state.spot.tags.map((e, index)=>{
                                                return (
                                                    <li key={index} style={{marginRight:'3px'}}>
                                                        <div className="round_box_btn">
                                                            <a>{e.name}</a>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        <div className="detail_contents_middle">
                                            <div className="detail_contents_desc spot_detail_content">
                                                { this.props.lang == 0 && this.state.spot.content_kr }
                                                { this.props.lang == 1 && this.state.spot.content_en }
                                                { this.props.lang == 2 && this.state.spot.content_vi } 
                                            </div>
                                            <div id="pano_viewer" style={{position:'fixed',top:'-1000px'}}></div>
                                            <div className="detail_contents_panorama point" onClick={this.clickPanoImg.bind(this)}>
                                                <div className="detail_contents_panorama_inner box_default">
                                                    <img className="panorama_img" src={this.state.spot.panoImg} alt="" style={{minHeight:"100px"}}/>
                                                    <div className="detail_contents_panorama_overlay">
                                                        <span>
                                                        { this.props.lang == 0 && '360 파노라마 보기'}
                                                        { this.props.lang == 1 && '360 panoramic view'}
                                                        { this.props.lang == 2 && 'Chế độ xem toàn cảnh 360'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="detail_contents_travel" >
                                            <div className="spot_detail_content_bottom">
                                                <h5>
                                                    <span>{this.state.user.nickname}</span>
                                                    <span>
                                                        { this.props.lang == 0 && '님의 여행'}
                                                        { this.props.lang == 1 && '`s travel'}
                                                        { this.props.lang == 2 && ' Chuyến đi'}
                                                    </span>
                                                    <span>
                                                        {moveType}
                                                    </span>
                                                    <span>
                                                        { this.props.lang == 0 && this.state.spot.time }
                                                        { 
                                                            (this.props.lang == 1 || this.props.lang == 2) && 
                                                            <>
                                                                {this.state.spot.time == '당일' && 'A day'}
                                                                {this.state.spot.time == '1박 2일' && '2 days'}
                                                                {this.state.spot.time == '2박 3일' && '3 days'}
                                                                {this.state.spot.time == '3박 4일' && '4 days'}
                                                                {this.state.spot.time == '일주일' && 'A week'}
                                                                {this.state.spot.time == '한달' && 'A month'}
                                                            </> 
                                                        }
                                                    </span>
                                                    <span>
                                                        { this.props.lang == 0 && ' 여행'}
                                                        { this.props.lang == 1 && ' travel'}
                                                        { this.props.lang == 2 && ' Chuyến đi'}
                                                    </span>
                                                    <span style={{color:"#999"}}>
                                                        (  
                                                        { this.props.lang == 0 && <>여행 출발 주소 : {this.state.spot.start_kr }</>}
                                                        { this.props.lang == 1 && <>Travel departure address : {this.state.spot.start_en }</>}
                                                        { this.props.lang == 2 && <>Địa chỉ khởi hành du lịch : {this.state.spot.start_vi }</>}
                                                        ) 
                                                    </span>
                                                </h5> 
                                                <button className="cost_button">
                                                    { this.props.lang == 0 && ' 여행 경비 '}
                                                    { this.props.lang == 1 && ' Expense '}
                                                    { this.props.lang == 2 && ' Chi phí đi lại '}
                                                     : {this.state.spot.cost} {this.state.spot.costType === "undefined" ? "KRW" : this.state.spot.costType}
                                                </button>
                                            </div>
                                            <div className="detail_contents_travel_info" style={{marginTop:'5px',paddingTop:'5px'}}>
                                                <div className="detail_contents_travel_info_left ">
                                                    <h4 style={{fontWeight:'bold',marginBottom:'10px'}}>
                                                    { this.props.lang == 0 && ' 여행지 정보 '}
                                                    { this.props.lang == 1 && ' Details '}
                                                    { this.props.lang == 2 && ' Thông tin điểm đến '}
                                                    </h4> 
                                                    <div className="travel_info_item" style={{marginBottom:"30px"}}>
                                                        <div className="title round_box_btn">
                                                            <a >
                                                            { this.props.lang == 0 && ' 주소 '}
                                                            { this.props.lang == 1 && ' Departure address '}
                                                            { this.props.lang == 2 && ' Địa chỉ '}
                                                            </a>
                                                        </div>
                                                        <div className="icon"><i className="fas fa-map-marker-alt"></i></div>
                                                        <div className="content">
                                                            { this.props.lang == 0 && this.state.spot.addr_kr }
                                                            { this.props.lang == 1 && this.state.spot.addr_en }
                                                            { this.props.lang == 2 && this.state.spot.addr_vi }
                                                        
                                                        </div>
                                                    </div>        
                                                </div>
                                                <div className="detail_contents_travel_info_right">
                                                    <ul className="spot_detail_checkbox_wrap">    
                                                        <li>
                                                            <label className="check_box check_box_v2">
                                                                <span>
                                                                {this.props.lang == 0 && '영/유아 '}
                                                                {this.props.lang == 1 && 'Child-friendly '}
                                                                {this.props.lang == 2 && 'đứa trẻ '}  
                                                                </span>
                                                                <input type="checkbox" disabled checked={this.state.spot.young ? true : false}/>
                                                                <span className="check_icon"></span>
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <label className="check_box check_box_v2">
                                                                <span>
                                                                {this.props.lang == 0 && '장애인 '}
                                                                {this.props.lang == 1 && 'Disabled '}
                                                                {this.props.lang == 2 && 'Tàn tật '}   
                                                                </span>
                                                                <input type="checkbox" disabled checked={this.state.spot.disabled ? true : false}/>
                                                                <span className="check_icon"></span>
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <label className="check_box check_box_v2">
                                                                <span>
                                                                {this.props.lang == 0 && '반려동물 '}
                                                                {this.props.lang == 1 && 'Pet-friendly '}
                                                                {this.props.lang == 2 && 'Vật nuôi '}   
                                                                </span>
                                                                <input type="checkbox" disabled checked={this.state.spot.animal ? true : false}/>
                                                                <span className="check_icon"></span>
                                                            </label>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.related.checkedData.length !== 0 &&
                            <div className="detail_review_write">
                                <RelatedPostCardWrap
                                    data={this.state.related.checkedData}
                                    changeSpot={(id)=>this.getSpotDetailApi(id)}
                                    readOnly={true}
                                />
                            </div>
                        }
                        <div className="detail_review_write box_default">
                            <ReviewCreate
                                lang={this.props.lang}
                                reviewRateTotal={this.state.reviewRateTotal}
                                reviewCount={this.state.reviewCount}
                                spotId={this.state.spot.id}
                                isLoading={this.props.isLoading}
                                getSpotDetailApi={this.getSpotDetailApi.bind(this)}
                                setSnackbar={this.props.setSnackbar}
                            />
                        </div>
                        <div className="detail_review_list_wrap">
                            <div className="detail_review_list">
                                <ReviewCard 
                                    lang={this.props.lang}
                                    isLoading={this.props.isLoading}
                                    reviewDetailOpen={(result)=>{
                                        this.setState({reviewDetailOpen:true, reviewDetail:result});
                                    }}
                                    review={this.state.review}
                                />
                            </div>
                            <div className="detail_review_detail_wrap">
                                <ReviewDetailCard
                                    lang={this.props.lang}
                                    isLoading={this.props.isLoading}
                                    reviewDetail={this.state.reviewDetail}
                                    reviewDetailOpen={this.state.reviewDetailOpen}
                                    reviewDetailClose={()=>{
                                        this.setState({reviewDetailOpen:false});
                                    }}
                                    isFollowed={this.state.isFollowed}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        )
    }
}

export default SpotDetail;