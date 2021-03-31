import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RecommendSearch(props){
    const [state, setState] = useState({
        word : ''
    });

    const changeSearch = (e) => {
        // console.log(e.target.value);
        setState({word : e.target.value});
        props.getSearchSpotList(e.target.value);
        if(e.keyCode == 13){
            console.log('enter!!!!');
            props.changeSpotList();
        }
    }

    let searchPlaceholder = '찾고자 하는 여행지를 입력해보세요.';
    if(props.lang == 1) searchPlaceholder = 'Enter the destination you want to find.';
    if(props.lang == 2) searchPlaceholder = 'Hãy nhập địa điểm du lịch mà bạn muốn tìm.';
    return (
    <React.Fragment>
        <div className="search_box">
            <button className="search_submit">
                <img className="i_24 i_search"src="/static/img/search.png" alt="search" id="search_input_click_image"/>
            </button>
            <input type="text" placeholder={searchPlaceholder} aria-label="Search" name="search" autoComplete="off" id="search_input_keyword" 
                onKeyUp={changeSearch}
            />
        </div>

        <div className={state.word != '' ? "search_box_open open" : "search_box_open" }>
            <div className="search_box_open_inner">
                    <a className=" search_current_location point">
                        <img className="i_18 i_search_open"src="/static/img/search_open.png" alt="search_open" />
                        <span >
                            { props.lang == 0 && '키워드를 검색하여 관련된 포스팅을 찾을 수 있습니다.' }
                            { props.lang == 1 && 'You can search for keywords to find related posts.' }
                            { props.lang == 2 && 'Bạn có thể tìm kiếm từ khóa để tìm kiếm các bài đăng liên quan.' }
                        </span>
                    </a>
                    <div className="search_info point" style={{marginTop:'10px'}}>
                        <span>
                        { 
                                props.lang == 0 && 
                                <div>
                                    <span style={{fontWeight:"bold",color:"#36d7b7",marginRight:'5px'}}>
                                        { state.word }
                                    </span> 
                                    과(와) 연관된 게시물
                                    <span style={{fontWeight:"bold",color:"#36d7b7",marginLeft:'5px',marginRight:'5px'}}>
                                        {props.searchData.length}
                                    </span>
                                    개를 찾았습니다. 
                                </div> 
                            }
                            { 
                                props.lang == 1 && 
                                <div>
                                    found
                                    <span style={{fontWeight:"bold",color:"#36d7b7",marginLeft:'5px',marginRight:'5px'}}>
                                        {props.searchData.length}
                                    </span>
                                    posts related to
                                    <span style={{fontWeight:"bold",color:"#36d7b7",marginLeft:'5px'}}>
                                        { state.word }
                                    </span> 
                                </div>
                            }
                            { 
                                props.lang == 2 && 
                                <div>
                                    Tôi đã tìm thấy
                                    <span style={{fontWeight:"bold",color:"#36d7b7",marginLeft:'5px',marginRight:'5px'}}>
                                        {props.searchData.length}
                                    </span>
                                    bài viết liên quan đến 
                                    <span style={{fontWeight:"bold",color:"#36d7b7",marginLeft:'5px'}}>
                                        { state.word }
                                    </span> 
                                </div>
                            }
                        </span><br/>
                    </div>
                    <div id="search_list" style={{display:'flex',flexDirection:'column'}}>
                        {
                            props.searchData.length != 0 &&
                            props.searchData.map((e, index)=>{
                                if(index <= 4){
                                    return <Link to={'/recommends/'+e.pk} className="search_keyword" key={index}>{e.title}</Link>
                                }
                            })
                        }
                        <br/>
                        { props.searchData.length-5 > 0 && <span>...외 {props.searchData.length-5} 개의 스팟</span> }
                    </div>
            </div>
        </div>
    </React.Fragment>
    )
}
export default RecommendSearch;