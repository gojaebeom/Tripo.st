import React, { Component } from 'react';

class UserRemakePassword extends Component{
    
    //Rendering🎨
    render(){
        return(
            <React.Fragment>
                <div className="form_default_inner box_default">
                    <div className="form_title">
                        <h2>비밀번호 찾기</h2>
                    </div>
                    <div className="form_list">
                        <ul className="form_input_wrap">
                            <li>
                                <label className="form_input" htmlFor="">
                                    <span className="form_input_title">이메일</span>
                                    <input type="text" placeholder="이메일을 입력해주세요." />
                                </label>
                            </li>
                        </ul>
                        <div className="form_submit">
                            <button type="button" className="submit_box sign_button">임시 비밀번호 발송</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
} 

export default UserRemakePassword;