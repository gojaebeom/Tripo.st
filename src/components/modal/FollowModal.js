import React from 'react';
import { Link } from 'react-router-dom';
import FollowButton from '../buttons/FollowButton';

function FollowModal(props){
    const closeFollowModal = () => {
        props.close();
    }
    const clickProfile = (e) => {
        console.log(e.currentTarget.getAttribute('userid'));
        props.changeUserDetail(e.currentTarget.getAttribute('userid'));
    }

    return(
    <React.Fragment>
        {
            props.open &&
            <div className="follow_container" onClick={(e)=>{
                if(e.target === e.currentTarget) closeFollowModal();
            }}>
                <div className="follow box_default">
                    <div className="follow_inner">
                        <i className="fas fa-times" style={{fontSize:'30px',color:'#283747',cursor:'pointer'}}
                            onClick={closeFollowModal}
                        ></i>
                        <div className="follow_title">{props.title}</div>
                        <div className="follow_list_wrap">
                            <ul>
                                {
                                    props.follow.map((el, index)=>{
                                        return (
                                            <li key={index}>
                                                <div className="follow_list_profile">
                                                    <Link to={'/users/'+el.user.pk} className="follow_list_profile_img_wrap"
                                                        userid={el.user.pk}
                                                        onClick={clickProfile}
                                                    >
                                                        <img
                                                            className="follow_list_profile_img point" 
                                                            src={(el.user.profile_photo) ? '/media/'+el.user.profile_photo : '/static/img/profile_default.png'}
                                                            alt="profile_default" 
                                                            style={{width:"60px",height:"60px"}}
                                                        />
                                                        {el.user.expert == 1 &&  <div className="master_img"><img src="/static/img/master.png" alt="master"/></div>}
                                                    </Link>
                                                    <Link to={'/users/'+el.user.pk} className="follow_list_profile_name point"
                                                        userid={el.user.pk}
                                                        onClick={clickProfile}
                                                    >{el.user.nickname}</Link>
                                                </div>
                                                <div className="follow_list_action">
                                                    <FollowButton 
                                                        lang={props.lang}
                                                        userId={el.user.pk}
                                                        setFollow={props.setFollow}
                                                        isFollowed={el.is_follow}
                                                        isLoading={props.isLoading}
                                                    />
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        }
        
    </React.Fragment>
    )
}
export default FollowModal;