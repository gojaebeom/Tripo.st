import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Filter(props){
    const [state, setState] = useState({
        km : 20,
        defaultOption: 1,
        date : ['전체','당일','1박2일','2박3일','3박4일','일주일','한달'],
        dateIndex : 0,
        young : false,
        disabled : false,
        animal : false,
    });

    //기본 정렬 값 변경
    const handleDefaultoptionChange = e => setState({...state, defaultOption : e.target.value});
    
    //기본 정렬 값 변경
    const handleCheckoptionChange = e => {
        if(e.target.name == 'young') setState({...state, young : e.target.checked});
        else if(e.target.name == 'disabled') setState({...state, disabled : e.target.checked});
        else if(e.target.name == 'animal') setState({...state, animal : e.target.checked});
    }

    //최종 필터설정 이후 검색했을 때 값들을 부모에게 보내주기
    const handleNearSearch = () => {
        props.clickNearSearch(
            state.km,
            state.defaultOption,
            state.date[state.dateIndex],
            [state.young, state.disabled, state.animal]
        );
    }

    return(
    <React.Fragment>
        <div className="layout_grid">
            <div className="filter-v2">
                <input id="upDownInput" type="checkbox" />
                <div className="box_default filter-v2-left">
                    <a className="filter_location_inner point" id="recommend_near_search"
                        onClick={handleNearSearch.bind(this)}
                    >
                        <img className="i_24 i_location_on mr-10" src="/static/img/location_on.png" alt="location_on"/>
                        <span>
                            { props.lang == 0 && '주변 바로검색'}
                            { props.lang == 1 && 'Search nearby'}
                            { props.lang == 2 && 'Tìm kiếm gần'}
                        </span>
                    </a>
                </div>
                <div className="box_default filter-v2-center">
                    <div className="filter-v2-center-top">
                        <div className="filter-v2-center-top-left">
                            <div className="quantity_box">
                                <span className="quantity_title">
                                    <i className="fas fa-street-view"></i>
                                </span>
                                <div className="quantity_inde">
                                    <a className="quantity_minus point"
                                        onClick={()=>{
                                            if(state.km > 5) setState({...state, km:state.km-5})
                                        }}
                                    >
                                        <img className="i_24 i_minus" src="/static/img/minus.png" alt="minus"/>
                                    </a>
                                    <input 
                                        type="number" 
                                        className="quantity_result_distance avoid_clicks" 
                                        placeholder={state.km} 
                                        id="distance_number"
                                    />
                                    <span style={{marginRight:"10px"}}>km</span>
                                    <a className="quantity_plus point"
                                        onClick={()=>{
                                            if(state.km < 100) setState({...state, km:state.km+5})
                                        }}
                                    >
                                        <img className="i_24 i_plus mr-10" src="/static/img/plus.png" alt="plus"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="filter-v2-center-top-right">
                            <div className="filter_setup_open_button">
                                <label htmlFor="upDownInput">
                                    <span>
                                        { props.lang == 0 && '상세검색'}
                                        { props.lang == 1 && 'Advanced search'}
                                        { props.lang == 2 && 'tìm kiếm nâng cao'}
                                    </span>
                                    <i className="fas fa-arrow-circle-down"></i>
                                    <i className="fas fa-arrow-circle-up"></i>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="box_default filter-v2-center-bottom" style={{bottom:"-185px"}}>
                        <div className="title">
                            <i className="fas fa-filter"></i>
                            { props.lang == 0 && '필터'}
                            { props.lang == 1 && 'filter'}
                            { props.lang == 2 && 'bộ lọc'}
                        </div>
                        <div className="option-box">
                            <div className="option-box-left">
                                <div className="default-option">
                                    <div className=""><i className="fas fa-sort-amount-down-alt"></i></div>
                                    <input id="defaultOption1" name="defaultOption" type="radio" defaultChecked
                                        defaultValue="1"
                                        onClick={handleDefaultoptionChange}
                                    />
                                    <label className=""  htmlFor="defaultOption1">
                                        { props.lang == 0 && '날짜'}
                                        { props.lang == 1 && 'Date'}
                                        { props.lang == 2 && 'gần đây'}
                                    </label>
                                    <input id="defaultOption2" name="defaultOption" type="radio"
                                        defaultValue="2"
                                        onClick={handleDefaultoptionChange}
                                    />
                                    <label className="" htmlFor="defaultOption2">
                                        { props.lang == 0 && '별점'}
                                        { props.lang == 1 && 'Rating'}
                                        { props.lang == 2 && 'ngôi sao'}
                                    </label>
                                    <input id="defaultOption3" name="defaultOption" type="radio"
                                        defaultValue="3"
                                        onClick={handleDefaultoptionChange}
                                    />
                                    <label className="" htmlFor="defaultOption3">
                                        { props.lang == 0 && '리뷰'}
                                        { props.lang == 1 && 'Review'}
                                        { props.lang == 2 && 'ôn tập'}
                                    </label>
                                    <input id="defaultOption4" name="defaultOption" type="radio"
                                        defaultValue="4"
                                        onClick={handleDefaultoptionChange}
                                    />
                                    <label className="" htmlFor="defaultOption4">
                                        { props.lang == 0 && '전문가'}
                                        { props.lang == 1 && 'Expert only'}
                                        { props.lang == 2 && 'chuyên gia'}
                                    </label>
                                </div>
                                <div className="quantity_box">
                                    <span className="quantity_title">
                                        <i className="fas fa-calendar-day"></i>
                                    </span>
                                    <div className="quantity_inde">
                                        <a className="quantity_minus point"
                                            onClick={()=>{
                                                if(state.dateIndex > 0) setState({...state, dateIndex : state.dateIndex - 1})
                                            }}
                                        >
                                            <img className="i_24 i_minus" src="/static/img/minus.png" alt="minus"/>
                                        </a>
                                        <span className="date-value">
                                            {props.lang == 0 && state.date[state.dateIndex]}
                                            {(props.lang == 1 && state.date[state.dateIndex] == '전체') && 'All'}
                                            {(props.lang == 1 && state.date[state.dateIndex] == '당일') && 'A day'}
                                            {(props.lang == 1 && state.date[state.dateIndex] == '1박2일') && '2 days'}
                                            {(props.lang == 1 && state.date[state.dateIndex] == '2박3일') && '3 days'}
                                            {(props.lang == 1 && state.date[state.dateIndex] == '3박4일') && '4 days'}
                                            {(props.lang == 1 && state.date[state.dateIndex] == '일주일') && 'A week'}
                                            {(props.lang == 1 && state.date[state.dateIndex] == '한달') && 'A month'}
                                            {(props.lang == 2 && state.date[state.dateIndex] == '당일') && 'A day'}
                                            {(props.lang == 2 && state.date[state.dateIndex] == '1박2일') && '2 days'}
                                            {(props.lang == 2 && state.date[state.dateIndex] == '2박3일') && '3 days'}
                                            {(props.lang == 2 && state.date[state.dateIndex] == '3박4일') && '4 days'}
                                            {(props.lang == 2 && state.date[state.dateIndex] == '일주일') && 'A week'}
                                            {(props.lang == 2 && state.date[state.dateIndex] == '한달') && 'A month'}
                                        </span>
                                        <a className="quantity_plus point"
                                            onClick={()=>{
                                                if(state.dateIndex < state.date.length-1) setState({...state, dateIndex : state.dateIndex + 1})
                                            }}
                                        >
                                            <img className="i_24 i_plus mr-10" src="/static/img/plus.png" alt="plus"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="option-box-right">
                                <div className="select-option">
                                    <div><i className="fas fa-check-double"></i></div>
                                    <label className="check_box check_box_v2">
                                        <span>
                                        { props.lang == 0 && '영/유아'}
                                        { props.lang == 1 && 'Kid-friendly'}
                                        { props.lang == 2 && 'đứa trẻ'}
                                        </span>
                                        <input type="checkbox"  name="young"
                                            onClick={handleCheckoptionChange}
                                        />
                                        <span className="check_icon"></span>
                                    </label>
                                    <label className="check_box check_box_v2">
                                        <span>
                                        { props.lang == 0 && '장애인'}
                                        { props.lang == 1 && 'Disabled'}
                                        { props.lang == 2 && 'Tàn tật'}
                                        </span>
                                        <input type="checkbox"  name="disabled"
                                            onClick={handleCheckoptionChange}
                                        />
                                        <span className="check_icon"></span>
                                    </label>
                                    <label className="check_box check_box_v2">
                                        <span>
                                        { props.lang == 0 && '반려동물'}
                                        { props.lang == 1 && 'Pet-friendly'}
                                        { props.lang == 2 && 'Vật nuôi'}
                                        </span>
                                        <input type="checkbox"  name="animal"
                                            onClick={handleCheckoptionChange}
                                        />
                                        <span className="check_icon"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="box_default filter-v2-right">
                    <Link to={props.searchUrl} className="filter_change_inner">
                        <img className="i_24 i_map mr-10" src="/static/img/map.png" alt="map" />
                        <span>{props.searchText}</span>
                    </Link>
                </div>
            </div>
        </div>
    </React.Fragment>
    ) 
}


// class Filter extends React.Component{
//     constructor(){
//         super();
//         this.state = {
//             km : 20,
//             defaultOption: 1,
//             date : ['전체','당일','1박 2일','2박 3일','3박 4일','일주일','한달'],
//             dateIndex : 0,
//             young : false,
//             disabled : false,
//             animal : false,
//         }
//     }
//     //기본 정렬 값 변경
//     handleDefaultoptionChange(e){
//         console.log(e.target.value);
//         this.setState({defaultOption : e.target.value});
//     }
//     //기본 정렬 값 변경
//     handleCheckoptionChange(e){
//         console.log(e.target.name);
//         console.log(e.target.checked);
//         if(e.target.name == 'young') this.setState({young : e.target.checked});
//         else if(e.target.name == 'disabled') this.setState({disabled : e.target.checked});
//         else if(e.target.name == 'animal') this.setState({animal : e.target.checked});
//     }

//     //최종 필터설정 이후 검색했을 때 값들을 부모에게 보내주기
//     handleNearSearch(){
//         this.props.clickNearSearch(
//             this.state.km,
//             this.state.defaultOption,
//             this.state.date[this.state.dateIndex],
//             [this.state.young, this.state.disabled, this.state.animal]
//         );
//     }
    

//     render(){
//         return(
//             <React.Fragment>
//                 <div className="layout_grid">
//                     <div className="filter-v2">
//                         <input id="upDownInput" type="checkbox" />
//                         <div className="box_default filter-v2-left">
//                             <a className="filter_location_inner point" id="recommend_near_search"
//                                 onClick={this.handleNearSearch.bind(this)}
//                             >
//                                 <img className="i_24 i_location_on mr-10" src="/static/img/location_on.png" alt="location_on"/>
//                                 <span>주변 바로검색</span>
//                             </a>
//                         </div>
//                         <div className="box_default filter-v2-center">
//                             <div className="filter-v2-center-top">
//                                 <div className="filter-v2-center-top-left">
//                                     <div className="quantity_box">
//                                         <span className="quantity_title">
//                                             <i className="fas fa-street-view"></i>
//                                         </span>
//                                         <div className="quantity_inde">
//                                             <a className="quantity_minus point"
//                                                 onClick={()=>{
//                                                     if(this.state.km > 5) this.setState({km:this.state.km-5})
//                                                 }}
//                                             >
//                                                 <img className="i_24 i_minus" src="/static/img/minus.png" alt="minus"/>
//                                             </a>
//                                             <input 
//                                                 type="number" 
//                                                 className="quantity_result_distance avoid_clicks" 
//                                                 placeholder={this.state.km} 
//                                                 id="distance_number"
//                                             />
//                                             <span style={{marginRight:"10px"}}>km</span>
//                                             <a className="quantity_plus point"
//                                                 onClick={()=>{
//                                                     if(this.state.km < 100) this.setState({km:this.state.km+5})
//                                                 }}
//                                             >
//                                                 <img className="i_24 i_plus mr-10" src="/static/img/plus.png" alt="plus"/>
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="filter-v2-center-top-right">
//                                     <div className="filter_setup_open_button">
//                                         <label htmlFor="upDownInput">
//                                             상세검색
//                                             <i className="fas fa-arrow-circle-down"></i>
//                                             <i className="fas fa-arrow-circle-up"></i>
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="box_default filter-v2-center-bottom" style={{bottom:"-185px"}}>
//                                 <div className="title">
//                                     <i className="fas fa-filter"></i>
//                                     필터
//                                 </div>
//                                 <div className="option-box">
//                                     <div className="option-box-left">
//                                         <div className="default-option">
//                                             <div className=""><i className="fas fa-sort-amount-down-alt"></i></div>
//                                             <input id="defaultOption1" name="defaultOption" type="radio" defaultChecked
//                                                 defaultValue="1"
//                                                 onClick={this.handleDefaultoptionChange.bind(this)}
//                                             />
//                                             <label className=""  htmlFor="defaultOption1">최신순</label>
//                                             <input id="defaultOption2" name="defaultOption" type="radio"
//                                                 defaultValue="2"
//                                                 onClick={this.handleDefaultoptionChange.bind(this)}
//                                             />
//                                             <label className="" htmlFor="defaultOption2">별점순</label>
//                                             <input id="defaultOption3" name="defaultOption" type="radio"
//                                                 defaultValue="3"
//                                                 onClick={this.handleDefaultoptionChange.bind(this)}
//                                             />
//                                             <label className="" htmlFor="defaultOption3">리뷰순</label>
//                                             <input id="defaultOption4" name="defaultOption" type="radio"
//                                                 defaultValue="4"
//                                                 onClick={this.handleDefaultoptionChange.bind(this)}
//                                             />
//                                             <label className="" htmlFor="defaultOption4">전문가</label>
//                                         </div>
//                                         <div className="quantity_box">
//                                             <span className="quantity_title">
//                                                 <i className="fas fa-calendar-day"></i>
//                                             </span>
//                                             <div className="quantity_inde">
//                                                 <a className="quantity_minus point"
//                                                     onClick={()=>{
//                                                         if(this.state.dateIndex > 0) this.setState({dateIndex : this.state.dateIndex - 1})
//                                                     }}
//                                                 >
//                                                     <img className="i_24 i_minus" src="/static/img/minus.png" alt="minus"/>
//                                                 </a>
//                                                 <span className="date-value">{this.state.date[this.state.dateIndex]}</span>
//                                                 <a className="quantity_plus point"
//                                                     onClick={()=>{
//                                                         if(this.state.dateIndex < this.state.date.length-1) this.setState({dateIndex : this.state.dateIndex + 1})
//                                                     }}
//                                                 >
//                                                     <img className="i_24 i_plus mr-10" src="/static/img/plus.png" alt="plus"/>
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="option-box-right">
//                                         <div className="select-option">
//                                             <div><i className="fas fa-check-double"></i></div>
//                                             <label className="check_box check_box_v2">
//                                                 <span>영/유아</span>
//                                                 <input type="checkbox"  name="young"
//                                                     onClick={this.handleCheckoptionChange.bind(this)}
//                                                 />
//                                                 <span className="check_icon"></span>
//                                             </label>
//                                             <label className="check_box check_box_v2">
//                                                 <span>장애인</span>
//                                                 <input type="checkbox"  name="disabled"
//                                                     onClick={this.handleCheckoptionChange.bind(this)}
//                                                 />
//                                                 <span className="check_icon"></span>
//                                             </label>
//                                             <label className="check_box check_box_v2">
//                                                 <span>반려동물</span>
//                                                 <input type="checkbox"  name="animal"
//                                                     onClick={this.handleCheckoptionChange.bind(this)}
//                                                 />
//                                                 <span className="check_icon"></span>
//                                             </label>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="box_default filter-v2-right">
//                             <Link to={this.props.searchUrl} className="filter_change_inner">
//                                 <img className="i_24 i_map mr-10" src="/static/img/map.png" alt="map" />
//                                 <span>{this.props.searchText}</span>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </React.Fragment>
//         ) 
//     }
// }
export default Filter;