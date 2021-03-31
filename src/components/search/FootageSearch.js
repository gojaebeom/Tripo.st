import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FootageSearch(props){
    const [word, setWord] = useState('');

    const changeSearch = async (e) => {
        
        const substring = e.target.value;
        setWord(substring);

        const searchFootages = props.footages.filter((item)=>{
            if(
                item.footage.title.indexOf(substring) !== -1 ||
                item.footage.content.indexOf(substring) !== -1 ||
                item.footage.addr.indexOf(substring) !== -1 
            ){
                return item;
            }
        })
        props.setSearchFootages([].concat(searchFootages));

        if(e.keyCode == 13){
            setWord('');
    
            if(props.searchFootages.length === 0){
                let message = '해당하는 게시물이 없습니다.';
                if(props.lang == 1) message = 'There is no post.';
                if(props.lang == 2) message = 'Không có bài đăng.';

                props.setSnackbar({
                    type:'INFO',
                    open:true, 
                    message: message,
                    time : 2000,
                });
            }
        }
    }

    let searchPlaceholder = '찾고자 하는 여행 영상 키워드를 입력해주세요.';
    if(props.lang == 1) searchPlaceholder = 'Search keywords of video clips for your next trip.';
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

        {/* <div className={props.searchFind ? "search_box_open open" : "search_box_open" }> */}
        <div className={(word !== '') ? "search_box_open open" : "search_box_open" }>
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
                                        { word }
                                    </span> 
                                    과(와) 연관된 게시물
                                    <span style={{fontWeight:"bold",color:"#36d7b7",marginLeft:'5px',marginRight:'5px'}}>
                                        {props.searchFootages.length}
                                    </span>
                                    개를 찾았습니다. 
                                </div> 
                            }
                            { 
                                props.lang == 1 && 
                                <div>
                                    found
                                    <span style={{fontWeight:"bold",color:"#36d7b7",marginLeft:'5px',marginRight:'5px'}}>
                                        {props.searchFootages.length}
                                    </span>
                                    posts related to
                                    <span style={{fontWeight:"bold",color:"#36d7b7",marginLeft:'5px'}}>
                                        { word }
                                    </span> 
                                </div>
                            }
                            { 
                                props.lang == 2 && 
                                <div>
                                    Tôi đã tìm thấy
                                    <span style={{fontWeight:"bold",color:"#36d7b7",marginLeft:'5px',marginRight:'5px'}}>
                                        {props.searchFootages.length}
                                    </span>
                                    bài viết liên quan đến 
                                    <span style={{fontWeight:"bold",color:"#36d7b7",marginLeft:'5px'}}>
                                        { word }
                                    </span> 
                                </div>
                            }
                        </span><br/>
                    </div>
                    <div id="search_list" style={{display:'flex',flexDirection:'column'}}>
                        {
                            props.searchFootages.length != 0 &&
                            props.searchFootages.map((e, index)=>{
                                if(index <= 4){
                                    return <Link to={'/tripo-clips/'+e.footage.id} className="search_keyword" key={e.footage.id}>{e.footage.title}</Link>
                                }
                            })
                        }
                        <br/>
                        { 
                            props.searchFootages.length-5 > 0 && 
                            <div>
                                { props.lang == 0 && <span>...외 {props.searchFootages.length-5} 개의 게시물</span> }
                                { props.lang == 1 && <span>...{props.searchFootages.length-5} other post</span> }
                                { props.lang == 2 && <span>Ngoài ra còn {props.searchFootages.length-5} địa điểm nữa</span> }
                            </div>
                        }
                    </div>
            </div>
        </div>
    </React.Fragment>
    )
}