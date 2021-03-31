import React from 'react';
import { spotMainList, spotSearch } from '../../apis/spotApi/spotApis';
import MasonryCard from '../../components/masonryCard/MasonryCard';
import Search from '../../components/search/Search';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Sleep } from '../../utils/sleep/Sleep';
import { errorCheck } from '../../utils/error_check';
import CircularProgress from '@material-ui/core/CircularProgress';

class ThemeSpot extends React.Component{
    constructor(){
        super();
        this.state = {
            card : [],
            count : 0,
            finished : false,
            searchData : [],
            searchCard : [],
            theme : 1,

            hasMore : true
        }
    }

    async componentDidMount(){
        await Sleep(500);
        await this.getSpotList();
    }

    async getSpotList(){
        console.log(this.props.number);
        this.props.isLoading(true);
        let result = await spotMainList(this.state.count, '', this.state.theme);
        console.log(result);
        if(result.result != false){
            // console.log(result.result);
            this.setState({
                card  : this.state.card.concat(result.result),
                count : this.state.count+1 
            });
            // console.log(this.state.count);
        }else{
            this.setState({finished : true});
        }

        this.props.isLoading(false);
    }

    async getSearchSpotList(search){
        this.props.isLoading(true);
        let res = await spotSearch(search, this.state.theme);
        console.log(res);
        if(res.result.length != 0) this.setState({searchData : res.result});
        else this.setState({searchData : [], searchCard : []});
        this.props.isLoading(false);
    }

    async clickTab(e){
        this.props.isLoading(true);
        /**@styleEffect click effect */
        let tabs = e.currentTarget.parentNode.childNodes;
        for(let tab of tabs){
            if(tab.classList.contains('active')) tab.classList.remove('active');
        }
        e.currentTarget.classList.add('active');
        /**@styleEffectEnd */

        this.setState({count : 0});

        /**@getApi switch apis */
        if(e.currentTarget.id == 'camp'){
            let spots = await spotMainList(0, '', 1);
            console.log(spots);
            spots.result.length != 0 ? 
            this.setState({card : spots.result, theme : 1, count: 0}) : 
            this.setState({card : spots.result, theme : 1, finished : true})
        }else if(e.currentTarget.id == 'car'){
            let spots = await errorCheck(spotMainList(0, '', 2));
            console.log(spots);
            spots.result.length != 0 ? 
            this.setState({card : spots.result, theme : 2, count: 0}) : 
            this.setState({card : spots.result, theme : 2, finished : true})
        }else if(e.currentTarget.id == 'night'){
            let spots = await errorCheck(spotMainList(0, '', 3));
            console.log(spots);
            spots.result.length != 0 ? 
            this.setState({card : spots.result, theme : 3, count: 0}) : 
            this.setState({card : spots.result, theme : 3, finished : true})
        }else if(e.currentTarget.id == 'corona'){
            let spots = await errorCheck(spotMainList(0, '', 4));
            console.log(spots);
            spots.result.length != 0 ? 
            this.setState({card : spots.result, theme : 4, count: 0}) : 
            this.setState({card : spots.result, theme : 4, finished : true})
        }
        /**@getApiEnd */
        this.props.isLoading(false);
    }

    changeSpotList(){
        this.setState({searchCard : this.state.searchData, searchFind : true });
    }

    

    render(){
        return(
            <React.Fragment>
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PCNQL9F"
                height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
                <div className="search layout_grid">
                    <div className="search_inner">
                        <div className="search_box_wrap">
                            <Search 
                                lang={this.props.lang}
                                getSearchSpotList={(search)=>{ this.getSearchSpotList(search);}}
                                searchFind={this.state.searchFind}
                                searchData={this.state.searchData}
                                changeSpotList={this.changeSpotList.bind(this)}
                                setSnackbar={this.props.setSnackbar}
                            />
                        </div>
                    </div>
                </div>
                <div className="filter_tab_gnb layout_grid">
                    <ul className="tab_list">
                        <li 
                            className="active point" 
                            id="camp"
                            onClick={this.clickTab.bind(this)}
                        >
                            <div className="tab_title">
                                {this.props.lang == 0 && '캠핑'}
                                {this.props.lang == 1 && 'Camping'}
                                {this.props.lang == 2 && 'Cắm trại'}
                            </div>
                        </li>
                        <li 
                            className="point"
                            id="car"
                            onClick={this.clickTab.bind(this)}
                        >
                            <div className="tab_title">
                                {this.props.lang == 0 && '차박'}
                                {this.props.lang == 1 && 'Auto camping'}
                                {this.props.lang == 2 && 'Cắm trại tự động'}
                            </div>
                        </li>
                        <li
                            className="point"
                            id="night"
                            onClick={this.clickTab.bind(this)}
                        >
                            <div className="tab_title">
                                {this.props.lang == 0 && '야경'}
                                {this.props.lang == 1 && 'Night view'}
                                {this.props.lang == 2 && 'Cảnh đêm'}
                            </div>
                        </li>
                        <li
                            className="point"
                            id="corona"
                            onClick={this.clickTab.bind(this)}
                        >
                            <div className="tab_title">
                                {this.props.lang == 0 && '코로나 x'}
                                {this.props.lang == 1 && 'COVID-19 free'}
                                {this.props.lang == 2 && 'COVID-19 miễn phí'}
                            </div>
                        </li>
                        <li className="tab_list_last">
                            <div className="tab_title" style={{textIndent: "-9999px"}}>여백</div>
                        </li>
                    </ul>
                </div>
                <div className="layout_full">
                    <div className="card_list_masonry">
                        {
                            this.state.searchCard.length == 0 ?
                            <InfiniteScroll
                                dataLength={this.state.card.length}
                                next={this.getSpotList.bind(this)}
                                hasMore={this.state.hasMore}
                            >
                                {(this.state.card.length == 0) ? 
                                <div style={{width:'100%',textAlign:'center'}}>
                                    {
                                        this.state.finished ? 
                                        <div>
                                            {this.props.lang == 0 && '게시물이 존재하지 않습니다.' }
                                            {this.props.lang == 1 && 'Post does not exist.' }
                                            {this.props.lang == 2 && 'Bài đăng không tồn tại.' }
                                        </div> : 
                                        <div style={{width:'100%',position:'absolute'}}>
                                            <CircularProgress />
                                        </div>
                                    }
                                </div> :
                                <MasonryCard 
                                    lang={this.props.lang}
                                    data={this.state.card} 
                                />
                                }
                            </InfiniteScroll> : 
                            
                            <MasonryCard 
                                lang={this.props.lang}
                                data={this.state.searchCard}
                            />
                        }
                    
                    </div>
                </div>
                

            </React.Fragment>
        )
    }
}

export default ThemeSpot;