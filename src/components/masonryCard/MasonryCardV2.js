import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

function MasonryCardV2(props){

    useEffect(()=>{
        window.scrollTo(0, window.localStorage.getItem('scrollTop'));
    }, []);

    return (
    <ResponsiveMasonry
        columnsCountBreakPoints={{0: 2, 750: 2, 900: 4, 1200:5}}
    >
        <Masonry gutter="10px" >
        {
            props.data.map((e)=>{
                console.log(e.footage.is_private);
                console.log(e.footage.user_id);
         
                const SessionUserId = document.querySelector("#root").getAttribute("user_id");
                console.log(+SessionUserId);
                if(e.footage.is_private === 1 && e.footage.user_id !== +SessionUserId){
                    return null;
                }else {
                    return (
                        <div className="masonry_card" key={e.footage.id}>
                            <div className="img_wrap">
                                <img className="card_img" src={(e.footage.thumbnail_preview !== '') ?`/media/${e.footage.thumbnail_preview}`: '/static/img/tripo_no_photo03.png'} alt="" />
                            </div>
                            <div className="card_info_v2">
                                <Link to={'/tripo-clips/'+e.footage.id} className="center_button">
                                    { props.lang == 0 && '자세히 보기' }
                                    { props.lang == 1 && 'Details' }
                                    { props.lang == 2 && 'xem thêm' }
                                </Link>
                                <div className="bottom_content_wrap">
                                    <Link to={'/users/'+e.user.id} className="writer">
                                        {e.user.expert == 1 && <img src="/static/img/master.png" loading="lazy" alt="master" style={{marginRight:'5px'}}/>}
                                        <span>{e.user.nickname}</span>
                                    </Link>
                                    <div className="rating">
                                        <i className="fas fa-star" style={{fontSize:'10px',marginRight:'5px',color:'#36D7B7'}}></i>
                                        <span>
                                            {e.review_count}
                                            &nbsp;
                                            <span>
                                                { props.lang == 0 && '개의 리뷰' }
                                                { props.lang == 1 && 'reviews' }
                                                { props.lang == 2 && 'sự đánh giá' }
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })
        }
        </Masonry>
    </ResponsiveMasonry>
    )
}
export default MasonryCardV2;