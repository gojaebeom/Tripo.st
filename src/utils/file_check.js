
export function image_check(obj) {
    let pathpoint = obj.value.lastIndexOf('.');
    let filepoint = obj.value.substring(pathpoint+1,obj.length);
    let filetype = filepoint.toLowerCase();
    if(filetype=='jpg' || filetype=='gif' || filetype=='png' || filetype=='jpeg') {
        // 정상적인 이미지 확장자 파일일 경우 ...
        return true;

    } else if(filetype=='bmp') {

        let upload = confirm('BMP 파일은 웹상에서 사용하기엔 적절한 이미지 포맷이 아닙니다.\n그래도 계속 하시겠습니까?');
        if(!upload) return false;

        return true;
    } else if(!obj.value){
        console.log('파일이 선택되지 않았습니다!');
        return false;
    } else {
        alert('이미지 파일만 선택할 수 있습니다.');
        return false;
    }
}

export function bgm_check(obj){
    let pathpoint = obj.value.lastIndexOf('.');
    let filepoint = obj.value.substring(pathpoint+1,obj.length);
    let filetype = filepoint.toLowerCase();
    if(filetype=='mp3' || filetype=='wav' || filetype=='aac' || filetype=='aiff' || filetype=='flac') {
        // 정상적인 이미지 확장자 파일일 경우 ...
        return true;

    }  else if(!obj.value){
        console.log('파일이 선택되지 않았습니다!');
        return false;
    } else {
        alert('오디오 파일만 선택할 수 있습니다.');
        return false;
    }
}