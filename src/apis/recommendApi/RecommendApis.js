import axios from 'axios';

export function recommendMainList(count,lang){
    if(count == undefined)
        count = 0;
    return axios.get(`/api/recommends/${count}/${lang}/`).then(res=>res.data); 
}

export function recommendNearList(latitude, longitude, distance,lang){
    if(distance == undefined)
        distance = 20;
    let url = `/api/recommends/near/${lang}/?lat=${latitude}&lon=${longitude}&dist=${distance}`;
    return axios.get(url).then(res=>res.data); 
}

export function recommendDetail(id,lang){
    return axios.get(`/api/recommends/detail/${id}/${lang}/`).then(res=>res.data); 
}

export function recommendSearch(search,lang){
    return axios.get(`/api/recommends/search/${lang}/?word=${search}`).then(res=>res.data); 
}