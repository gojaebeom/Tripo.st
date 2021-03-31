import Styled, { keyframes } from 'styled-components';

export const FootageReviewContainer = Styled.div`
    .container-header{
        padding:0px 10px;
        display:flex;
        justify-content:flex-start;
        align-items:center;
        background:white;
        height:40px;
        margin-bottom:10px;
        i{
            font-size:20px;
            margin-right:10px;
            color:#585858;
        }
        span{
            color:#585858;
        }
    }
    width : 100%;
    min-height : 500px;
    max-height : 500px;
    overflow : auto;
    border : 1px solid #D8D8D8;
    background : #f9f9f9;
`;

export const ReviewListContainer = Styled.ul`

    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    li{
        padding:5px 10px;
        width:100%;
        //border:1px solid black;
        .header{
            display:flex;
            justify-content:flex-start; 
            align-items:center;
            img.profile{
                width:32px;
                height:32px;
                border-radius:100%;
                margin-right:10px;
            }
            span{
                //font-weight:bold;
                color:#6E6E6E;
            }
        }
        .body{
            color:#424242;
        }
    }
`;

export const FootageReviewCreater = Styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    height:50px;
    border:1px solid #D8D8D8;
    border-top:none;
    input{
        width:100%;
        height:100%;
        padding:5px;
        border:none;
    }
    button{
        border:none;
        margin-right:10px;
        cursor:pointer;
        background:none;
        i{
            font-size:30px;
            color:#36d7b7;
        }
    }
`;