import axios from 'axios';

export function index(url){
    try{
        return axios.get(url).then(res=> res.data);
    }catch(e){
        throw new Error(e);
    }
}

export function show(url){
    try{
        return axios.get(url).then(res=> res.data);
    }catch(e){
        throw new Error(e);
    }
}

export function create(url, formData){
    try{
        return axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(res=> res.data);
    }catch(e){
        throw new Error(e);
    }
}

export function update(url, formData){
    try{
        return axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(res=> res.data);
    }catch(e){
        throw new Error(e);
    }
}

export function _delete(url, formData=null){
    try{
        if(formData === null){
            return axios.post(url).then(res=> res.data);
        }else{
            return axios.post(url, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }}).then(res=> res.data);
        }
    }catch(e){
        throw new Error(e);
    }
}


export function isLiked(url) {
    try{
        return axios.get(url).then(res => res.data);
    }catch(err) {
        throw new Error(err);
    }
}