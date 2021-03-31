import React from 'react';
import { Description1, Description2,Description3 } from '../../utils/Tos_small';
import { userSignupInfo } from '../../apis/userApi/userApis';

class UserSignupAddInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            //user formData
            nickname :'',
            birthday :'',
            gender   :'',
            marketingChoice : 0,

            //개인정보 필수 값
            tos1     :false,
            tos2     :false,
        }
    }

    changeInput(e) {
        let value = e.target.value;
        console.log(value);
        if(e.target.name == 'nickname') this.setState({nickname : value});
        if(e.target.name == 'birthday') this.setState({birthday : value});
        console.log(this.state);
    }

    clickInput(e){
        let value = e.target.value;
        this.setState({gender : value});
        console.log(this.state);
    }

    clickTosInput(e) {
        if (e.target.id == "check1") {
            this.setState({
                tos1 : !this.state.tos1
            });            
        } 
        else if (e.target.id == "check2") {
            this.setState({
                tos2 : !this.state.tos2
            });
        }
        else if (e.target.id == "marketingChoice"){
            this.setState({
                marketingChoice : this.state.marketingChoice == 0 ? 1 : 0
            });
        }
    }

    //핸들링 메서드 만들어주기

    async submitForm(e) {
        //이부분에서 조건 처리
        //값을 바꿀 땐 setState({...}) , 단지 사용하고자 할땐 (값을 접근하고싶다면) this.state.값이름
        if (this.state.tos1 == false || this.state.tos2 == false){
            /**@SnackbarState */
            this.props.setSnackbar({
                type:'WARNING',
                open:true, 
                message:'필수 이용약관에 동의해주세요.',
                time : 3000,
            })
            console.log('이용약관 동의 안함!');
            return false;
        }
        console.log('이용약관 동의함!');
        this.props.isLoading(true);
        
        const formData = new FormData();
        formData.append('nickname', this.state.nickname);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('marketing_choice', this.state.marketingChoice);
        let data = await userSignupInfo(formData);
        data.response == false ?
        this.props.setSnackbar({
            type:'ERROR',
            open:true, 
            message:'요청이 정상적으로 처리되지 못하였습니다. 관리자에게 문의해주세요.😥',
            time : 3000,
        }) : null;
        data.response == 'NICKNAME_NULL' ? 
        this.props.setSnackbar({
            type:'WARNING',
            open:true, 
            message:'닉네임을 입력해주세요.',
            time : 3000,
        }) : null;
        data.response == 'NICKNAME_SAME' ? 
        this.props.setSnackbar({
            type:'WARNING',
            open:true, 
            message:'이미 사용중인 닉네임입니다.',
            time : 3000,
        }) : null;
        data.response == 'GENDER_NULL' ? 
        this.props.setSnackbar({
            type:'WARNING',
            open:true, 
            message:'성별을 선택해주세요.',
            time : 3000,
        }) : null;
        data.response == 'DATE_TYPE_ERROR' ? 
        this.props.setSnackbar({
            type:'WARNING',
            open:true, 
            message:'날짜 형식이 올바르지 않습니다. 다시입력해주세요.',
            time : 3000,
        }) : null;
        data.response == true ? location.href ='/' : null;
        this.props.isLoading(false);
    }

    render(){
        
        const tosStyle = { 
            fontSize : '1em',
        }

        if(document.querySelector('#root').getAttribute('nickname') != "null"){
            return window.location.href="/";
        }

        let userBrowserLang = navigator.language;
        if (userBrowserLang === 'en' || userBrowserLang === 'en-US'){
            return (
                <React.Fragment>
                    <div className="container">
                        <div className="layout_grid">
                            <div className="form_default_wrap">
                                <div className="form_default_inner_tos box_default">
                                    <div className="tos">
                                        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                                            <h2>Tripo.st privacy policy</h2>
                                        </div>
                                        <br />
                                        <h4 style={{marginBottom:'5px'}}>Privacy notice</h4>
                                        <div className="txt_area_outer">
                                            <div className="txt_area_inner">
                                                <Description3></Description3>
                                            </div>
                                        </div>
                                        <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'100%'}}>
                                            <label htmlFor="check1"  className="check_box" style={{margin:'0px',width:'50px'}}>
                                                <input id="check1" type="checkbox" onClick={this.clickTosInput.bind(this)}
    
                                                />
                                                <span className="check_icon"></span>
                                            </label>
                                            <span> I agree to the terms and conditions above. (necessary)</span>
                                        </div>
                                        <p>
                                            <input type="checkbox" id="check_1"  name="" /><br />
                                        </p>            
                                        <h4>Marketing information</h4>
                                        <span className="info_agree">You can refuse to receive marketing information or to collect and use personal information for marketing. Even if you refuse to use the service, there is no restriction on the use of the service, but there may be restrictions on participation in various news and events.</span>
                                        <br />
                                        <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'100%', marginTop:'10px'}}>
                                            <label htmlFor="marketingChoice"  className="check_box" style={{margin:'0px',width:'50px'}}>
                                                <input id="marketingChoice" type="checkbox" name="marketingChoice"
                                                    onClick={this.clickTosInput.bind(this)}
                                                />
                                                <span className="check_icon"></span>
                                            </label>
                                            <span>  I agree to the terms and conditions above. (optional)</span>
                                        </div>
                                    
                                    </div>
                                
                                    
                                    <div className="form_title" style={{marginTop:'30px'}}>
                                        <h2>Additional information</h2>
                                    </div>
                                    <div className="form_list" style={{width:'100%',display:'flex',justifyContent:'center'}}>
                                        <form style={{width:'80%'}}>
                                            <ul className="form_input_wrap">
                                                <li>
                                                    <label className="form_input" htmlFor="nickname">
                                                        <span className="form_input_title">nickname</span>
                                                        <input id="nickname" type="text" name="nickname" placeholder="닉네임"
                                                        onChange={this.changeInput.bind(this)}
                                                        />
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="form_input" htmlFor="">
                                                        <span className="form_input_title">date of birth</span>
                                                        <input type="date" name="birthday" placeholder="20201230"
                                                        onChange={this.changeInput.bind(this)}
                                                        />
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="form_input" htmlFor=""><span className="form_input_title">gender</span>
                                                        <div className="form_input_checkbox">
                                                            <label htmlFor="gender_man" className="check_box">Man
                                                                <input id="gender_man" type="radio" name="gender" value="남"
                                                                onClick={this.clickInput.bind(this)}
                                                                />
                                                                <span className="check_icon"></span>
                                                            </label>
                                                            <label htmlFor="gender_woman"  className="check_box">Woman 
                                                                <input id="gender_woman" type="radio" name="gender" value="여"
                                                                onClick={this.clickInput.bind(this)}
                                                                />
                                                                <span className="check_icon"></span>
                                                            </label>
                                                        </div>
                                                    </label>
                                                </li>
                                            </ul>
                                            <div className="form_submit">
                                                <button type="button" className="submit_box sign_button"
                                                    onClick={this.submitForm.bind(this)}
                                                >Sign up</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
        )}
        else{
            return (
                <React.Fragment>
                    <div className="container">
                        <div className="layout_grid">
                            <div className="form_default_wrap">
                                <div className="form_default_inner_tos box_default">
                                    <div className="tos">
                                        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                                            <h2>트리포(tripo.st) 이용약관</h2>
                                        </div>
                                        <br />
                                        <h4 style={{marginBottom:'5px'}}>트리포(tripo.st) 이용약관</h4>
                                        <div className="txt_area_outer">
                                            <div className="txt_area_inner">
                                                <Description2></Description2>
                                            </div>
                                        </div>
                                        <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'100%'}}>
                                            <label htmlFor="check1"  className="check_box" style={{margin:'0px',width:'50px'}}>
                                                <input id="check1" type="checkbox" onClick={this.clickTosInput.bind(this)}

                                                />
                                                <span className="check_icon"></span>
                                            </label>
                                            <span> 위의 약관에 동의 합니다. (필수)</span>
                                        </div>
                                        <p>
                                            <input type="checkbox" id="check_1"  name="" /><br />
                                        </p>            
                                        <h4 style={{marginBottom:'5px'}}>개인정보 처리방침 및 쿠키정책</h4>
                                        <div className="txt_area_outer">
                                            <div className="txt_area_inner">
                                                <Description1></Description1>
                                            </div>
                                        </div>
                                        <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'100%'}}>
                                            <label htmlFor="check2"  className="check_box" style={{margin:'0px',width:'50px'}}>
                                                <input id="check2" type="checkbox" onClick={this.clickTosInput.bind(this)}

                                                />
                                                <span className="check_icon"></span>
                                            </label>
                                            <span> 위의 약관에 동의 합니다. (필수)</span>
                                        </div>
                                        <br />
                                        <h4>마케팅 정보 활용 동의</h4>
                                        <span className="info_agree">마케팅 정보 수신 여부 및 마케팅을 위한 개인정보 수집이용을 거부하실 수 있으며, 거부 시에도 서비스 이용에 제한은 없으나, 각종 소식 및 이벤트 참여에 제한이 있을 수 있습니다.</span>
                                        <br />
                                        <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'100%', marginTop:'10px'}}>
                                            <label htmlFor="marketingChoice"  className="check_box" style={{margin:'0px',width:'50px'}}>
                                                <input id="marketingChoice" type="checkbox" name="marketingChoice"
                                                    onClick={this.clickTosInput.bind(this)}
                                                />
                                                <span className="check_icon"></span>
                                            </label>
                                            <span> 위의 약관에 동의 합니다. (선택)</span>
                                        </div>
                                    
                                    </div>
                                
                                    
                                    <div className="form_title" style={{marginTop:'30px'}}>
                                        <h2>추가정보 입력</h2>
                                    </div>
                                    <div className="form_list" style={{width:'100%',display:'flex',justifyContent:'center'}}>
                                        <form style={{width:'80%'}}>
                                            <ul className="form_input_wrap">
                                                <li>
                                                    <label className="form_input" htmlFor="nickname">
                                                        <span className="form_input_title">닉네임</span>
                                                        <input id="nickname" type="text" name="nickname" placeholder="닉네임"
                                                        onChange={this.changeInput.bind(this)}
                                                        />
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="form_input" htmlFor="">
                                                        <span className="form_input_title">생년월일</span>
                                                        <input type="date" name="birthday" placeholder="20201230"
                                                        onChange={this.changeInput.bind(this)}
                                                        />
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="form_input" htmlFor=""><span className="form_input_title">성별</span>
                                                        <div className="form_input_checkbox">
                                                            <label htmlFor="gender_man" className="check_box">남자 
                                                                <input id="gender_man" type="radio" name="gender" value="남"
                                                                onClick={this.clickInput.bind(this)}
                                                                />
                                                                <span className="check_icon"></span>
                                                            </label>
                                                            <label htmlFor="gender_woman"  className="check_box">여자 
                                                                <input id="gender_woman" type="radio" name="gender" value="여"
                                                                onClick={this.clickInput.bind(this)}
                                                                />
                                                                <span className="check_icon"></span>
                                                            </label>
                                                        </div>
                                                    </label>
                                                </li>
                                            </ul>
                                            <div className="form_submit">
                                                <button type="button" className="submit_box sign_button"
                                                    onClick={this.submitForm.bind(this)}
                                                >회원가입</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default UserSignupAddInfo;