import React from 'react';
import { reviewDetail } from '../../apis/reviewApi/reviewApis';
import MasonryReviewCard from '../masonryCard/MasonryReviewCard';

function ReviewCard(props){
    const clickReviewDetailOpen = async (reviewId) => {
        props.isLoading(true);
        // console.log(e.target);
        // console.log('리뷰디테일 오픈!!!!!');
        let result = await reviewDetail(reviewId);
        // console.log(result);
        props.reviewDetailOpen(result);
        props.isLoading(false);
    }
    return (
    <React.Fragment>
        <div className="layout_full">
            <div className="card_list_masonry" style={{height:'auto',minHeight:'auto'}}>
                {
                    (props.review.length == 0) ? null :
                    <MasonryReviewCard 
                        lang={props.lang}
                        data={props.review}
                        clickReviewDetailOpen={clickReviewDetailOpen}
                    />
                }
            </div>
        </div>
    </React.Fragment>
    )
}
export default ReviewCard;