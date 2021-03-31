import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { index } from '../../apis/footageApi';
import MasonryCardV2 from '../../components/masonryCard/MasonryCardV2';
import FootageSearch from '../../components/search/FootageSearch';

export default function FootageMain (props) {

    const [footages, setFootages] = useState([]);
    useEffect(async ()=>{
        const res = await index('/api/footages/');
        const _footages = res.result;
        console.log(_footages);
        setFootages(_footages);
    }, []);

    const [searchFootages, setSearchFootages] = useState([]);

    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log(searchFootages);
    return (
        <React.Fragment>
        <div className="search layout_grid">
            <div className="search_inner">
                <div className="search_box_desc">
                    <span>
                        { props.lang == 0 && <span style={{display:'flex',alignItems:'flex-end'}}>나만의 여행을 
                        <h3 style={{margin:'0px',fontSize:'1.6rem'}}>영상</h3>으로 공유하세요.</span>}
                        { props.lang == 1 && 'Post your trip with video clips' }
                        { props.lang == 2 && 'Hãy giới thiệu địa điểm du lịch của riêng bạn.' }
                    </span>
                    <h3>
                        { props.lang == 0 && '다음 여행은 어디인가요?' }
                        { props.lang == 1 && 'Find your next' }
                        { props.lang == 2 && 'Chuyến du lịch tiếp theo là ở đâu?' }
                    </h3>
                </div>
                <div className="search_box_wrap">
                    {
                        footages.length !== 0 &&
                        <FootageSearch 
                            lang={props.lang}
                            footages={footages}
                            searchFootages={searchFootages}
                            setSearchFootages={setSearchFootages}
                            setSnackbar={props.setSnackbar}
                        />
                    }
                </div>
            </div>
        </div>
        <div className="layout_full">
            <MasonryCardV2
                lang={props.lang}
                data={searchFootages.length !== 0 ? searchFootages : footages} 
            />
        </div>
    </React.Fragment>
    )
}