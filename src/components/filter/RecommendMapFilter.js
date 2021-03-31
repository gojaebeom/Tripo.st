import React from 'react';
import { Link } from 'react-router-dom';

function RecommendMapFilter(props){
    return(
    <React.Fragment>
        <div className="layout_grid">
            <div className="filter-v2">
                <input id="upDownInput" type="checkbox" />
                <div className="box_default filter-v2-left">
                    <a className="filter_location_inner point" id="recommend_near_search"
                        onClick={()=>props.clickNearSearch()}
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
                    <div className="filter-v2-center-top" style={{justifyContent:'center'}}>
                        <div className="filter-v2-center-top-left">
                            <div className="quantity_box">
                                <span className="quantity_title">
                                    <i className="fas fa-street-view"></i>
                                </span>
                                <div className="quantity_inde">
                                    <a className="quantity_minus point"
                                        onClick={()=>props.decreamentKm()}
                                    >
                                        <img className="i_24 i_minus" src="/static/img/minus.png" alt="minus"/>
                                    </a>
                                    <input 
                                        type="number" 
                                        className="quantity_result_distance avoid_clicks" 
                                        placeholder={props.km} 
                                        id="distance_number"
                                    />
                                    <span style={{marginRight:"10px"}}>km</span>
                                    <a className="quantity_plus point"
                                        onClick={()=>props.increamentKm()}
                                    >
                                        <img className="i_24 i_plus mr-10" src="/static/img/plus.png" alt="plus"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="filter-v2-center-top-right">
                            <div className="filter_setup_open_button">
                                {/* <label htmlFor="upDownInput">
                                    상세검색
                                    <i className="fas fa-arrow-circle-down"></i>
                                    <i className="fas fa-arrow-circle-up"></i>
                                </label> */}
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

export default RecommendMapFilter;