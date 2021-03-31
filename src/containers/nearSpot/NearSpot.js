import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { spotMainList, spotNearList } from '../../apis/spotApi/spotApis';
import Filter from '../../components/filter/Filter';
import GridCardV2 from '../../components/gridCard/GridCardV2';
import CircularProgress from '@material-ui/core/CircularProgress';

class NearSpot extends React.Component{
    constructor(){
        super();
        this.state = {
            count : 0,
            hasMore : true,
            cardList : [],
            finished : false,
            filter:{
                km : 20,
            },

            searchFind : false,
            searchData : [],
            searchCard : [],

            dateSort : '',
        }
    }

    async componentDidMount(){
        this.getSpotsApi();
    }

    async getSpotsApi(){
        this.props.isLoading(true);
        let res = await spotMainList(this.state.count, '');
        console.log(res);
        // console.log(result.result);
        if(res.result.length != 0){
            // console.log(result.result);
            this.setState({
                count : this.state.count+1,
                cardList : this.state.cardList.concat(res.result),
                finished : false,
            });
            // console.log(this.state.count);
        }else{
            this.setState({finished : true});
        }
        
        this.props.isLoading(false);
    }

    async clickNearSearch(km, defaultSort, date, additionSort){
        console.log(`거리 : ${km}, 기본정렬 : ${defaultSort}, 여행기간 : ${date}`);
        console.log(`young : ${additionSort[0]}`);
        console.log(`disabled : ${additionSort[1]}`);
        console.log(`animal : ${additionSort[2]}`);
        this.props.isLoading(true);

        //'주변을 탐색중입니다..'
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

        let message2 = '탐색이 완료되었습니다.';
        if(this.props.lang == 1) message2 = 'The search is complete.';
        if(this.props.lang == 2) message2 = 'Việc tìm kiếm đã hoàn tất.';
        this.props.setSnackbar({
            type:'SUCCESS',
            open:true, 
            message: message2,
            time : 6000,
        });

        if(res.result.length != 0 ) {
            this.setState({
                hasMore : false,
                cardList : res.result,
                finished : false
            });
        }else {
            this.setState({
                hasMore : false,
                cardList : res.result,
                finished : true
            });
        }
        
        this.props.isLoading(false);
    }

    render(){
        let searchText = '지도로 검색';
        if(this.props.lang == 1) searchText = 'Search on map';
        if(this.props.lang == 2) searchText = 'Tìm kiếm bằng bản đồ';
        return (
        <React.Fragment>
            <Filter 
                lang={this.props.lang}
                clickNearSearch={this.clickNearSearch.bind(this)}
                searchText={searchText}
                searchUrl={'/nears/map'}
            />
            {
            <InfiniteScroll
                style={{width:'100%',display:"flex",flexWrap:"wrap"}}
                dataLength={this.state.cardList.length}
                next={this.getSpotsApi.bind(this)}
                hasMore={this.state.hasMore}
            >
                <div className="layout_wide">
                    <div className="card_list_grid_wrap" style={{width:'100%',display:'flex',justifyContent:'flex-start'}}>
                        {(this.state.cardList.length == 0) ? 
                        <div style={{width:'100%',textAlign:'center'}}>
                            {
                                this.state.finished ? 
                                <div>
                                    {this.props.lang == 0 && '게시물이 존재하지 않습니다.' }
                                    {this.props.lang == 1 && 'Post does not exist.' }
                                    {this.props.lang == 2 && 'Bài đăng không tồn tại.' }
                                </div> : 
                                <div style={{width:'100%',position:'absolute'}}>
                                    {/* <CircularProgress /> */}
                                </div>
                            }
                        </div> :
                        this.state.cardList.map((e, index) => {
                                return (
                                    <GridCardV2 
                                        lang={this.props.lang}
                                        key={index}
                                        data={e}
                                        setSnackbar={this.props.setSnackbar}
                                    />
                                )
                        }) }
                    </div>
                </div>
            </InfiniteScroll> 
            }

        </React.Fragment>
        )
    }
}

export default NearSpot;