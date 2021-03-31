import React from 'react';

function Footer(props){
    return (
        <React.Fragment>
            <div className="layout_grid">
                <div className="ft_copyright"> 
                    <ul className="ft_sns">
                        <li><a className="point" href="https://www.facebook.com/Tripost-548997909367954" target="_blank"><img src="/static/img/sns_01.png" alt="sns_01"/></a></li>
                        <li><a className="point" href="https://www.instagram.com/tripo.st/" target="_blank"><img src="/static/img/sns_03.png" alt="sns_01"/></a></li>
                    </ul>
                    <div className="footer-content">
                        { props.lang == 0 && <>상호명 저니 | 대표 정다운  | 사업자등록번호 774-35-00947</> } <br/>
                        { ( props.lang == 1 || props.lang ==2 ) && <>Company name Journey | CEO Dawoon,Jeong | Business Registration Numbers 774-35-00947</> } <br/>

                        { props.lang == 0 && <>주소 광주광역시 서구 화운로155번길 12-9, 201호</> }<br/>
                        { ( props.lang == 1 || props.lang ==2 ) && <>Address Hwaun-ro 155beon-gil 12-9, 201, Seo-gu, Gwangju, Republic of Korea</> }<br/>

                        { props.lang == 0 && <>마케팅/제휴 문의 journeykorea1012@gmail.com </> }<br/>
                        { ( props.lang == 1 || props.lang ==2 ) && <>Marketing/Affiliate Inquiries journeykorea1012@gmail.com</> }<br/>

                        { props.lang == 0 && <>이메일 journeykorea1012@gmail.com</> }
                        { ( props.lang == 1 || props.lang ==2 ) && <>Email journeykorea1012@gmail.com</> }
                    </div>
                    <br/>
                    <p>{ props.lang == 0 && <>통신판매자가 아닙니다. 상품·거래정보 및 거래에 대하여 책임을 지지않습니다.</> } </p>
                    <p>{ ( props.lang == 1 || props.lang ==2 ) && <>We are not a seller. We are not responsible for any products, purchase, and transactions.</> } </p>

                    <p>{ props.lang == 0 && <>(C) 2021. 저니(Journey) all rights reserved.</> }</p>
                    <p>{ ( props.lang == 1 || props.lang ==2 ) && <>(C) 2021. 저니(Journey) all rights reserved.</> }</p>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Footer;