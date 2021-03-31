import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

function MasonryCard(props){

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
                return (
                    <div className="masonry_card" key={e.spot.pk}>
                        <div className="img_wrap">
                            <img className="card_img" src={(e.thumbnail != '') ?`/media/${e.thumbnail}`: '/static/img/tripo_no_photo03.png'} alt="" />
                        </div>
                        <div className="card_info_v2">
                            <Link to={'/spots/'+e.spot.pk} className="center_button">
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
            })
        }
        </Masonry>
    </ResponsiveMasonry>
    )
}
export default MasonryCard;