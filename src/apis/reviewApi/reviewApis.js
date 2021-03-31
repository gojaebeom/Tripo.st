import axios from 'axios';

export function reviewCreate(formData, id){
    try{
        let url = `/api/spots/${id}/reviews/create/`;
        return axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(res=> res.data);
    }catch(err){
        throw new Error(err);
    }
}

export function reviewDelete(id){
    try{
        let url = `/api/spots/reviews/${id}/delete/`;
        return axios.get(url).then(res=> res.data);
    }catch(err){
        throw new Error(err);
    }
}

export function reviewDetail(id){
    try{
        let url = `/api/spots/reviews/${id}/`;
        return axios.get(url).then(res=> res.data);
    }catch(err){
        throw new Error(err);
    }
}

export function reviewUpdate(formData, id){
    try{
        let url = `/api/spots/reviews/${id}/update/`;
        return axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(res=> res.data);
    }catch(err){
        throw new Error(err);
    }
}