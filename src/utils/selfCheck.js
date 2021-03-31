export function selfCheck(id){
    console.log(id);
    let loginUserId = document.querySelector('#root').getAttribute('user_id');
    console.log(loginUserId);
    if(loginUserId != 'null' && +loginUserId == id){
        return true;
    }

    return false;
}