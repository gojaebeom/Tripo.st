import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { setDefaultLang } from './utils/setLang';

const lang = navigator.language;
setDefaultLang(lang);
console.log('%c ----------------------','color:green');
console.log(`%c 사용자 브라우저 언어 : ${lang}`,'color:blue');
console.log('%c ----------------------','color:green');

// 모든 이미지 우클릭 금지
window.addEventListener("contextmenu", e => {
    e.target.matches("img") && e.preventDefault();
});

// 페이지가 로드될 때 히스토리의 객체 제거
window.addEventListener("load", ()=>{
    history.replaceState(null, null);
});

ReactDom.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    , document.getElementById('root')
);
