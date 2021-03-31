import React from 'react';
import { Link } from 'react-router-dom';
import { getUserDetailApi, updateUserCoverImg, updateUserProfileImg, getFeedListApi, getReviewListApi, getBookmarkListApi, getFootageListApi } from '../../apis/userApi/userApis';
import { dataURLtoFile, ImageResize } from '../../utils/imageResize/ImageResize';
import FollowButton from '../../components/buttons/FollowButton';
import MasonryCard from '../../components/masonryCard/MasonryCard';
import MasonryCardV2 from '../../components/masonryCard/MasonryCardV2';
import FollowModal from '../../components/modal/followModal';
import SelfCheckWrapper from '../../components/Wrapper/SelfCheckWrapper';
import { errorCheck } from '../../utils/error_check';

class UserDetail extends React.Component{
    constructor(){
        super();
        this.state = {
            isFollowed:false,
            user:{
                id : 0,
                profileImg:'/static/img/profile_default.png',
                coverImg:'/static/img/cover02.jpg',
                followers : [],
                followings : [],
                count : 0,
                likeCount : 0,
                nickname : '닉네임',
                myText : '',
                myText_kr : '',
                myText_en : '',
                myText_vi : '',
                expert : 0,
            },
            followModalOpen : false,
            followType : 'Followers',
            spot : [],
            footages  : []
        }
    }

    componentDidMount(){
        // 스크롤 올리기
        window.scrollTo(0, 0);
        this.getUserDetailApi(location.pathname.split('/')[2]);
    }

    async getUserDetailApi(userId){
        this.props.isLoading(true);
        /**@getUserApi */
        let res = await errorCheck(getUserDetailApi(userId));
        console.log(res);
        let spots = await errorCheck(getFeedListApi(userId));
        // console.log(spots);
        // console.log(res);
        this.setState({
            isFollowed : res.followed,
            user : {
                ...this.state.user,
                id : res.user.pk,
                nickname : res.user.nickname,
                myText : res.user.my_text,
                myText_kr : res.user.my_text_kr !== null ? res.user.my_text_kr : res.user.my_text,
                myText_en : res.user.my_text_en !== null ? res.user.my_text_en : res.user.my_text,
                myText_vi : res.user.my_text_vi !== null ? res.user.my_text_vi : res.user.my_text,
                likeCount : res.like_count,
                count : res.count,
                profileImg : res.user.profile_photo != '' ? '/media/'+res.user.profile_photo : '/static/img/profile_default.png',
                coverImg : res.user.cover_photo != '' ? '/media/'+res.user.cover_photo : '/static/img/cover02.jpg',
                followers : res.followers,
                followings : res.followings,
                expert : res.user.expert
            },
            spot : spots.data
        })
        /**@getUserApiEnd */
        this.props.isLoading(false);
    }

    async clickTab(e){
        this.props.isLoading(true);
        /**@styleEffect click effect */
        let tabs = e.currentTarget.parentNode.childNodes;
        for(let tab of tabs){
            if(tab.classList.contains('active')) tab.classList.remove('active');
        }
        e.currentTarget.classList.add('active');
        /**@styleEffectEnd */

        /**@getApi switch apis */
        if(e.currentTarget.id == 'feed'){
            let spots = await errorCheck(getFeedListApi(this.state.user.id));
            this.setState({...this.state, spot : spots.data, footages : []});
        }else if(e.currentTarget.id == 'review'){
            let spots = await errorCheck(getReviewListApi(this.state.user.id));
            this.setState({...this.state, spot : spots.data, footages : []});
        }else if(e.currentTarget.id == 'book'){
            let spots = await errorCheck(getBookmarkListApi(this.state.user.id));
            this.setState({...this.state, spot : spots.data, footages : []});
        }else if(e.currentTarget.id == 'clip'){
            let spots = await errorCheck(getFootageListApi(this.state.user.id));
            this.setState({...this.state, footages : spots.data});
        }
        /**@getApiEnd */
        this.props.isLoading(false);
    }

    openFollowModal(e){
        // console.log(e.currentTarget);
        if(e.currentTarget.title === '팔로워') this.setState({followModalOpen : true, followType : 'Followers'});
        else if(e.currentTarget.title === '팔로잉') this.setState({followModalOpen : true, followType : 'FOLLWING'});
    }
    
    async changeUserCoverPhoto(e){
        this.props.isLoading(true);
        // console.log(e.target.files[0]);
        const formData = new FormData();
        formData.append('cover_photo', e.target.files[0]);
        await errorCheck(updateUserCoverImg(this.state.user.id, formData));
        await this.getUserDetailApi(location.pathname.split('/')[2]);
        this.props.isLoading(false);
    }

    async changeUserProfilePhoto(e){
        this.props.isLoading(true);
        // console.log(e.target.files[0]);
        /** image resize ------------------------------------------------------------------- */
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = async () => {
            const formData = new FormData();
            let {bitData, base64Data} = await ImageResize(reader.result, 200);
            var resizeFile = dataURLtoFile(bitData, e.target.files[0].name);
            formData.append('profile_photo', resizeFile);
            await errorCheck(updateUserProfileImg(this.state.user.id, formData));
            await this.getUserDetailApi(location.pathname.split('/')[2]);
            this.props.isLoading(false);
        };
        /** image resize x ------------------------------------------------------------------ */
    }

    async clickFollowButton(result){
        this.props.isLoading(true);
        this.setState({isFollowed : result});
        await this.getUserDetailApi(location.pathname.split('/')[2]);
        this.props.isLoading(false);
    }

    async setFollow(userId){
        this.props.isLoading(true);
        /**@getUserApi */
        let res = await errorCheck(getUserDetailApi(userId));
        //console.log(res);
        this.setState({
            isFollowed : res.followed,
            user : {
                ...this.state.user,
                followers : res.followers,
                followings : res.followings
            }
        })
        /**@getUserApiEnd */
        this.props.isLoading(false);
    }

    render(){
        let followerText = '팔로워';
        if(this.props.lang == 1 || this.props.lang == 2) followerText = 'Followers';

        let followingText = '팔로잉';
        if(this.props.lang == 1 || this.props.lang == 2) followingText = 'Followings';

        return (
            <React.Fragment>
                
                <FollowModal 
                    lang={this.props.lang}
                    open={this.state.followModalOpen}
                    close={()=>this.setState({followModalOpen:false})}
                    title={this.state.followType === 'Followers' ? followerText : followingText}
                    follow={this.state.followType === 'Followers' ? this.state.user.followers : this.state.user.followings}
                    userId={this.state.user.id}
                    changeUserDetail={(userId)=>{
                        this.setState({followModalOpen:false});
                        this.getUserDetailApi(userId);
                    }}
                    setFollow={(result)=>this.getUserDetailApi(location.pathname.split('/')[2])}
                    isLoading={this.props.isLoading}
                />
                <div className="container">
                    <div className="layout_full">
                        <div className="profile_wrap">
                            <div className="profile_inner">
                                <div className="profile_bg" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <img className="profile_bg_img point" src={this.state.user.coverImg} alt="profile_bg" />
                                    {/* <img className="profile_bg_img point" src="/static/img/cover02.jpg"  alt="profile_bg" /> */}
                                    <div className="profile_bg_overlay">
                                        <div className="layout_grid">
                                        <SelfCheckWrapper 
                                            matchId={this.state.user.id}
                                            hide={false}
                                        >
                                            <div className="profile_bg_edit">
                                                <label className="point" htmlFor="profile_bg_label">
                                                    <img className="i_24" src="/static/img/upload_img.png" alt="bg_upload" style={{width:'30px',height:'30px'}}/>
                                                    <input id="profile_bg_label" type="file" name="cover_photo" accept="image/*" style={{display:'none'}}
                                                        onChange={this.changeUserCoverPhoto.bind(this)}
                                                    />
                                                </label>
                                            </div>
                                        </SelfCheckWrapper>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile_header">
                                    <div className="layout_grid">
                                        <div className="profile_card_wrap">
                                            <div className="profile_card" style={{minWidth:"250px"}}>
                                                <div className="profile box_default">
                                                    <div style={{width:'100%',display:'flex',justifyContent:'flex-end',alignItmes:'center'}}>
                                                    <SelfCheckWrapper 
                                                        matchId={this.state.user.id}
                                                        hide={false}
                                                    >
                                                        <Link to={`/users/${this.state.user.id}/update`}>
                                                        <img className="point" 
                                                        src="/static/img/edit_round.png" 
                                                        alt="edit" title="회원 정보 수정" 
                                                        style={{width:'30px'}}
                                                        />
                                                        </Link>
                                                    </SelfCheckWrapper>
                                                    </div>
                                                    <form>
                                                  	
                                                        <div className="profile_img_wrap">                                                
                                                            <img className="profile_img profile_default" src={this.state.user.profileImg} alt="profile_default"/>
                                                            {this.state.user.expert == 1 && <div className="master_img"><img src="/static/img/master.png" alt="master"/></div>}
                                                        </div>
                                                        
                                                        <SelfCheckWrapper 
                                                            matchId={this.state.user.id}
                                                            hide={false}
                                                        >
                                                            <label htmlFor="profile_photo" className="profile_img_wrap">	
                                                                <input id="profile_photo" name="profile_photo" type="file" style={{display:'none'}}
                                                                    onChange={this.changeUserProfilePhoto.bind(this)}
                                                                />
                                                                <div className="eidt">
                                                                    <img className="point" src="/static/img/upload_img.png" alt="master" width="25px;" 
                                                                    style={{position:"absolute",bottom:"0px",right:'0px'}}/>
                                                                </div>
                                                            </label>
                                                        </SelfCheckWrapper>
                                                    </form>
                                                    <div className="profile_name ">{this.state.user.nickname}</div>
                                                    <pre className="profile_desc" style={{
                                                        //overflow:'hidden',
                                                        whiteSpace:'pre-wrap'
                                                    }}>
                                                        {this.props.lang == 0 && this.state.user.myText_kr}
                                                        {this.props.lang == 1 && this.state.user.myText_en}
                                                        {this.props.lang == 2 && this.state.user.myText_vi}
                                                    </pre>
                                                        <SelfCheckWrapper 
                                                            matchId={this.state.user.id}
                                                            hide={true}
                                                        >
                                                            <FollowButton 
                                                                lang={this.props.lang}
                                                                userId={this.state.user.id}
                                                                setFollow={this.clickFollowButton.bind(this)}
                                                                isFollowed={this.state.isFollowed}
                                                                isLoading={this.props.isLoading}
                                                                style={{width:'100%'}}
                                                            />
                                                        </SelfCheckWrapper>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                    
                                    <div className="profile_gnb" >
                                        <div className="profile_count" style={{background:'#E9F7EF'}}>
                                            <div className="layout_grid" >
                                                <ul>
                                                    <li>
                                                        <div className="count_box">
                                                            {/* <span className="count_box_title"></span> */}
                                                            <span>
                                                                { this.props.lang == 0 && '좋아요'}
                                                                { this.props.lang == 1 && 'Likes'}
                                                                { this.props.lang == 2 && 'thích'}
                                                            </span>
                                                            <button className="count_box_desc">
                                                                {this.state.user.likeCount}
                                                            </button>
                                                        </div>
                                                    </li>
                                                    
                                                    <li>
                                                        <div className="count_box">
                                                            {/* <span className="count_box_title"></span> */}
                                                            <span>
                                                                { this.props.lang == 0 && '조회수'}
                                                                { this.props.lang == 1 && 'Views'}
                                                                { this.props.lang == 2 && 'lượt xem'}
                                                            </span>
                                                            <button className="count_box_desc">
                                                                {this.state.user.count}
                                                            </button>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="count_box" title="팔로워" onClick={this.openFollowModal.bind(this)}>
                                                            <span className="count_box_title" >{followerText}</span>
                                                            <button className="count_box_desc">
                                                                {this.state.user.followers.length}
                                                            </button>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="count_box" title="팔로잉" onClick={this.openFollowModal.bind(this)}>
                                                            <span className="count_box_title">{followingText}</span>
                                                            <button className="count_box_desc">
                                                                {this.state.user.followings.length}
                                                            </button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="profile_tab">
                                            <div className="layout_grid">
                                                <ul className="tab_list">
                                                    <li className="active" id="feed" 
                                                        onClick={this.clickTab.bind(this)}>
                                                        <div className="tab_title point">
                                                            { this.props.lang == 0 && '피드'}
                                                            { this.props.lang == 1 && 'Feed'}
                                                            { this.props.lang == 2 && 'Cho ăn'}
                                                        </div>
                                                    </li>
                                                    <li  id="review" title="리뷰가 작성된 게시물 보이기" 
                                                        onClick={this.clickTab.bind(this)}>
                                                        <div className="tab_title point">
                                                            { this.props.lang == 0 && '리뷰'}
                                                            { this.props.lang == 1 && 'Review'}
                                                            { this.props.lang == 2 && 'Ôn tập'}
                                                        </div>
                                                    </li>
                                                    <li  id="book" 
                                                        onClick={this.clickTab.bind(this)}>
                                                        <div className="tab_title point">
                                                            { this.props.lang == 0 && '북마크'}
                                                            { this.props.lang == 1 && 'Bookmark'}
                                                            { this.props.lang == 2 && 'Dấu trang'}
                                                        </div>
                                                    </li>
                                                    <li  id="clip" 
                                                        onClick={this.clickTab.bind(this)}>
                                                        <div className="tab_title point">
                                                            { this.props.lang == 0 && '여행클립'}
                                                            { this.props.lang == 1 && 'Tripo clip'}
                                                            { this.props.lang == 2 && 'Tripo kẹp'}
                                                        </div>
                                                    </li>
                                                    <li className="tab_list_last" 
                                                        onClick={this.clickTab.bind(this)}>
                                                        <div className="tab_title">여백</div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile_tab_contents">
                        <div className="layout_full">
                            <div className="card_list_masonry">
                                {
                                    this.state.footages.length !== 0 ?
                                    <MasonryCardV2 
                                        lang={this.props.lang}
                                        data={this.state.footages} 
                                    /> : 
                                    <MasonryCard 
                                        lang={this.props.lang}
                                        data={this.state.spot} 
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        )
    }
}

export default UserDetail;