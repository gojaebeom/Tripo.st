import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { userSignup } from '../../apis/userApi/userApis';
import { pwAndRepwCheck, pwCheck } from '../../utils/InputValitaion';
import { loginCheckV2 } from '../../utils/loginCheck';

class SpotSignup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            repassword : '',
            complete : false,
        }
    }

    changeInput(e){
        console.log(e.target.value);
        let value = e.target.value;
        console.log(value);
        if(e.target.name == 'username') this.setState({username : value});
        if(e.target.name == 'password') this.setState({password : value});
        if(e.target.name == 're_password') this.setState({repassword : value});
    }

    async submitForm(e){
        if(this.state.username == ''){
            let message = '이메일을 입력해주세요.';
            if(this.props.lang == 1) message = 'Enter Email';
            if(this.props.lang == 2) message = 'Hãy điền địa chỉ email của bạn.';
            this.props.setSnackbar({
                type:'WARNING',
                open:true, 
                message:message,
                result : true,
                time : 2000,
            });
            return false;
        }
        let result = pwCheck(this.state.password);
        if(!result){
            let message = '비밀번호는 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자를 포함해야합니다.';
            if(this.props.lang == 1) message = 'The password must contain at least 8 characters, at least one letter, one number and one special character.';
            if(this.props.lang == 2) message = 'Mật khẩu phải chứa ít nhất 8 ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt.';
            this.props.setSnackbar({
                type:'WARNING',
                open:true, 
                message: message,
                result : true,
                time : 2000,
            });
            return false;
        }
        result = pwAndRepwCheck(this.state.password, this.state.repassword);
        if(!result){
            let message = '비밀번호가 일치하지 않습니다. 다시 확인해주세요.';
            if(this.props.lang == 1) message = 'Passwords do not match. Please check again.';
            if(this.props.lang == 2) message = 'Mật khẩu không phù hợp. Vui lòng kiểm tra lại.';
            this.props.setSnackbar({
                type:'WARNING',
                open:true, 
                message: message,
                result : true,
                time : 2000,
            });
            return false;
        }

        /**유효성 검사 이후 */
        
        console.log(e.currentTarget);
        this.props.isLoading(true);
        const formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        formData.append('re_password', this.state.repassword);

        let message = '이메일로 인증링크를 발송중입니다. 잠시만 기다려주세요..';
        if(this.props.lang == 1) message = 'We are sending a verification link by email. Please wait..';
        if(this.props.lang == 2) message = 'Chúng tôi đang gửi một liên kết xác minh qua email. Vui lòng đợi ..';
        this.props.setSnackbar({
            type:'INFO',
            open:true, 
            message: message,
            time : 10000,
        });

        //axios 요청
        let data = await userSignup(formData);
        console.log(data);
        if(data.response == false) {
            let message = '시스템 오류';
            if(this.props.lang == 1) message = 'System error';
            if(this.props.lang == 2) message = 'Lỗi hệ thống';
            this.props.setSnackbar({
                type:'ERROR',
                open:true, 
                message: message,
                time : 3000,
            });
        }
        else if(data.response == 'EMAIL_DOUBLE') {
            let message = '이미 사용중인 이메일입니다.';
            if(this.props.lang == 1) message = 'This email is already in use.';
            if(this.props.lang == 2) message = 'Email này đã được sử dụng.';
            this.props.setSnackbar({
                type:'WARNING',
                open:true, 
                message: message,
                time : 2000,
            });
        }
        else if(data.response == 'PW_NULL') {
            let message = '비밀번호가 입력되지 않았습니다.';
            if(this.props.lang == 1) message = 'Mật khẩu chưa được nhập.';
            if(this.props.lang == 2) message = 'The password has not been entered.';
            this.props.setSnackbar({
                type:'WARNING',
                open:true, 
                message: message,
                time : 2000,
            });
        }
        else if(data.response == 'PW_NOT_MATCH') {
            let message = '비밀번호가 일치하지 않습니다.';
            if(this.props.lang == 1) message = 'Passwords do not match.';
            if(this.props.lang == 2) message = 'Mật khẩu không phù hợp.';
            this.props.setSnackbar({
                type:'WARNING',
                open:true, 
                message: message,
                time : 2000,
            });
        }
        else if(data.response == true) {
            let message = '회원님의 이메일로 인증링크를 발송하였습니다. 확인해주세요.';
            if(this.props.lang == 1) message = 'A verification link has been sent to the member`s email. Please check.';
            if(this.props.lang == 2) message = 'Một liên kết xác minh đã được gửi đến email của thành viên. Hãy kiểm tra.';
            this.props.setSnackbar({
                type:'SUCCESS',
                open:true, 
                message: message,
                time : 2000,
            });
            this.setState({complete:true});
        }
        this.props.isLoading(false);
    }

    render(){
        //로그인 이후 접근 시 
        loginCheckV2();
        let loginState = document.querySelector('#root').getAttribute('loginState');
        if(loginState == 'True') return <Redirect to='/' />
        //회원가입 완료 이후
        if(this.state.complete) return <Redirect to='/users/login'/>

        let emailText = '이메일을 입력해주세요.';
        if(this.props.lang == 1) emailText = 'Enter Email';
        if(this.props.lang == 2) emailText = 'Hãy điền địa chỉ email của bạn.';

        let passwordText = '비밀번호를 입력해주세요.';
        if(this.props.lang == 1) passwordText = 'Enter password';
        if(this.props.lang == 2) passwordText = 'Vui lòng nhập mật khẩu.';

        let repasswordText = '비밀번호를 확인해주세요.';
        if(this.props.lang == 1) repasswordText = 'Re-enter password';
        if(this.props.lang == 2) repasswordText = 'Nhập lại mật khẩu';
        return (
            <React.Fragment>
                <div className="container">
                    <div className="layout_grid">
                        <div className="form_default_wrap">
                            
                            <div className="form_default_inner box_default">
                                <div className="form_title">
                                    <h2>
                                        {this.props.lang == 0 && '회원가입'}
                                        {this.props.lang == 1 && 'Sign-Up'}
                                        {this.props.lang == 2 && 'Đăng ký'}
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
                                    <form>
                                        <ul className="form_input_wrap">
                                            <li>
                                                <label className="form_input" htmlFor="id">
                                                    <span className="form_input_title">
                                                    { this.props.lang == 0 && '이메일'}
                                                    { this.props.lang == 1 && 'E-mail'}
                                                    { this.props.lang == 2 && 'E-mail'}
                                                    </span>
                                                    <input type="email" name="username" placeholder={emailText} 
                                                        onChange={this.changeInput.bind(this)}
                                                        //onBlur={this.blurInput.bind(this)}
                                                    />
                                                </label>
                                            </li>
                                            <li>
                                                <label className="form_input" htmlFor="id">
                                                    <span className="form_input_title">
                                                    { this.props.lang == 0 && '비밀번호'}
                                                    { this.props.lang == 1 && 'Password'}
                                                    { this.props.lang == 2 && 'mật khẩu'}
                                                    </span>
                                                    <input type="password" name="password" placeholder={passwordText} 
                                                        onChange={this.changeInput.bind(this)}
                                                        //onBlur={this.blurInput.bind(this)}
                                                    />
                                                </label>
                                            </li>
                                            <li>
                                                <label className="form_input" htmlFor="id">
                                                    <span className="form_input_title">
                                                    { this.props.lang == 0 && '비밀번호 확인'}
                                                    { this.props.lang == 1 && 'Confirm Password'}
                                                    { this.props.lang == 2 && 'Xác nhận mật khẩu'}
                                                    </span>
                                                    <input type="password" name="re_password"  placeholder={repasswordText} 
                                                        onChange={this.changeInput.bind(this)}
                                                        //onBlur={this.blurInput.bind(this)}
                                                    />
                                                </label>
                                            </li>
                                        </ul>
                                        <div className="form_submit">
                                            <button type="button" className="submit_box sign_button "
                                                onClick={this.submitForm.bind(this)}
                                            >
                                            {this.props.lang == 0 && '회원가입'}
                                            {this.props.lang == 1 && 'Sign-up'}
                                            {this.props.lang == 2 && 'Đăng ký'}
                                            </button>
                                        </div>
                                    </form>
                                    <div className="form_action">
                                        <ul>
                                            <li>
                                                <NavLink to="/users/login">
                                                    {this.props.lang == 0 && '로그인'}
                                                    {this.props.lang == 1 && 'Log-in'}
                                                    {this.props.lang == 2 && 'đăng nhập'}
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SpotSignup;