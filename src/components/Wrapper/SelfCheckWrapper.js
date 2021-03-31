import React from 'react';

//로그인한 유저와 게시글, 리뷰의 유저가 자기 자신인지 판별하고 자기 자신일 경우에 보일지 안보일지 상태
function SelfCheckWrapper(props){
    let loginUserId = document.querySelector('#root').getAttribute('user_id');
    let result;
    if(!props.hide){
        result = props.matchId == +loginUserId ? props.children : null
    }else{
        result = props.matchId != +loginUserId ? props.children : null
    } 
    return(
        <React.Fragment>
            { result }
        </React.Fragment>
    )
}
export default SelfCheckWrapper;