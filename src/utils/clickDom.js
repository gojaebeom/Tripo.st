//태그를 받아와 클릭이벤트 중지시키기
export function avoidClickDom(el){
    if(el.classList.contains('avoid_clicks')){
        el.classList.remove('avoid_clicks');
    }else{
        el.classList.add('avoid_clicks');
    }
}