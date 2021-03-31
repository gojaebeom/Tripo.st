export function loginCheck(lang = 0){
    let loginState = document.querySelector('#root').getAttribute('loginState');
    console.log('언어 상태 : ');
    console.log(lang);
    if(loginState == 'False'){
        let text_kr = '로그인이 필요한 기능입니다. 로그인 하시겠습니까?';
        let text_en = 'You have to sign-in, would you like to proceed?';
        let text_vi = 'Đây là một chức năng yêu cầu đăng nhập. Bạn có muốn đăng nhập?';
        
        let result;
        if(+lang === 0) result = confirm(text_kr);
        else if(+lang === 1) result = confirm(text_en);
        else if(+lang === 2) result = confirm(text_vi);
        
        return {'login':false, 'move':result};
    }

    return {'login':true, 'move':false};
}

export function loginCheckV2(){
    let loginState = document.querySelector('#root').getAttribute('loginState');
    console.log(`로그인 유무 : ${loginState}`);
    if(loginState != 'False'){
        alert('제한된 접근입니다.');
    }
}

export function loginCheckV3(){
    let loginState = document.querySelector('#root').getAttribute('loginState');
    console.log(`로그인 유무 : ${loginState}`);
    if(loginState === 'True'){
        return true;
    }
    return false;
}

export function helloUser(){
    let loginState = document.querySelector('#root').getAttribute('loginState');
    let nickname = document.querySelector('#root').getAttribute('nickname');
    console.log(`로그인 유무 : ${loginState}`);
    if(loginState == 'True' && nickname != 'null' && location.pathname == '/'){
        return true;
    }
    return false;
}