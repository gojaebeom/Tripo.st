import React, { useState } from 'react';
import { loginCheck } from '../../utils/loginCheck';
import { Redirect } from 'react-router-dom';
import { isLiked } from '../../apis/spotApi/spotApis';

function LikeButton(props){
    const [redirect, setRedirect] = useState(false);
    const clickButton = async () => {
        props.isLoading(true);
        let {login, move} = loginCheck();
        if(move){
            setRedirect({redirect:true});
        }
        if(login){
            let res = await isLiked(props.spotId);
            props.setLike(res.result, props.userId);
        }
        props.isLoading(false);
    }

    if(redirect) return <Redirect to="/users/login"/>;
    return (
        <React.Fragment>
            <button className="bookmark_button" onClick={clickButton}>
                <span>
                    {props.lang == 0 && '좋아요'}
                    {props.lang == 1 && 'like'}
                    {props.lang == 2 && 'like'}
                </span>
                <i className="fas fa-heart" style={{
                    color:(props.isLiked) ? '#E74C3C' : '#D0D3D4'
                }}></i>
            </button>
        </React.Fragment>
    )
}
export default LikeButton;

// class LikeButton extends React.Component{
//     constructor(){
//         super();
//         this.state = {
//             redirect : false,
//         }
//     }

//     async clickButton() {
//         this.props.isLoading(true);
//         let {login, move} = loginCheck();
//         if(move){
//             this.setState({redirect:true});
//         }
//         if(login){
//             let result = await isLiked(this.props.spotId);
//             console.log(result.result);
//             this.props.setLike(result.result);
//         }
//         this.props.isLoading(false);
//     }

//     render() {
//         if(this.state.redirect) return <Redirect to="/users/login"/>;
//         return (
//             <React.Fragment>
//                 <button className="bookmark_button" onClick={this.clickButton.bind(this)}>
//                     <span>좋아요</span>
//                     <i className="fas fa-heart" style={{
//                         color:(this.props.isLiked) ? '#E74C3C' : '#D0D3D4'
//                     }}></i>
//                 </button>
//             </React.Fragment>
//         )
//     }
// }
