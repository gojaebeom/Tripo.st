export async function errorCheck(result){
    let data = await result;
    if(data.result == 'error'){
        alert(`요청이 올바르지 않습니다.`);
        return false;
    }
    return data;
}