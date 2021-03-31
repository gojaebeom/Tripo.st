import React from 'react';
import { Link } from 'react-router-dom';

function GridCard(props){
    const contentid =  props.data.recommend_list.contentid;
    const thumbnail = props.data.recommend_list.firstimage2 ? props.data.recommend_list.firstimage2 : '/static/img/tripo_no_photo03.png';
    const title = props.data.recommend_list.title ? props.data.recommend_list.title : '제목 없음';

    let overview = '내용 없음';
    if(props.data.recommend_detail){
        overview = props.data.recommend_detail.overview ? props.data.recommend_detail.overview : '내용 없음';
    }
    
    const areaCode = props.data.recommend_list.areacode ? props.data.recommend_list.areacode : 0;
    // console.log('===================================================');
    // console.log(areaCode);
    /**
     * 1.서울 2.인천 3.대구
     * 4.대구 5.광주 6.부산
     * 7.울산 8.세종 
     * 31.경기 32.강원 33.충북
     * 34.충남 35.경북 36.경남
     * 37.전북 38.전남 39.제주
     */
    let area = '위치정보 없음';
    if(areaCode == 1) area = '서울';
    else if(areaCode == 2) area = '인천';
    else if(areaCode == 3) area = '대전';
    else if(areaCode == 4) area = '대구';
    else if(areaCode == 5) area = '광주';
    else if(areaCode == 6) area = '부산';
    else if(areaCode == 7) area = '울산';
    else if(areaCode == 8) area = '세종';
    else if(areaCode == 31) area = '경기';
    else if(areaCode == 32) area = '강원';
    else if(areaCode == 33) area = '충북';
    else if(areaCode == 34) area = '충남';
    else if(areaCode == 35) area = '경북';
    else if(areaCode == 36) area = '경남';
    else if(areaCode == 37) area = '전북';
    else if(areaCode == 38) area = '전남';
    else if(areaCode == 39) area = '제주';
    return (
    <React.Fragment>
        <div className="card_list" style={{width:'15%'}}>
            <div className="card card_grid" style={{maxWidth:'300px'}}>
                <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",minHeight:"200px",overflow:"hidden"}}>
                    <img 
                        loading="lazy" 
                        className="card_img" 
                        src={thumbnail}
                        style={{width:"100%",height:"200px"}}
                    />    
                </div>
                
                <div className="card_action_wrap">
                    <div className="card_action">
                        <div className="card_info">
                            <div className="card_view_btn">
                                <div className="round_box_btn">
                                    <Link to={'/recommends/'+contentid} >
                                    { props.lang == 0 && '자세히 보기' }
                                    { props.lang == 1 && 'Details' }
                                    { props.lang == 2 && 'xem thêm' }
                                    </Link>
                                </div>
                            </div>
                            <div className="card_info_inner">
                                <div className="card_info_tag">
                                    {/* <div className="traffic">
                                        <div className="round_box">
                                            <img src="/static/img/bus.png" alt="bus" />
                                            <span>1시간 20분</span>
                                        </div>
                                    </div> */}
                                    <div className="traffic">
                                        <div className="round_box" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <i className="fas fa-map-marker-alt" style={{marginRight:'5px'}}></i>
                                            <span>{area}</span>
                                        </div>
                                    </div>
                                    {/* <div className="weather">
                                        <div className="round_box">
                                            <img src="/static/img/weather_01.png" alt="weather"/>
                                            <span>16℃</span>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="card_info_summary">
                                    <a className="point">
                                        <h4 className="card_info_title" style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                                            {title}
                                        </h4>
                                        <p className="card_info_desc" 
                                            style={{display:"inline-block",width:"80%",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                                            {overview}
                                        </p>
                                    </a>
                                </div>
                                <div className="card_info_footer">
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
export default GridCard;