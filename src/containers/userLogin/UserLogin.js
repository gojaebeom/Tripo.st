import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { userLogin } from '../../apis/userApi/userApis';
import { loginCheckV2 } from '../../utils/loginCheck';

class UserLogin extends React.Component{
    constructor(){
        super();
        this.state = {
            'username':null,
            'password':null
        }
    }

    changeInput(e){
        let value = e.target.value;
        if(e.target.name == 'username') this.setState({username: value})
        else if(e.target.name == 'password') this.setState({password: value})
    }

    async submitForm(e){
        e.preventDefault();
        this.props.isLoading(true);
        console.log(e.target);
        const formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        let data = await userLogin(formData);
        
        data.response == true ? location.href = '/' : null;

        let message = '계정 또는 비밀번호가 일치하지 않습니다.';
        if(this.props.lang == 1) message = 'The accounts or passwords do not match.';
        if(this.props.lang == 2) message = 'Các tài khoản hoặc mật khẩu không khớp.';
        data.response == false ? 
        this.props.setSnackbar({
            type:'WARNING',
            open:true, 
            message: message,
            time : 3000,
        }) : null;
        this.props.isLoading(false);
    }

    render(){
        //로그인 이후 접근시
        loginCheckV2()
        let loginState = document.querySelector('#root').getAttribute('loginState');
        if(loginState == 'True') return <Redirect to='/' />

        let emailText = '이메일을 입력해주세요.';
        if(this.props.lang == 1) emailText = 'Enter Email';
        if(this.props.lang == 2) emailText = 'Hãy điền địa chỉ email của bạn.';
        let passwordText = '비밀번호를 입력해주세요.';
        if(this.props.lang == 1) passwordText = 'Enter password';
        if(this.props.lang == 2) passwordText = 'Vui lòng nhập mật khẩu.';
        return (
            <React.Fragment>
                <div className="form_default_inner box_default">
                    <div className="form_title">
                        <h2>
                            {this.props.lang == 0 && '로그인'}
                            {this.props.lang == 1 && 'Log-in'}
                            {this.props.lang == 2 && 'đăng nhập'}
                        </h2>
                    </div>
                    <div className="form_list">
                        <ul className="social_login">
                            <li>
                                <a className="form_green" href="/accounts/naver/login/">
                                {this.props.lang == 0 && '네이버 계정으로 로그인'}
                                {this.props.lang == 1 && 'Sign-in with Naver'}
                                {this.props.lang == 2 && 'Đăng nhập bằng tài khoản Naver'}
                                </a>
                            </li>
                            <li>
                                <a className="form_yellow" href="/accounts/kakao/login/">
                                    {this.props.lang == 0 && '카카오 계정으로 로그인'}
                                    {this.props.lang == 1 && 'Sign-in with Kakaotalk'}
                                    {this.props.lang == 2 && 'Đăng nhập bằng tài khoản Kakao của bạn'}
                                </a>
                            </li>
                            <li>
                                <a className="form_blue" href="/accounts/google/login/">
                                    {this.props.lang == 0 && '구글 계정으로 로그인'}
                                    {this.props.lang == 1 && 'Sign-in with Google'}
                                    {this.props.lang == 2 && 'Đăng nhập bằng tài khoản Google của bạn'}
                                </a>
                            </li>
                        </ul>
                        <form 
                        onSubmit={this.submitForm.bind(this)}>
                            <ul className="form_input_wrap">
                                <li>
                                    <label className="form_input">
                                        <input type="text" name="username" placeholder={emailText}
                                        onChange={this.changeInput.bind(this)}
                                        />
                                    </label>
                                </li>
                                <li>
                                    <label className="form_input">
                                        <input type="password" name="password" placeholder={passwordText}
                                        onChange={this.changeInput.bind(this)}
                                        />
                                    </label>
                                </li>
                            </ul>
                            <div className="form_submit">
                                <button type="submit" className="submit_box sign_button">
                                    {this.props.lang == 0 && '로그인'}
                                    {this.props.lang == 1 && 'Login'}
                                    {this.props.lang == 2 && 'đăng nhập'}
                                </button>
                            </div>
                        </form>
                        <div className="form_action">
                            {/* <label className="check_box">
                                <input type="checkbox"/>
                            <span className="check_icon"></span><KeepLogin />
                            </label> */}
                            <ul>
                                <li>
                                    <Link to="/users/create/password">
                                        {this.props.lang == 0 && '비밀번호 찾기'}
                                        {this.props.lang == 1 && 'Forgot password?'}
                                        {this.props.lang == 2 && 'Quên mật khẩu'}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/users/create">
                                        {this.props.lang == 0 && '회원가입'}
                                        {this.props.lang == 1 && 'Sign-Up'}
                                        {this.props.lang == 2 && 'Đăng ký'}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default UserLogin;