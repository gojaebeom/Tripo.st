import React, {Component} from 'react'; 
import { Link } from 'react-router-dom';
import { RelatedCard, RelatedNoneCard } from './RelatedPostStyles';

function RelatedPostCardWrap(props){

    const onOpenModal = () => {
        props.onOpenModal();
    }

    let relatedMaxLength = 2;
    let relatedDataLength = props.data.length;
    let relatedNoneCardLength = relatedMaxLength - relatedDataLength;
    return(
    <React.Fragment>
        <div className="related-swiper-container gallery_container">
            <div className="swiper-wrapper spot_detail_photo_slider">
                {
                    // 관련 게시물 카드 보이기
                    props.data.map((e, index)=>{
                        return(
                            <RelatedCard key={e.spot.pk}>
                                <div className="preview">
                                    {
                                        props.readOnly ? 
                                        <div className="open" onClick={()=>props.changeSpot(e.spot.pk)}>
                                            <span style={{color:'white'}}>
                                                자세히 보기
                                            </span>
                                        </div> : 
                                        <i className="fas fa-times-circle"
                                            onClick={()=>{
                                                const newData = props.data.filter(data=> data.spot.pk !== e.spot.pk);
                                                props.setData(newData);
                                            }}
                                        ></i> 
                                    }
                                    <img src={'/media/'+e.thumbnail}/>
                                </div>
                                <div className="body">
                                    <div className="title">
                                        {e.spot.title}
                                    </div>
                                    <div className="content">
                                        {e.spot.content}
                                    </div>
                                </div>
                            </RelatedCard>
                        )
                    })
                }
                {
                    // 관련 게시물이 없는 만큼 등록 카드 보이기
                    !props.readOnly && 
                    [...Array(relatedNoneCardLength)].map((e, index)=>{
                        return (
                            <RelatedNoneCard 
                                onClick={onOpenModal.bind(this)} 
                                key={index}
                            >
                                <i className="fas fa-plus"></i>
                            </RelatedNoneCard>
                        )
                    })
                }   
            </div>
        </div>
    </React.Fragment>           
    )
}
export default RelatedPostCardWrap;