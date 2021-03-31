import React, { useState } from 'react';
import { loginCheck } from '../../utils/loginCheck';
import { Redirect } from 'react-router-dom';
import { isLiked } from '../../apis/footageApi';

function FootageLikeButton(props){
    const [redirect, setRedirect] = useState(false);
    const clickButton = async () => {
        props.isLoading(true);
        let {login, move} = loginCheck();
        if(move){
            setRedirect({redirect:true});
        }
        if(login){
            let res = await isLiked(`/api/footages/${props.footageId}/like/`);
            console.log(res.result);
            props.setLike(res.result, props.userId);
        }
        props.isLoading(false);
    }

    if(redirect) return <Redirect to="/users/login"/>;
    return (
        <React.Fragment>
            <button className="bookmark_button" onClick={clickButton} style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                padding:'10px'
            }}>
                <i className="fas fa-heart" style={{
                    color:(props.isLiked.result) ? '#E74C3C' : '#D0D3D4'
                }}></i>
                <span style={{
                    marginLeft:'10px',
                    fontSize:'16px'
                }}>
                    {/* {props.lang == 0 && '좋아요'}
                    {props.lang == 1 && 'like'}
                    {props.lang == 2 && 'like'} */}
                    {props.isLiked.count}
                </span>
            </button>
        </React.Fragment>
    )
}
export default FootageLikeButton;