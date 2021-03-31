import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUserUpdateApi, updateUserApi, deleteUserApi } from '../../apis/userApi/userApis';
import { pwCheck, pwAndRepwCheck } from '../../utils/InputValitaion';


class UserUpdate extends React.Component{
    constructor(){
        super();
        this.state={
            id : '',
            nickname : '',
            email : '',
            myText : '',
            gender : '',
            birthday : '',
            password : '',
            rePassword : '',
            complete : false,
            snackbar : {
                successOpen : true,
                successMessage : '안녕하세요!!'
            }
        }
    }

    componentDidMount(){
        this.getUserDetailApi();
    }

    async getUserDetailApi(){
        this.props.isLoading(true);
        let res = await getUserUpdateApi(location.pathname.split('/')[2]);
        if(!res.result){
            alert(res.message);
            return location.href = '/';
        }
        console.log(res);
        this.setState({
            id : res.result.pk,
            nickname : res.result.nickname,
            email : res.result.email,
            myText : res.result.my_text,
            gender : res.result.gender,
            birthday : res.result.birthday.split('T')[0]
        })
        console.log(this.state);
        this.props.isLoading(false);
    }

    // 기본 택스트, 숫자를 작성하는 input 관련
    changeInput(e){
        let value = e.target.value;
        if(e.target.name == 'nickname') this.setState({nickname : value});
        if(e.target.name == 'my_text') this.setState({myText : value});
        if(e.target.name == 'gender') this.setState({gender : value});
        if(e.target.name == 'birthday') this.setState({birthday : value});
        if(e.target.name == 'password') this.setState({password : value});
        if(e.target.name == 're_password') this.setState({rePassword : value});
        console.log(this.state);
    }
    clickGender(e){
        console.log(`gender : ${e.target.value}`)
        e.target.value == '남' ? this.setState({gender:'남'}) : null;
        e.target.value == '여' ? this.setState({gender:'여'}) : null;
        console.log(this.state);
    }

    blurInput(e){
        if(e.target.name == 'password' && e.target.value != ''){
            let result = pwCheck(e.target.value);
            if(!result){
                e.target.focus();
                this.props.setSnackbar({
                    type:'WARNING',
                    open:true, 
                    message:'비밀번호는 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자를 포함해야합니다.',
                    time : 2000,
                });
            }
        }else if(e.target.name == 're_password' && e.target.value != ''){
            let result = pwAndRepwCheck(this.state.password, e.target.value);
            if(!result){
                e.target.focus();
                this.props.setSnackbar({
                    type:'WARNING',
                    open:true, 
                    message:'비밀번호가 일치하지 않습니다. 다시 확인해주세요.',
                    time : 2000,
                });
            }
        }
    }

    async delete_answer(){
        let text = '정말 탈퇴하시겠습니까? 😥\n탈퇴하시려면 DELETE 를 입력해주세요.'; 
        if(this.props.lang == 1) text = 'Are you sure you want to opt out? 😥\nEnter DELETE to withdraw.';
        if(this.props.lang == 2) text = 'Bạn có chắc chắn muốn từ chối không? 😥\nNhập DELETE để rút tiền.';
        let result = prompt(text);
        if(result == 'DELETE'){
            let res = await deleteUserApi(this.state.id);
            if(!res){
                this.props.setSnackbar({
                    type:'WARNING',
                    open:true, 
                    message:res.message,
                    time : 2000,
                });
            }
            this.props.setSnackbar({
                type:'SUCCESS',
                open:true, 
                message:res.message,
                time : 2000,
            });
            return location.href = '/';
        }
    }

    async submitForm(){
        this.props.isLoading(true);
        const formData = new FormData();
        formData.append('nickname', this.state.nickname);
        formData.append('birthday', this.state.birthday);
        formData.append('my_text', this.state.myText);
        formData.append('gender', this.state.gender);
        formData.append('password', this.state.password);
        formData.append('re_password', this.state.rePassword);
        let res = await updateUserApi(this.state.id, formData);
        if(!res.result){
            this.props.setSnackbar({
                type:'WARNING',
                open:true, 
                message:res.message,
                time : 2000,
            });
            this.props.isLoading(false);
            return false;
            
        }

        this.setState({complete : true});
        this.props.isLoading(false);

    }

    render(){
        if(this.state.complete) return <Redirect to={'/users/'+this.state.id}/>

        let passwordText = '변경할 비밀번호를 입력';
        if(this.props.lang == 1) passwordText = 'Please enter the password to change';
        if(this.props.lang == 2) passwordText = 'Vui lòng nhập mật khẩu để thay đổi';
        
        let repasswordText = '비밀번호를 재입력';
        if(this.props.lang == 1) repasswordText = 'Re-enter password';
        if(this.props.lang == 2) repasswordText = 'Nhập lại mật khẩu';

        let descripText = '나의 한마디 (50자 이내)';
        if(this.props.lang == 1) descripText = 'My word (less than 50 characters)';
        if(this.props.lang == 2) descripText = 'Từ của tôi (ít hơn 50 ký tự)';

        let nicknameText = '닉네임';
        if(this.props.lang == 1) nicknameText = 'nickname';
        if(this.props.lang == 2) nicknameText = 'tên nick';
        return (
            <React.Fragment>
                <div className="container">
                    <div className="layout_grid">
                        <div className="form_default_wrap">
                            <form>
                                <div className="form_default_inner box_default">
                                    <div className="form_title">
                                        <h2>
                                            { this.props.lang == 0 && '회원 수정'}
                                            { this.props.lang == 1 && 'Member modification'}
                                            { this.props.lang == 2 && 'Sửa đổi thành viên'}
                                        </h2>
                                    </div>
                                    <div className="form_list">
                                        <ul className="form_input_wrap">
                                            <li>
                                                <label className="form_input" htmlFor="">
                                                    <span className="form_input_title">
                                                    { this.props.lang == 0 && '이메일'}
                                                    { this.props.lang == 1 && 'E-mail'}
                                                    { this.props.lang == 2 && 'E-mail'}
                                                    </span>
                                                    <input type="text" placeholder="JOURNEY@naver.com" disabled="disabled" defaultValue={this.state.email}/>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="form_input" htmlFor="">
                                                    <span className="form_input_title">
                                                    { this.props.lang == 0 && '비밀번호'}
                                                    { this.props.lang == 1 && 'Password'}
                                                    { this.props.lang == 2 && 'mật khẩu'}
                                                    </span>
                                                    <input type="password" name="password" placeholder={passwordText}
                                                        onChange={this.changeInput.bind(this)}
                                                        onBlur={this.blurInput.bind(this)}
                                                    />
                                                </label>
                                            </li>
                                            <li>
                                                <label className="form_input" htmlFor="">
                                                    <span className="form_input_title">
                                                    { this.props.lang == 0 && '비밀번호 확인'}
                                                    { this.props.lang == 1 && 'Confirm Password'}
                                                    { this.props.lang == 2 && 'Xác nhận mật khẩu'}
                                                    </span>
                                                    <input type="password" name="re_password" placeholder={repasswordText}
                                                        onChange={this.changeInput.bind(this)}
                                                        onBlur={this.blurInput.bind(this)}
                                                    />
                                                </label>
                                            </li>
                                            <li>
                                                <div className="my_text">
                                                    <textarea name="my_text" id="" cols="30" rows="3" placeholder={descripText} maxLength="50"
                                                        value={this.state.myText}
                                                        onChange={this.changeInput.bind(this)}
                                                    ></textarea>
                                                </div>
                                            </li>
                                            <li>
                                                <label className="form_input" htmlFor="">
                                                    <span className="form_input_title">
                                                    { this.props.lang == 0 && '닉네임'}
                                                    { this.props.lang == 1 && 'Nickname'}
                                                    { this.props.lang == 2 && 'tên nick'}
                                                    </span>
                                                    <input type="text" name="nickname" placeholder={nicknameText} value={this.state.nickname}
                                                        onChange={this.changeInput.bind(this)}
                                                    />
                                                </label>
                                            </li>
                                            <li>
                                                <label className="form_input" htmlFor="">
                                                    <span className="form_input_title">
                                                    { this.props.lang == 0 && '생일'}
                                                    { this.props.lang == 1 && 'Birthday'}
                                                    { this.props.lang == 2 && 'sinh nhật'}
                                                    </span>
                                                    <input type="date" name="birthday" value={this.state.birthday}
                                                        onChange={this.changeInput.bind(this)}
                                                    />
                                                    {/* <button type="button"
                                                    style={{border:"none",borderTopRightRadius:"3px",borderBottomRightRadius:"3px",
                                                        backgroundColor: "#36d7b7",fontWeight:"bold",color:"white",padding:"8px",cursor: "pointer",height:"100%"}}
                                                   >변경</button> */}
                                                </label>
                                            </li>
                                            <li>
                                                <label className="form_input" htmlFor="">
                                                    <span className="form_input_title">
                                                    { this.props.lang == 0 && '성별'}
                                                    { this.props.lang == 1 && 'Gender'}
                                                    { this.props.lang == 2 && 'giới tính'}
                                                    </span>
                                                    <div className="form_input_checkbox">
                                                        <label htmlFor="gender_man" className="check_box">
                                                            <span>
                                                            { this.props.lang == 0 && '남'}
                                                            { this.props.lang == 1 && 'Male'}
                                                            { this.props.lang == 2 && 'Đàn ông'}
                                                            </span>
                                                            <input id="gender_man" type="radio" name="gender" defaultValue="남" 
                                                                checked={this.state.gender == '남' ? true : false}
                                                                onClick={this.clickGender.bind(this)}    
                                                            />
                                                            <span className="check_icon"></span>
                                                        </label>
                                                        <label htmlFor="gender_woman"  className="check_box">
                                                            <span>
                                                            { this.props.lang == 0 && '여'}
                                                            { this.props.lang == 1 && 'Female'}
                                                            { this.props.lang == 2 && 'Đàn bà'}
                                                            </span>
                                                            <input id="gender_woman" type="radio" name="gender" defaultValue="여" 
                                                                checked={this.state.gender == '여' ? true : false}
                                                                onClick={this.clickGender.bind(this)}
                                                            />
                                                            <span className="check_icon"></span>
                                                        </label>
                                                    </div>
                                                </label>
                                            </li>
                                        </ul>
                                        <div className="form_submit">
                                            <button type="button" className="submit_box" style={{border:"none",width:"100%",cursor: "pointer"}}
                                                onClick={this.submitForm.bind(this)}
                                            >
                                                { this.props.lang == 0 && '수정'}
                                                { this.props.lang == 1 && 'Edit profile'}
                                                { this.props.lang == 2 && 'Sửa đổi'}
                                            </button>
                                        </div>
                                        <br/>
                                        <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
                                            <a style={{color:"#99A3A4",cursor: "pointer"}} 
                                                onClick={this.delete_answer.bind(this)}
                                            >
                                                { this.props.lang == 0 && '계정 탈퇴'}
                                                { this.props.lang == 1 && 'Delete account'}
                                                { this.props.lang == 2 && 'Rút tiền tài khoản'}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default UserUpdate;