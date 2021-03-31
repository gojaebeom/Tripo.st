import Styled, { keyframes } from 'styled-components';

export const ModalBackground = Styled.div`
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.5);
    z-index:999;
    display:flex;
    justify-content:center;
    align-items:center;
`;

export const Modal = Styled.div`
    width:500px;
    border-radius:3px;
    background:white;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    padding:5px;
    overflow-Y:auto;

    @media all and (max-width:760px){
        width:100%;
    }
`;

export const CloseButton = Styled.div`
    width:100%;
    display:flex;
    justify-content:flex-end;
    padding:10px;
    i{
        font-size:30px;
        color:#CACFD2;
        cursor:pointer;
    }
`;

export const Title = Styled.div`
    width:90%;
    text-align:center;
    font-size:20px;
    color:#36d7b7;
    padding-bottom:20px;
    border-bottom:2px solid #F2F3F4;
`;

const effect = keyframes`
    0% {
        font-size:35px;
    }
    25% {
        font-size:25px;
    }
    50% {
        font-size:30px;
    }
    75% {
        font-size:35px;
    }
    100% {
        font-size:30px;
    }
`;

export const RelatedPostList = Styled.ul`
    width:90%;
    overflow:auto;
    height:300px;
    li{
        border-radius:3px;
        border:1px solid #E5E7E9;
        padding:10px;
        margin-top:10px;
        
        label{
            width:100%;
            input:checked ~ i{
                color:#36d7b7;
                animation:${effect} 0.2s;
            }
            i{
                font-size:30px;
                color:#E5E7E9;
            }
        }
    }
`;

export const CompleteButtonWrap = Styled.div`
    width:90%;
    display:flex;
    justify-content:flex-end;
    padding:10px 0px;
    button{
        border:none;
        border-radius:5px;
        padding:10px 15px;
        background:#36d7b7;
        margin-top:10px;
        font-size:16px;
        font-weight:bold;
        color:white;
        cursor:pointer;
    }
`;

export const RelatedNoneCard = Styled.div`
    width:200px;
    height:250px;
    border-radius:10px;
    border:1px solid #CACFD2;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-right:10px;
    cursor:pointer;
    i{
        font-size:30px;
        color:#36d7b7;
    }
`;

export const RelatedCard = Styled.div`
    position:relative;
    width:200px;
    height:250px;
    border-radius:10px;
    background:white;
    display:flex;
    overflow:hidden;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    margin-right:10px;
    -webkit-box-shadow: 3px 6px 8px rgba(0,0,0,0.2);
    box-shadow: 3px 6px 8px rgba(0,0,0,0.2);
    cursor:pointer;
    .preview{
        position:relative;
        width:100%;
        height:150px;
        .fa-times-circle{
            position:absolute;
            right:5px;
            top:5px;
            color:#36d7b7;
            background:white;
            font-size:25px;
            border-radius:100%;
        }
        .open{
            position:absolute;
            left:0px;
            bottom:0px;
            width:100%;
            margin-bottom:50px;
            display:flex;
            justify-content:center;
            
            
            span{
                background:#36d7b7;
                width:auto;
                border-radius:30px;
                font-size:12px;
                color:white;
                font-weight:bold;
                padding:5px 10px;
            }

        }
        img{
            width:100%;
            height:100%;
        }
    }
    .body{
        width:100%;
        height:100px;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:flex-start;
        padding:10px;
        div{
            display:inline-block;
            width:80%;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
        }
        .title{
            font-size:16px;
            
        }
        .content{
            font-size:14px;
        }
    }

`;
