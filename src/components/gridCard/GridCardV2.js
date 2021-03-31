import React from 'react';
import { Link } from 'react-router-dom';

function GridCardV2(props){
    const thumbnail = props.data.thumbnail !== '' ? '/media/'+props.data.thumbnail : '/static/img/tripo_no_photo03.png';
    const title = props.data.spot.title;
    const title_kr = props.data.spot.title_kr !== null ? props.data.spot.title_kr : title;
    const title_en = props.data.spot.title_en !== null ? props.data.spot.title_en : title;
    const title_vi = props.data.spot.title_vi !== null ? props.data.spot.title_vi : title;
    const content = props.data.spot.content;
    const content_kr = props.data.spot.content_kr !== null ? props.data.spot.content_kr : content ;
    const content_en = props.data.spot.content_en !== null ? props.data.spot.content_en : content ;
    const content_vi = props.data.spot.content_vi !== null ? props.data.spot.content_vi : content ;
    const spotId = props.data.spot.pk;
    const userId = props.data.user.id;
    const nickname = props.data.user.nickname;
    const date = props.data.spot.time;
    let moveType = <i className="fas fa-car"></i>;
    if(props.data.spot.move_type == 1){
        moveType = <i className="fas fa-car"></i>;
    }else if(props.data.spot.move_type == 2){
        moveType = <i className="fas fa-bus"></i>;
    }else if(props.data.spot.move_type == 3){
        moveType = <i className="fas fa-walking"></i>;
    }else {
        moveType = <i className="fas fa-plane-departure"></i>;
    }
    return (
    <React.Fragment>
        <div className="card_list" style={{width:'15%'}}>
            <div className="card card_grid" style={{width:'100%'}}>
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
                                    <Link to={'/spots/'+spotId} >
                                    { props.lang == 0 && '자세히 보기' }
                                    { props.lang == 1 && 'see more' }
                                    { props.lang == 2 && 'xem thêm' }
                                    </Link>
                                </div>
                            </div>
                            <div className="card_info_inner">
                                <div className="card_info_tag">
                                    <div className="traffic">
                                        <div className="round_box" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <span style={{marginRight:'5px'}}>{moveType}</span>
                                            <span>{date}</span>
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
                                            { props.lang == 0 && title_kr }
                                            { props.lang == 1 && title_en }
                                            { props.lang == 2 && title_vi }
                                        </h4>
                                        <p className="card_info_desc" 
                                            style={{display:"inline-block",width:"80%",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                                            { props.lang == 0 && content_kr }
                                            { props.lang == 1 && content_en }
                                            { props.lang == 2 && content_vi }
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
export default GridCardV2;