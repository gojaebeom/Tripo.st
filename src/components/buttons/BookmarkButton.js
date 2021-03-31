import React, { useState } from 'react';
import { isBookmarked } from '../../apis/spotApi/spotApis';
import { loginCheck } from '../../utils/loginCheck';
import { Redirect } from 'react-router-dom';

function BookmarkButton(props){

    const [redirect, setRedirect] = useState(false);
    const clickButton = async () => {
        props.isLoading(true);
        let {login, move} = loginCheck();
        if(move){
            setRedirect({redirect:true});
        }
        if(login){
            let res = await isBookmarked(props.spotId);
            props.setBookmark(res.result);
        }
        props.isLoading(false);
    }

    if(redirect) return <Redirect to="/users/login"/>;
    return (
        <React.Fragment>
            <button className="bookmark_button" onClick={clickButton}>
                <span>
                    {props.lang == 0 && '북마크'}
                    {props.lang == 1 && 'bookmark'}
                    {props.lang == 2 && 'bookmark'}
                </span>
                <i className="fas fa-bookmark" style={{
                    color:(props.isBookmarked) ? '#9B59B6' : '#D0D3D4'
                }}></i>
            </button>
        </React.Fragment>
    )
}
export default BookmarkButton;

// class BookmarkButton extends React.Component{
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
//             let result = await isBookmarked(this.props.spotId);
//             console.log(result.result);
//             this.props.setBookmark(result.result);
//         }
//         this.props.isLoading(false);
//     }

//     render() {
//         if(this.state.redirect) return <Redirect to="/users/login"/>;
//         return (
//             <React.Fragment>
//                 <button className="bookmark_button" onClick={this.clickButton.bind(this)}>
//                     <span>북마크</span>
//                     <i className="fas fa-bookmark" style={{
//                         color:(this.props.isBookmarked) ? '#9B59B6' : '#D0D3D4'
//                     }}></i>
//                 </button>
//             </React.Fragment>
//         )
//     }
// }

