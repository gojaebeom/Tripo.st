import React from 'react';
import { spotNearList } from '../../apis/spotApi/spotApis';
import {  drawGoogleMapV2 } from '../../utils/googleMap/GoogleMap';
import Filter from '../../components/filter/Filter';

class NearSpotMap extends React.Component{
    constructor(){
        super();
        this.state = {
            count : 0,
            hasMore : true,
            cardList : [],
            filter:{
                km : 20,
            },

            searchFind : false,
            searchData : [],
            searchCard : [],
        }
    }

    componentDidUpdate(){
        console.log(this.state.cardList);
    }

    async componentDidMount(){
        await this.clickNearSearch(20, 1, '전체', [false,false,false]);
    }

    async clickNearSearch(km, defaultSort, date, additionSort){
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
        console.log(pos.coords.longitude);
        console.log(pos.coords.latitude);
        let res = await spotNearList(pos.coords.latitude, pos.coords.longitude, km, defaultSort, date, additionSort);
        await drawGoogleMapV2(pos.coords.latitude, pos.coords.longitude, res.result);
        
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
            cardList : res.result
        });
        this.props.isLoading(false);
    }


    render(){
        let searchText = '목록으로 검색';
        if(this.props.lang == 1) searchText = 'Search by list';
        if(this.props.lang == 2) searchText = 'Tìm kiếm theo danh sách';
        return(
            <React.Fragment>
                <Filter 
                    lang={this.props.lang}
                    clickNearSearch={this.clickNearSearch.bind(this)}
                    searchText={searchText}
                    searchUrl={'/nears'}
                />
                <div className="layout_wide">
                    <div className="google_map_container" style={{width:"100%",height:"1000px"}}></div>
                </div>
            </React.Fragment>
        )
    }
}

export default NearSpotMap;