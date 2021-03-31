const pw_exp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
const mail_exp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export function emailCheck(email){
    if(!email){
        //alert('이메일을 입력해주세요!');
        console.log('x')
        return false;
    }else if(!mail_exp.test(email.value)){
        //alert('이메일 형식이 올바르지 않습니다!');
        console.log('형식 x')
        return false;
    }
    console.log('이메일 인증 완료')
    return true;
}

export function pwCheck(password){
    if(!pw_exp.test(password)){
        //alert('비밀번호는 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자를 포함해야합니다!');
        return false;
    }

    return true;
}

export function pwAndRepwCheck(password, repassword){
    if(password !== repassword){
        //alert('비밀번호가 일치하지 않습니다! 다시 확인해주세요');
        return false;
    }
    return true;
}

export function userSubmit(event){

    let elem = event.target;
    event.preventDefault();
    console.log('서브밋!!');

    let result = false;
    result = email_check() ? true : false;
    result = pw_check() ? true : false;
    result = pw_and_repw_check() ? true : false;

    if(!result){
        return false;
    }

    draw_loading_effect();
    elem.submit();
}

export function validationInput(data, callback){
    if(data === null || data === undefined || data === ""){
        console.log(`data : ${data}, 데이터가 없습니다.`);
        callback();
        return false;
    }
    return true;
}