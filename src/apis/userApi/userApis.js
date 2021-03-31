import axios from 'axios';

export function getUserDetailApi(userId){
    return axios.get(`/api/users/${userId}/`).then(res=>res.data);
}

export function updateUserCoverImg(userId, formData){
    // console.log(formData);
    let url = `/api/users/${userId}/cover_photo/update/`;
    return axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }}).then(res=>res.data);
}

export function updateUserProfileImg(userId, formData){
    // console.log(formData);
    let url = `/api/users/${userId}/profile_photo/update/`;
    return axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }}).then(res=>res.data);
}

export function getFeedListApi(userId){
    return axios.get(`/api/users/${userId}/feeds/`).then(res=>res.data);
}

export function getReviewListApi(userId){
    return axios.get(`/api/users/${userId}/reviews/`).then(res=>res.data);
}

export function getBookmarkListApi(userId){
    return axios.get(`/api/users/${userId}/books/`).then(res=>res.data);
}

export function getFootageListApi(userId){
    return axios.get(`/api/users/${userId}/footages/`).then(res=>res.data);
}

export function getUserUpdateApi(userId){
    return axios.get(`/api/users/${userId}/update/`).then(res=>res.data);
}

export function updateUserApi(userId, formData){
  return axios.post(`/api/users/${userId}/update/`, formData).then(res=>res.data);
}

export function deleteUserApi(userId){
  return axios.get(`/api/users/${userId}/delete/`).then(res=>res.data);
}

export function userLogin(formData){
    try{
        let url = '/api/users/login/'
        return axios.post(url, formData)
                .then(res=> res.data);
    }catch(err){
        throw new Error(err);
    }
}

export function userSignup(formData){
    try{
        let url = '/api/users/create/';
        return axios.post(url, formData)
                .then(res=> res.data);
    }catch(err){
        throw new Error(err);
    }
} 

export function userSignupInfo(formData){
    try{
        let url = '/api/users/create/userinfo/';
        return axios.post(url, formData)
                .then(res=> res.data);
    }catch(err){
        throw new Error(err);
    }
}