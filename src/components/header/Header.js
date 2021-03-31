import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

/**@Components */
import Navigation from '../navigation/Navigation';

export function Header(props){
    console.log('Header is Mounted');

    console.log(typeof props.lang);

    const [redirect, setRedirect] = useState({
        isRedirect:false,
        redirectTo:'/',
    })
    if(redirect.isRedirect){
        return <Redirect to={redirect.redirectTo}/>
    }

    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = e => { if(e.target === e.currentTarget) setOpen(false); }
    const closeModalFromChild = () => setOpen(false);
    
    return (
        <React.Fragment>
            <header id="header">
                <div className="layout_grid">
                    <div className="hd_inner">
                        <div className="logo_wrap">
                            <h1><Link to="/" ><img src="/static/img/logo.png" alt="logo"/></Link></h1>
                        </div>
                        <div className="gnb_wrap">
                            <nav className="gnb">
                                <ul >
                                    <li>
                                        <Link className="point" to="/tripo-clips/create">
                                            <i className="fas fa-video" style={{
                                                fontSize : '2.1rem',
                                                color : '#F39C12',
                                                marginBottom:'3px'
                                            }}></i>
                                        </Link>
                                    </li>
                                    <li className="active">
                                        <Link className="point" to="/spots/create">
                                            <img src="/static/img/post_upload.png" alt="post_upload"/>
                                        </Link>
                                    </li>
                                    <li 
                                        //모달창 열기 ✨
                                        onClick={openModal}>
                                        <a className="point" id="open_right_slide_snb">
                                            <img src="/static/img/menu.png" alt="menu"/>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                <div id="right_slide_snb" 
                    className={(open == true) ? 'open' : '' }
                    //모달창 닫기 ✨
                    onClick={closeModal}>
                    <div className="right_slide_snb">
                        <div className="right_slide_snb_inner">
                            <a className="right_slide_snb_close point"
                                //모달창 닫기 ✨
                                onClick={closeModalFromChild}
                            ><img className="i_24" src="/static/img/close.png" alt="close"/></a>
                            <div className="logo_wrap">
                                <a href="/" ><img src="/static/img/logo.png" alt="logo"/></a>
                            </div>
                            <nav className="snb">
                                {/* 네비게이션 */}
                                <Navigation 
                                    lang={props.lang}
                                    closeModal={closeModalFromChild}
                                /> 

                                <ul className="snb_sns">
                                    <li><a className="point" href="https://www.facebook.com/Tripost-548997909367954" target="_blank"><img src="/static/img/sns_01.png" alt="sns_01"/></a></li>
                                    <li><a className="point" href="https://www.instagram.com/tripo.st/" target="_blank"><img src="/static/img/sns_03.png" alt="sns_01"/></a></li>
                                </ul>
                            </nav>
                        
                            <div className="side_tos_container">
        
                                <div className="write_input input_default" style={{width:'80%'}}>
                                    <select value={props.lang} style={{width:'100%'}}
                                        onChange={(e)=>{
                                            props.changeLang(e.target.value);
                                        }}
                                    >
                                        <option value="0">
                                            { props.lang == 0 && '한국어'}
                                            { props.lang == 1 && 'Korean'}
                                            { props.lang == 2 && 'tiếng Hàn'}
                                        </option>
                                        <option value="1">
                                            { props.lang == 0 && '영어'}
                                            { props.lang == 1 && 'English'}
                                            { props.lang == 2 && 'tiếng Anh'}
                                        </option>
                                        <option value="2">
                                            { props.lang == 0 && '베트남어'}
                                            { props.lang == 1 && 'Vietnamese'}
                                            { props.lang == 2 && 'tiếng Việt'}
                                        </option>
                                    </select>
                                </div>
                           
                                <div className="top">
                                    <Link to="/tos?type=1" className="side_tos_1"
                                        onClick={closeModalFromChild}
                                    >
                                        { props.lang == 0 && '이용약관' }
                                        { props.lang == 1 && 'Terms and Conditions' }
                                        { props.lang == 2 && 'điều khoản sử dụng' }
                                    </Link>
                                    <Link to="/tos?type=2" className="side_tos_2"
                                        onClick={closeModalFromChild}
                                    >
                                        { props.lang == 0 && '개인정보 정책 및 쿠키 정책' }
                                        { props.lang == 1 && 'Privacy policy' }
                                        { props.lang == 2 && 'chính sách thông tin cá nhân' }
                                    </Link>
                                </div>
                                <div className="bottom">
                                    <Link to="/tos?type=3" className="side_tos_3"
                                        onClick={closeModalFromChild}
                                    >Privacy policy(EN)</Link>
                                </div>                                    
                            </div>
                            
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}
export default Header; 