import axios from 'axios';

export function spotCreate(formData){
    try{
        let url = '/api/spots/create/';
        return axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(res=> res.data);
    }catch(err){
        throw new Error(err);
    }
}

export function spotDetail(id,lang='') {
    try{
        let lang = navigator.language;
        let url = `/api/spots/${id}?lang=${lang}`;
        return axios.get(url).then(res => res.data);
    }catch(err) {
        throw new Error(err);
    }
}

export function spotMainList(count, search='', themeId=''){
    try{
        let lang = navigator.language;
        //ko
        console.log(`테마 : ${themeId}`);
        console.log(`서치 ${search}`);
        console.log(`사용자 언어 : ${lang}`)


        let url = `/api/spots/count/${count}/?lang=${lang}`;
        //console.log(`검색어 ${search}`);
        if(search != '') url = `/api/spots/count/${count}/?search=${search}&lang=${lang}`;
        
        if(themeId != '' || themeId != undefined || typeof themeId != "undefined" || themeId != null) url = `/api/spots/count/${count}/?theme=${themeId}&lang=${lang}`;
        
        return axios.get(url).then(res=> res.data);
    }catch(err){
        throw new Error(err);
    }
}

export function spotSearch(word, themeId=''){
    try{
        console.log(`테마 : ${themeId}`);
        console.log(`서치 ${word}`);

        let url = `/api/spots/searchrecommend/?word=${word}`;

        if(themeId != '' || themeId != undefined || typeof themeId != "undefined" || themeId != null) url = `/api/spots/searchrecommend/?word=${word}&theme=${themeId}`;

        return axios.get(url).then(res=> res.data);
    }catch(err){
        throw new Error(err);
    }
}

export function spotNearList(latitude, longitude, distance=20, defaultSort=1, date='전체', additionSort=[false, false, false]){
    console.log('요청옴 -----------------------------------');
    if(distance == undefined)
        distance = 20;
    let url = `/api/spots/near/?lat=${latitude}&lon=${longitude}&dist=${distance}&defaultSort=${defaultSort}&date=${date}&additionSort=${additionSort}`;
    return axios.get(url).then(res=>res.data); 
}

export function spotUpdate(formData, id){
    try{
        let url = `/api/spots/${id}/update/`;
        return axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(res=> res.data);
    }catch(err){
        throw new Error(err);
    }
}

export function spotDelete(id){
    try{
        let url = `/api/spots/${id}/delete/`;
        return axios.get(url).then(res=> res.data);
    }catch(err){
        throw new Error(err);
    }
}

export function isLiked(id) {
    try{
        let url = `/api/spots/${id}/like/`;
        return axios.get(url).then(res => res.data);
    }catch(err) {
        throw new Error(err);
    }
}

export function isFollowed(id) {
    try{
        let url = `/api/users/${id}/follow/`;
        return axios.get(url).then(res => res.data);
    }catch(err) {
        throw new Error(err);
    }
}

export function isBookmarked(id) {
    try{
        let url = `/api/spots/${id}/bookmark/`;
        return axios.get(url).then(res => res.data);
    }catch(err) {
        throw new Error(err);
    }
}

export function getLoginUserPost() {
    try{
        let url = `/api/spots/login-user-post/`;
        return axios.get(url).then(res => res.data);
    }catch(err) {
        throw new Error(err);
    }
}
