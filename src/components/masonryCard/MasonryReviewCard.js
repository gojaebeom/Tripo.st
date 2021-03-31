import React from 'react';
import { Link } from 'react-router-dom';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

function MasonryReviewCard(props){

    return (
    <ResponsiveMasonry
        columnsCountBreakPoints={{0: 2, 750: 2, 900: 4, 1200:5}}
    >
        <Masonry gutter="10px" >
        {
            props.data.map((e)=>{
                return (
                    <div className="masonry_card" key={e.review.pk}>
                        <img className="card_img" src={'/media/'+e.thumbnail.preview} alt=""/>
                        <div className="card_info_v2">
                            <a className="center_button" onClick={()=>props.clickReviewDetailOpen(e.review.pk)} >
                            { props.lang == 0 && '자세히 보기' }
                            { props.lang == 1 && 'see more' }
                            { props.lang == 2 && 'xem thêm' }
                            </a>
                            <div className="bottom_content_wrap">
                                <Link className="writer" to={'/users/'+e.user.pk}>
                                    {e.user.expert == 1 && <img src="/static/img/master.png" loading="lazy" alt="master" style={{marginRight:'5px'}}/>}
                                    <span>{e.user.nickname}</span>
                                </Link>
                                <div className="rating">
                                    <i className="fas fa-star" style={{fontSize:'10px',marginRight:'5px',color:'#36D7B7'}}></i>
                                    <span>{e.review.rate}
                                    &nbsp;
                                    { props.lang == 0 && '점' }
                                    { props.lang == 1 && 'point' }
                                    { props.lang == 2 && 'điểm' }
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
export default MasonryReviewCard;