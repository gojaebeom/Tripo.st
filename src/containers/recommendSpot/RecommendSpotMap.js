import React from 'react';
import { recommendNearList } from '../../apis/recommendApi/RecommendApis';
import RecommendMapFilter from '../../components/filter/RecommendMapFilter';

class RecommendSpotMap extends React.Component{
    constructor(){
        super();
        this.state = {
            count : 0,
            hasMore : true,
            cardList : [],
            filter:{
                km : 20,
            }
        }
    }

    componentDidMount(){
        this.getRecommendNearAPi();
    }

    componentDidCatch(){
        console.log('%c error!!!!!!!!!!!!!!','color:red');
    }

    async getRecommendNearAPi(){
        this.props.isLoading(true);
        
        let message = '주변을 탐색중입니다..';
        if(this.props.lang == 1) message = 'searching around..';
        if(this.props.lang == 2) message = 'Tôi đang tìm kiếm xung quanh..';
        this.props.setSnackbar({
            type:'INFO',
            open:true, 
            message: message,
            time : 10000,
        });

        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        let res = await recommendNearList(pos.coords.latitude, pos.coords.longitude, this.state.filter.km ,this.props.lang);
        let message2 = '탐색이 완료되었습니다.';
        if(this.props.lang == 1) message2 = 'The search is complete.';
        if(this.props.lang == 2) message2 = 'Việc tìm kiếm đã hoàn tất.';
        this.props.setSnackbar({
            type:'SUCCESS',
            open:true, 
            message: message2,
            time : 6000,
        });
        

        this.setState({
            hasMore : false,
            cardList : res
        });
        await this.drawKakaoMap(pos.coords.latitude, pos.coords.longitude, res);
        this.props.isLoading(false);
    }

    onClick(){
        console.log('helloworld');
    }

    async drawKakaoMap(latitude, longitude, data){

        const clickMe = this.onClick;

        clickMe();

        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level:9
        };

        var map = new kakao.maps.Map(container, options);
        // 마커가 표시될 위치입니다 
        var markerPosition  = new kakao.maps.LatLng(latitude, longitude); 
        // 내 위치 마커 찍기
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: markerPosition, // 마커를 표시할 위치
            title :'내 위치', // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        });
        let iwRemoveable = true;

        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (var i = 0; i < data.length; i ++) {

            let recommend_list = data[i].recommend_list;
            let recommend_detail = data[i].recommend_detail;
            // 마커 위에 표시할 카드 디자인
            //notranslate
            var content = `
            <div class="card_list" style="width:200px;height:200px;margin-bottom:10px;">
                <div class="card card_grid">
                    <div style="width:100%;display:flex;justify-content:center;align-items:center;overflow:hidden;">
                        <img class="card_img" 
                        src="${ (recommend_list.firstimage)? recommend_list.firstimage : '/static/img/tripo_no_photo04.png' }" 
                        alt="" style="width:100%;height:120px;">
                    </div>
                    
                    <div class="card_action_wrap">
                        <div class="card_action">
                            <div class="card_info">
                                <div class="card_view_btn">
                                    <div class="round_box_btn">
                                        <a class="point" data-id="${recommend_list.contentid}"
                                            onclick="location.href='/recommends/'+this.dataset.id"
                                        >자세히보기</a>
                                    </div>
                                </div>
                                <div class="card_info_inner">
                                    <div class="card_info_tag">
                                        <div class="traffic">
                                            
                                        </div>
                                    </div>
                                    <div class="card_info_summary">
                                        <a class="point">
                                            <h4 class="card_info_title" >${recommend_list.title}</h4>
                                            <p class="card_info_desc"
                                            style="display: inline-block; width:80%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                                            >${
                                                (recommend_detail != undefined)? recommend_detail.overview : '내용없음'
                                            
                                                } 
                                            </p>
                                        </a>
                                    </div>
                                    <div class="card_info_footer">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>`;
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35); 
            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position:  new kakao.maps.LatLng(recommend_list.mapy, recommend_list.mapx), // 마커를 표시할 위치
                title : recommend_list.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage // 마커 이미지 
            });
            // 마커에 표시할 인포윈도우를 생성합니다 
            var infowindow = new kakao.maps.InfoWindow({
                content: content,// 인포윈도우에 표시할 내용
                removable : iwRemoveable
            });
            // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
            // 이벤트 리스너로는 클로저를 만들어 등록합니다 
            // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
            kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
            //kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        }
        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        function makeOverListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
                infowindow.Sf.parentNode.style.border = 'none';
                infowindow.Sf.parentNode.style.background = 'none';
            };
        }
        // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
        function makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        }
        /* ------------------------------------------------------------------------------ */
    }


    render(){
        let searchText = '목록으로 검색';
        if(this.props.lang == 1) searchText = 'Search by list';
        if(this.props.lang == 2) searchText = 'Tìm kiếm theo danh sách';
        return (
            <React.Fragment>
                <RecommendMapFilter
                    lang={this.props.lang}
                    clickNearSearch={this.getRecommendNearAPi.bind(this)}
                    decreamentKm={()=>{
                        if(this.state.filter.km > 5) this.setState({filter:{km:this.state.filter.km-5}})
                    }}
                    increamentKm={()=>{
                        if(this.state.filter.km < 100) this.setState({filter:{km:this.state.filter.km+5}})
                    }}
                    km={this.state.filter.km}
                    searchText={searchText}
                    searchUrl={'/recommends'}
                />
                <div className="layout_wide notranslate">
                    <div id="map" style={{width:"100%",height:"1000px"}} className="root_daum_roughmap root_daum_roughmap_landing box_map"></div>
                </div>
                <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=847e05748b8da0044c1e7f5ca35a863f"></script>
            </React.Fragment>
        )
    }
}

export default RecommendSpotMap;