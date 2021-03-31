import { LinearProgress } from '@material-ui/core';
import { CustomSnackbar } from './components/snackbar/Snackbar';
import React, { useEffect, useState } from 'react';
import Header from './components/header/Header';
import { Redirect, Route, Switch } from 'react-router';
import Footer from './components/footer/Footer';
import MainSpot from './containers/mainSpot/MainSpot';
import NearSpot from './containers/nearSpot/NearSpot';
import RecommendSpot from './containers/recommendSpot/RecommendSpot';
import SpotCreate from './containers/spotCreate/SpotCreate';
import SpotDetail from './containers/SpotDetail/SpotDetail';
import SpotUpdate from './containers/spotUpdate/SpotUpdate';
import UserLogin from './containers/userLogin/UserLogin';
import UserSignup from './containers/userSignup/UserSignup';
import UserDetail from './containers/userDetail/UserDetail';
import UserUpdate from './containers/userUpdate/UserUpdate';
import Tos from './containers/tos/Tos';
import UserSignupAddInfo from './containers/userSignupAddInfo/UserSignupAddInfo';
import RecommendSpotMap from './containers/recommendSpot/RecommendSpotMap';
import RecommendDetail from './containers/recommendSpot/RecommendDetail';
import ThemeSpot from './containers/themeSpot/ThemeSpot';
import NearSpotMap from './containers/nearSpot/NearSpotMap';
import ReviewUpdate from './components/review/ReviewUpdate';
import UserRemakePassword from './containers/userRemakePassword/UserRemakePassword';
import { loginCheck } from './utils/loginCheck';
import FootageCreate from './containers/footageCreate';
import FootageMain from './containers/footageMain';
import FootageUpdate from './containers/footageUpdate';
import FootageDetail from './containers/footageDetail';

function App(){
    //다국어 언어 상태
    let langState = window.localStorage.getItem('lang');
    if(langState === null){
        langState = 0;
    }
    const [lang, setLang] = useState(langState);
    const changeLang = result => {
        window.localStorage.setItem('lang',result);
        window.location.reload();
        setLang(result); 
    }

    //상단막대, 둥근 프로그래스바 상태
    const [loading, setLoading] = useState(false);
    const isLoading = result => setLoading(result); 

    //스낵바 상태
    const [snackbar, setSnackbar] = useState({
        type : '', // SUCCESS, INFO, WARNING, ERROR
        open : false,
        message : 'message!',
        time : 3000,
    });
    const useSnackbar = settings => setSnackbar({...settings});

    return (
        <React.Fragment>
            {/* progressbar 🍔 */}
            <div style={{position:'fixed',left:0,top:0,width:'100%',zIndex:999}}>
                { (loading === true) && <LinearProgress /> }  
            </div>

            {/* header 🍟 */}
            <Header
                lang={lang}
                changeLang={(result)=> { changeLang(result) }}
                setSnackbar={()=> setSnackbar({...snackbar, open : false})}
            />

            {/* switch containers 🧇 */}
            <div className="container w-full border">
                <Switch>
                    <Route exact path="/">
                        <MainSpot
                            lang={lang}
                            isLoading={isLoading}    
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    <Route path="/nears/map" >
                        <NearSpotMap
                            lang={lang}
                            isLoading={isLoading}    
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    <Route path="/nears" >
                        <NearSpot 
                            lang={lang}
                            isLoading={isLoading}    
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    <Route path="/themes" >
                        <ThemeSpot 
                            lang={lang}
                            isLoading={isLoading}    
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    <Route path="/spots/create">
                        {
                            () => {
                                // 💡 회원 로그인 여부 채크
                                let {login, move} = loginCheck(lang);
                                if(login == false){
                                    if(move) return <Redirect to='/users/login' />
                                    else history.back();
                                }else{
                                    return (
                                    <SpotCreate
                                        lang={lang}
                                        isLoading={isLoading}    
                                        setSnackbar={useSnackbar}
                                    />)
                                }
                            }
                        }
                    </Route>
                    <Route path="/recommends/map">
                        <RecommendSpotMap 
                            lang={lang}
                            isLoading={isLoading}
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    <Route path="/recommends/:id">
                        <RecommendDetail
                            lang={lang}
                            isLoading={isLoading}
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    <Route path="/recommends">
                        <RecommendSpot 
                            lang={lang}
                            isLoading={isLoading}
                            setSnackbar={useSnackbar}    
                        />
                    </Route>
                    <Route path="/reviews/:id/update">
                        <ReviewUpdate 
                            lang={lang}
                            isLoading={isLoading}
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    <Route path="/spots/:id/update">
                        {
                            () => {
                                // 💡 회원 로그인 여부 채크
                                let {login, move} = loginCheck(lang);
                                if(login == false){
                                    if(move) return <Redirect to='/users/login' />
                                    else history.back();
                                }else{
                                    return (
                                    <SpotUpdate 
                                        lang={lang}
                                        isLoading={isLoading}
                                        setSnackbar={useSnackbar}
                                    />)
                                }
                            }
                        }
                    </Route>
                    <Route path="/spots/:id">
                        <SpotDetail 
                            lang={lang}
                            isLoading={isLoading}
                            setSnackbar={useSnackbar}
                        />)
                    </Route>
                    <Route path="/users/create/userinfo">
                        <UserSignupAddInfo
                            lang={lang}
                            isLoading={isLoading}
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    <Route path="/users/create/password">
                        <UserRemakePassword
                            lang={lang}
                            isLoading={isLoading}
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    <Route path="/users/create">
                        <UserSignup 
                            lang={lang}
                            isLoading={isLoading} 
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    <Route path="/users/login" component={ UserLogin }>
                        <UserLogin 
                            lang={lang}
                            isLoading={isLoading}
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    <Route path="/users/:id/update">
                        <UserUpdate 
                            lang={lang}
                            isLoading={isLoading}
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    <Route path="/users/:id">
                        <UserDetail 
                            lang={lang}
                            isLoading={isLoading}
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    <Route path="/tos">
                        <Tos 
                            lang={lang}
                            isLoading={isLoading}
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    
                    <Route path="/tripo-clips/create">
                        {
                            () => {
                                // 💡 회원 로그인 여부 채크
                                let {login, move} = loginCheck(lang);
                                if(login == false){
                                    if(move) return <Redirect to='/users/login' />
                                    else history.back();
                                }else{
                                    return (
                                    <FootageCreate 
                                        lang={lang}
                                        isLoading={isLoading}
                                        setSnackbar={useSnackbar}
                                    />)
                                }
                            }
                        }
                    </Route>
                    <Route path="/tripo-clips/:id/update">
                        {
                            () => {
                                // 💡 회원 로그인 여부 채크
                                let {login, move} = loginCheck(lang);
                                if(login == false){
                                    if(move) return <Redirect to='/users/login' />
                                    else history.back();
                                }else{
                                    return (
                                    <FootageUpdate
                                        lang={lang}
                                        isLoading={isLoading}
                                        setSnackbar={useSnackbar}
                                    />)
                                }
                            }
                        }
                    </Route>
                    <Route path="/tripo-clips/:id">
                        <FootageDetail
                            lang={lang}
                            isLoading={isLoading}
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                    
                    <Route path="/tripo-clips">
                        <FootageMain
                            lang={lang}
                            isLoading={isLoading}
                            setSnackbar={useSnackbar}
                        />
                    </Route>
                </Switch>
            </div>

            {/* footer 🌮 */}
            <Footer lang={lang}/>

            {/* snackbars 🍧 */}
            <CustomSnackbar
                type={snackbar.type}
                open={(snackbar.open) ? true : false}
                message={snackbar.message}
                time={snackbar.time}
                close={()=> setSnackbar({...snackbar, open : false})}
            />
        </React.Fragment>
    )
}
export default App;