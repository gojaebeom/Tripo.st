import React from 'react';
import { NavLink } from 'react-router-dom';
import { loginCheckV3 } from '../../utils/loginCheck';


function Navigation({ closeModal, lang }){
    let isLogin = loginCheckV3();
    return (
        <React.Fragment>
            <ul>
                <li className="main"
                    onClick={()=>closeModal()}
                >
                    <NavLink exact to="/" activeStyle={clickStyle}>
                        { lang == 0 && '메인 스팟'}
                        { lang == 1 && 'Main spot'}
                        { lang == 2 && 'Địa điểm chính'}
                    </NavLink>
                </li>
                <li className="near"
                    onClick={()=>closeModal()}
                >
                    <NavLink to="/nears" activeStyle={clickStyle}>
                        { lang == 0 && '근처 스팟'}
                        { lang == 1 && 'Spot nearby'}
                        { lang == 2 && 'Địa điểm gần đó'}
                    </NavLink>
                </li>
                <li className="theme point"
                    onClick={()=>closeModal()}
                >
                    <NavLink to={'/themes'} activeStyle={clickStyle}>
                        { lang == 0 && '테마 스팟'}
                        { lang == 1 && 'Spot by theme'}
                        { lang == 2 && 'địa điểm chủ đề'}
                    </NavLink>
                </li>
                <li className="recommend"
                    onClick={()=>closeModal()}
                >
                    <NavLink to="/recommends" activeStyle={clickStyle}>
                        { lang == 0 && '추천 스팟'}
                        { lang == 1 && 'Recommend sights'}
                        { lang == 2 && 'Điểm giới thiệu'}
                    </NavLink>
                </li>
                <li className="tripoclips"
                    onClick={()=>closeModal()}
                >
                    <NavLink to="/tripo-clips" activeStyle={clickStyle}>
                        { lang == 0 && '여행 클립'}
                        { lang == 1 && 'Trip Clips'}
                        { lang == 2 && 'Điểm giới thiệu'}
                    </NavLink>
                </li>
                {
                    !isLogin ?
                    <li className="login"
                        onClick={()=>closeModal()}
                    >
                        <NavLink to="/users/login" activeStyle={clickStyle}>
                            { lang == 0 && '로그인'}
                            { lang == 1 && 'Sign-in'}
                            { lang == 2 && 'sự đăng nhập'}
                        </NavLink>
                    </li> :
                    <React.Fragment>
                        <li className="user_detail"
                            onClick={()=>closeModal()}
                        >
                            <NavLink to={`/users/${document.querySelector('#root').getAttribute('user_id')}`}
                                activeStyle={ clickStyle }
                            >
                                { lang == 0 && '내 정보'}
                                { lang == 1 && 'My profile'}
                                { lang == 2 && 'thông tin của tôi'}
                            </NavLink>
                        </li>
                        <li className="logout">
                            <a href="/api/users/logout/">
                                { lang == 0 && '로그아웃'}
                                { lang == 1 && 'Log out'}
                                { lang == 2 && 'sự log out'}
                            </a>
                        </li>
                    </React.Fragment>
                }
            </ul>
        </React.Fragment>
    )
}

const clickStyle = {
    color : '#36d7b7'
}

export default Navigation;
