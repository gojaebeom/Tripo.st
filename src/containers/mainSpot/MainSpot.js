import React, { useEffect, useState } from 'react';
import { spotMainList, spotSearch } from '../../apis/spotApi/spotApis';
import MasonryCard from '../../components/masonryCard/MasonryCard';
import Search from '../../components/search/Search';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Sleep } from '../../utils/sleep/Sleep';
import CircularProgress from '@material-ui/core/CircularProgress';
import { shuffle } from '../../utils/shuffle';

class MainSpot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            card : [],
            count : 0,
            finished : false,
            searchData : [],
            searchCard : [],
            loadingMessage : '게시물을 불러오고 있습니다..',
            hasMore : true
        }
    }

    // 🎨 render 이후 실행되는 생명주기 메서드 재정의
    // spot list api 호출
    async componentDidMount(){
        console.log('History Check');
        if(history.state == null){
            console.log('History is null');
            this.getSpotList();
        }else if(!history.state.state){
            console.log('History state false');
            this.getSpotList();
        }else{
            console.log('History is checked 🧨');
            this.setState({
                ...history.state,
                state:true,
            })
            Sleep(3000);
        }
    }

    // 🎨 컴포넌트가 소멸될 때 실행되는 함수
    // 메인페이지가 사라질 때 스크롤의 좌표값을 저장해 두기 위해 재정의
    componentWillUnmount(){
        console.log('main spot is deleted');
        // console.log(document.documentElement.scrollHeight);
        console.log(`현재 스크롤 높이 : ${ document.documentElement.scrollTop }`);
        window.localStorage.setItem('scrollTop', document.documentElement.scrollTop);
    }

    async getSpotList(){
        this.props.isLoading(true);

        // 🎨 masonry lib 의 벽돌 겹침 방지
        await Sleep(500);

        // 🎨 spot list api 호출
        // 응답된 객체의 result 값이 정상적이라면 cart 배열에 값을 추가한다. (배열 덮어쓰기 x , 계속해서 추가 o)
        // 그리고 현재 count 상태의 값에 1을 올린다.
        let result = await spotMainList(this.state.count, '', '');
        if(result.result != false){
            console.log(result.result);
            const randomResult = shuffle(result.result);

            await this.setState({
                card  : this.state.card.concat(randomResult),
                count : this.state.count+1 
            });
            console.log(this.state);
            history.replaceState({...this.state, state:true}, null);
            
        }else if(result.result.length == 0){
            this.setState({finished : true});
        }else{
            this.setState({finished : true});
        }
        this.props.isLoading(false);
    }

    // 🎨 검색 api 호출
    // 응답값은 배열 형태이며 검색조건에 맞지 않으면 빈 배열이 반환.
    // 빈 배열이 아니라면 searchData라는 배열형 상태를 업데이트
    async getSearchSpotList(search){
        this.props.isLoading(true);
        let res = await spotSearch(search);
        console.log(res);
        if(res.result.length != 0) this.setState({ searchData : res.result});
        else this.setState({ searchData : [], searchCard : []});
        this.props.isLoading(false);
    }

    // 🎨 검색 api 호출
    // search 컴포넌트에서 enter 이벤트가 발생되면 실행. 
    // searchCard 상태를 searchData 배열값으로 업데이트
    // 화면의 카드리스트가 search와 관련된 스팟들로 리랜더링
    changeSpotList(){
        console.log(this.state.searchData);
        this.setState({searchCard : this.state.searchData });
    }

    render(){

        return (
            <React.Fragment>
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PCNQL9F"
                height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
                <div className="search layout_grid">
                    <div className="search_inner">
                        <div className="search_box_desc">
                            <p>
                                { this.props.lang == 0 && '나만의 여행지를 소개해보세요.' }
                                { this.props.lang == 1 && 'Post your trip' }
                                { this.props.lang == 2 && 'Hãy giới thiệu địa điểm du lịch của riêng bạn.' }
                            </p>
                            <h3>
                                { this.props.lang == 0 && '다음 여행은 어디인가요?' }
                                { this.props.lang == 1 && 'Find your next' }
                                { this.props.lang == 2 && 'Chuyến du lịch tiếp theo là ở đâu?' }
                            </h3>
                        </div>
                        <div className="search_box_wrap">
                            <Search 
                                lang={this.props.lang}
                                getSearchSpotList={(search)=>{ this.getSearchSpotList(search);}}
                                searchData={this.state.searchData}
                                changeSpotList={this.changeSpotList.bind(this)}
                                setSnackbar={this.props.setSnackbar}
                            />
                        </div>
                    </div>
                </div>
                <div className="layout_full">
                        {
                            this.state.searchCard.length == 0 ?
                            <InfiniteScroll
                                dataLength={this.state.card.length}
                                next={this.getSpotList.bind(this)}
                                hasMore={true}
                                loader={null}
                                endMessage={
                                    this.state.finished ?
                                    <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                    </p> : 
                                    null
                                }
                            >
                            {
                                (this.state.card.length == 0) ? 
                                <div style={{width:'100%',textAlign:'center'}}>
                                    {
                                        this.state.finished ? 
                                        <div>
                                            {this.props.lang == 0 && '게시물이 존재하지 않습니다.' }
                                            {this.props.lang == 1 && 'Sorry, we don`t have registered posts yet' }
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
            </React.Fragment>
        )
    }
}

export default MainSpot;