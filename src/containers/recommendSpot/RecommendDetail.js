import React from 'react';
import { CopyToClipboard } from'react-copy-to-clipboard';
import { recommendDetail } from '../../apis/recommendApi/RecommendApis';
import { detailGoogleMap } from '../../utils/googleMap/GoogleMap';

class RecommendDetail extends React.Component{
    constructor(){
        super();
        this.state = {
            images : [],
            addr : [],
            title : '',
            content : '',
            homepage : '',
            usetime : '',
            restdate : '',
            infocenter : '',
            chkpet : '',
            parking : '',
            weather : '',
            temperature : '',
        }
    }

    async componentDidMount(){
        await this.getRecommendDetailApi();
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
        await detailGoogleMap(this.state.addr);
    }

    async getRecommendDetailApi(){
        this.props.isLoading(true);
        console.log(location.pathname.split('/')[2]);
        let res = await recommendDetail(location.pathname.split('/')[2],this.props.lang);
        console.log(res);
        if(res[0].recommend_detail != '내용 없음'){
            
            this.setState({
                images : res[0].recommend_detail.originimgurl,
                addr : res[0].recommend_list.addr1,
                title : res[0].recommend_list.title,
                content : res[0].recommend_detail.overview,
                homepage : res[0].recommend_detail.homepage,
                usetime : res[0].recommend_detail.usetime,
                restdate : res[0].recommend_detail.restdate,
                infocenter : res[0].recommend_detail.infocenter,
                chkpet : res[0].recommend_detail.chkpet,
                parking : res[0].recommend_detail.parking,
                weather : res[0].recommend_list.weather,
                temperature : res[0].recommend_list.temperature,
            })
        }
  
        this.props.isLoading(false);
    }

    goToBack(e){
        console.log(e.target);
        console.log(e.currentTarget);
        if(e.currentTarget === e.target){
            history.back();
        }
    }

    render(){
        console.log(this.state.weather);
        console.log(this.state.temperature);
        return(
        <React.Fragment>
            
            <div className="popup_container" >
                <div className="detail" style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <button className="spot_detail_top_button top_button_back" onClick={
                            ()=> { history.back(); }
                        }>
                            <i className="fas fa-arrow-circle-left"></i>
                            <span>
                                { this.props.lang == 0 && '뒤로가기'}
                                { this.props.lang == 1 && 'Go back'}
                                { this.props.lang == 2 && 'Quay lại'}
                            </span>
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
                                    { this.props.lang == 1 && 'share'}
                                    { this.props.lang == 2 && 'chia sẻ'}
                                </span>
                                <i className="fas fa-link"></i>
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>
                <div className="popup_detail" onClick={()=>this.goToBack.bind(this)}>
                    <div className="detail box_default">
                        <div className="detail_gallery gallery">
                            <div className="swiper-container gallery_container">
                                <div className="swiper-wrapper spot_detail_photo_slider">
                                    {
                                        this.state.images.length == 0 ? 
                                        <div className="swiper-slide">
                                            <img className="gallery_img point" src="/static/img/tripo_no_photo04.png" alt="image" />
                                        </div>
                                        :
                                        this.state.images.map((e, index)=>{
                                            let path = (e.path != '') ? e : '/static/img/tripo_no_photo04.png';
                                            return (
                                                <div className="swiper-slide" key={index}>
                                                    <img className="gallery_img point" src={path} alt="image" />
                                                </div>
                                            )
                                        }) 
                                    }
                                </div>
                                <div className="swiper-pagination"></div>
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-button-next"></div>
                            </div>
                        </div>
                        <div id="spot_detail_map" style={{height:'300px'}}></div>
                        <div className="detail_contents">
                        <div className="detail_contents_inner">
                                <div className="detail_contents_info">
                                    <div className="detail_contents_title">
                                        <h3>{this.state.title}</h3>
                                        
                                        <div className="detail_contents_title_action">
                                            <ul>
                                                <li>
                                                    <div className="mr-10" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                        <span className="round_box" style={{marginRight:'5px'}}>
                                                            { this.props.lang == 0 && '현재 날씨'}
                                                            { this.props.lang == 1 && 'Current weather'}
                                                            { this.props.lang == 2 && 'Thời tiết hiện tại'}
                                                        </span>
                                                        <span>
                                                            {
                                                                this.state.weather =='sunny' ? 
                                                                <div id="weatherSun">
                                                                    <i className="fas fa-sun fa-2x" style={{fontSize:'20px'}}></i>
                                                                </div>
                                                                :
                                                                this.state.weather =='rainy' ?
                                                                <div id="weatherRain">
                                                                    <i className="fas fa-cloud-rain fa-2x" style={{fontSize:'20px'}}></i>
                                                                </div>
                                                                :
                                                                <div id="weatherSnow">
                                                                    <i className="fas fa-snowflake fa-2x" style={{fontSize:'20px'}}></i>
                                                                </div>
                                                            }
                                                        </span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="mr-10" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                        <span className="round_box" style={{marginRight:'5px'}}>
                                                            { this.props.lang == 0 && '현재 기온'}
                                                            { this.props.lang == 1 && 'Current temperature'}
                                                            { this.props.lang == 2 && 'Nhiệt độ hiện tại'}
                                                        </span>
                                                        <span>{this.state.temperature ? this.state.temperature : '기온 정보 없음'} ºc</span>
                                                    </div>
                                                </li>   
                                                <li>
                                                    <div className="mr-10" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                        <span className="round_box" style={{marginRight:'5px'}}>
                                                            { this.props.lang == 0 && '주소'}
                                                            { this.props.lang == 1 && 'address'}
                                                            { this.props.lang == 2 && 'Địa chỉ'}
                                                        </span>
                                                        <span>{this.state.addr ? this.state.addr : '주소 정보 없음'}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="detail_contents_middle">
                                        <div className="detail_contents_desc">
                                        {this.state.content ? this.state.content : '내용 정보 없음' }
                                        </div>
                                    </div>
                                    <div className="detail_contents_travel">
                                        <div className="detail_contents_travel_title">
                                            <h5> 
                                                <span>
                                                    { this.props.lang == 0 && '웹사이트'}
                                                    { this.props.lang == 1 && 'Website'}
                                                    { this.props.lang == 2 && 'Trang mạng'}
                                                </span>
                                                : <a href={this.state.homepage ? this.state.homepage :"#"} target="_blank">{this.state.homepage?this.state.homepage : '홈페이지 정보 없음'}</a></h5>
                                        </div>
                                        <div className="detail_contents_travel_info" >
                                            <div style={{width:'100%'}}>
                                                <ul style={{display:"flex",justifyContent:'flex-start',alignItems:'flex-start',flexDirection:'column'}}>
                                                    <li style={{marginRight:'10px'}}>
                                                        <span>
                                                            <span style={{fontWeight:'bold'}}>
                                                            { this.props.lang == 0 && '이용시간'}
                                                            { this.props.lang == 1 && 'Hours of open'}
                                                            { this.props.lang == 2 && 'Giờ sử dụng'}
                                                            </span> : {this.state.usetime ? this.state.usetime : '정보 없음'}
                                                        </span>
                                                    </li>
                                                    <li style={{marginRight:'10px'}}>
                                                        <span>
                                                            <span style={{fontWeight:'bold'}}>
                                                            { this.props.lang == 0 && '휴일'}
                                                            { this.props.lang == 1 && 'Holiday'}
                                                            { this.props.lang == 2 && 'ngày lễ'}
                                                            </span> : {this.state.restdate ? this.state.restdate : '정보 없음'}
                                                        </span>
                                                    </li>
                                                    <li style={{marginRight:'10px'}}>
                                                        <span>
                                                            <span style={{fontWeight:'bold'}}>
                                                            { this.props.lang == 0 && '전화번호'}
                                                            { this.props.lang == 1 && 'Phone number'}
                                                            { this.props.lang == 2 && 'Số điện thoại'}
                                                            </span> : {this.state.infocenter ?this.state.infocenter : '정보 없음'}
                                                        </span>
                                                    </li>
                                                    <li style={{marginRight:'10px'}}>
                                                        <span>
                                                            <span style={{fontWeight:'bold'}}>
                                                            { this.props.lang == 0 && '애완동물 가능 여부'}
                                                            { this.props.lang == 1 && 'Pets-friendly'}
                                                            { this.props.lang == 2 && 'Vật nuôi'}
                                                            </span> : {this.state.chkpet?this.state.chkpet : '정보 없음'}
                                                        </span>
                                                    </li>
                                                    <li style={{marginRight:'10px'}}>
                                                        <span>
                                                            <span style={{fontWeight:'bold'}}>
                                                            { this.props.lang == 0 && '주차 가능 여부'}
                                                            { this.props.lang == 1 && 'Parking'}
                                                            { this.props.lang == 2 && 'Có chỗ đậu xe'}
                                                            </span> : {this.state.parking ? this.state.parking : '정보 없음'}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="detail_contents_travel_info_bottom" style={{display:"none"}}>

                                            </div>
                                        </div>
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
}

export default RecommendDetail;