import React from 'react';
import { recommendMainList, recommendNearList, recommendSearch } from '../../apis/recommendApi/RecommendApis';
import GridCard from '../../components/gridCard/GridCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import RecommendFilter from '../../components/filter/RecommendFilter';
import CircularProgress from '@material-ui/core/CircularProgress';

class RecommendSpot extends React.Component{
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

    componentDidMount(){
        this.getRecommendAPi();
    }

    async getRecommendAPi(){
        this.props.isLoading(true);
        let res = await recommendMainList(this.state.count,this.props.lang);
        this.setState({
            count : this.state.count+1,
            cardList : this.state.cardList.concat(res)
        });
        this.props.isLoading(false);
    }

    async clickNearSearch(){
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
        let res = await recommendNearList(pos.coords.latitude, pos.coords.longitude, this.state.filter.km, this.props.lang);

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
        this.props.isLoading(false);
    }

    async getSearchSpotList(search){
        this.props.isLoading(true);
        let res = await recommendSearch(search,this.props.lang);
        let searchData =[];
        for(let i of res){
            searchData.push({'title':i.title, 'pk':i.contentid});
        }
        console.log(searchData);
        if(res.length != 0 && search != '') this.setState({searchFind : true, searchData : searchData});
        else this.setState({searchFind : false, searchData : [], searchCard : []});

        this.props.isLoading(false);
    }

    changeSpotList(){
        console.log('실행됨!!!');
        console.log(this.state.searchData);
        let searchCard = [];
        for(let i of this.state.cardList){
            console.log(i.recommend_list.contentid);
            for(let j of this.state.searchData){
                if(i.recommend_list.contentid == j.pk){
                    searchCard.push(i);
                }
            }
        }
        //if(searchCard.length != 0) this.setState({searchCard : searchCard, searchFind : false});
        this.setState({searchCard : searchCard, searchFind : false});
    }

    render(){
        let searchText = '지도로 검색';
        if(this.props.lang == 1) searchText = 'Search on map';
        if(this.props.lang == 2) searchText = 'Tìm kiếm bằng bản đồ';
        return (
            <React.Fragment>
                <RecommendFilter 
                    lang={this.props.lang}
                    clickNearSearch={this.clickNearSearch.bind(this)}
                    decreamentKm={()=>{
                        if(this.state.filter.km > 5) this.setState({filter:{km:this.state.filter.km-5}})
                        
                    }}
                    increamentKm={()=>{
                        if(this.state.filter.km < 100) this.setState({filter:{km:this.state.filter.km+5}})
                    }}
                    km={this.state.filter.km}
                    searchText={searchText}
                    searchUrl={'/recommends/map'}

                    //서치 관련 props
                    getSearchSpotList={(search)=>{ this.getSearchSpotList(search);}}
                    searchFind={this.state.searchFind}
                    searchData={this.state.searchData}
                    changeSpotList={this.changeSpotList.bind(this)}
                />
                <div className="layout_wide">
                    <div className="card_list_grid_wrap">
                        {
                            this.state.searchCard.length == 0 ?
                            <InfiniteScroll
                                style={{width:'100%',display:"flex",flexWrap:"wrap"}}
                                dataLength={this.state.cardList.length}
                                next={this.getRecommendAPi.bind(this)}
                                hasMore={ this.state.hasMore }
                                loader={null}
                                endMessage={
                                    this.state.finished ?
                                    <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                    </p> : 
                                    null
                                }
                            >
                            {(this.state.cardList.length == 0) ? 
                            <div style={{width:'100%',position:'absolute',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                {/* <CircularProgress /> */}
                            </div>:
                            this.state.cardList.map((e, index) => {
                                // console.log(e);
                                return (
                                    <GridCard 
                                        lang={this.props.lang}
                                        key={index}
                                        data={e}
                                        setSnackbar={this.props.setSnackbar}
                                    />
                                )
                            }) }
                            </InfiniteScroll> : 
                            this.state.searchCard.map((e, index) => {
                                return (
                                    <GridCard 
                                        lang={this.props.lang}
                                        key={index}
                                        data={e}
                                        setSnackbar={this.props.setSnackbar}
                                    />
                                )
                            })
                        }
            
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default RecommendSpot;