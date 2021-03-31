import React, { useState } from 'react';
import { loginCheck } from '../../utils/loginCheck';
import { Redirect } from 'react-router-dom';
import { isFollowed } from '../../apis/spotApi/spotApis';


function FollowButton(props){

    const [redirect, setRedirect] = useState(false);
    const clickButton = async () => {
        props.isLoading(true);
        let {login, move} = loginCheck();
        if(move){
            setRedirect({redirect:true});
        }
        if(login){
            let res = await isFollowed(props.userId);
            console.log(res.result);
            props.setFollow(res.result, props.userId);
        }
        props.isLoading(false);
    }

    if(redirect) return <Redirect to="/users/login"/>;

    console.log('--------------');
    console.log(props.isFollowed);
    return (
        <React.Fragment>
            <button className="follow_button" 
                onClick={clickButton}
                style={{background:(props.isFollowed)?'#A6ACAF':'#8c14fc'}}
            >
                <span>
                    {
                        (props.isFollowed)?
                        
                        <span>
                            {props.lang == 0 && '언팔로우'}
                            {props.lang == 1 && 'Unfollow'}
                            {props.lang == 2 && 'bỏ theo dõi'}
                        </span>:
                        <span>
                            {props.lang == 0 && '팔로우'}
                            {props.lang == 1 && 'Follow'}
                            {props.lang == 2 && 'Theo'}
                        </span>
                    }
                </span>
            </button>
        </React.Fragment>
    )
}

export default FollowButton;

// class FollowButton extends React.Component{
//     constructor(){
//         super();
//         this.state = {
//             redirect : false,
//             hide : false,
//         }
//     }

//     componentDidMount(){
//         // console.log(`팔로우 버튼이 받은 작성자 아이디 ${this.props.userId}`);
//     }

//     async clickButton() {
//         this.props.isLoading(true);
//         let {login, move} = loginCheck();
//         if(move){
//             // console.log('로그인 유무 확인');
//             this.setState({redirect:true});
//         }
//         if(login){
//             // console.log('로그인은 한상태임');
//             // console.log(this.props.userId);
//             let result = await isFollowed(this.props.userId);
//             console.log(result.result);
//             this.props.setFollow(result.result, this.props.userId);
//         }
//         this.props.isLoading(false);
//     }

//     render() {
//         if(this.state.redirect) return <Redirect to="/users/login"/>;
//         return (
//             <React.Fragment>
//                 <button className="follow_button" 
//                     onClick={this.clickButton.bind(this)}
//                     style={{background:(this.props.isFollowed)?'#A6ACAF':'#8c14fc'}}
//                 >
//                     <span>
//                         {(this.props.isFollowed)?'언팔로우':'팔로우'}
//                     </span>
//                 </button>
//             </React.Fragment>
//         )
//     }
// }

