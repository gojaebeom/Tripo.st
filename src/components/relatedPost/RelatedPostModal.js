import React, { Component } from 'react'; 
import { CloseButton, CompleteButtonWrap, Modal, ModalBackground, RelatedPostList, Title } from './RelatedPostStyles';

function RelatedPostModal(props){
    const onCloseModal = e =>{
        if(e.currentTarget === e.target) {
            props.setCheckedData([], false);
        }
    }
    const onChecked = e => {
        const isChecked = e.target.checked;
        const spotPk = e.target.value;

        let message = '관련 게시물은 최대 두 개 까지 등록할 수 있습니다.';
        if(props.lang == 1) message = 'You can register up to two related posts.';
        if(props.lang == 2) message = 'Bạn có thể đăng ký tối đa hai bài viết liên quan.';
        if(isChecked){
            if(props.checkedData.length >= 2){
                props.setSnackbar({
                    type:'WARNING',
                    open:true, 
                    message: message,
                    time : 2000,
                });
                e.target.checked = false;
                return;
            }
            const checkedData = props.data.filter(e => e.spot.pk === Number(spotPk));
            const addCheckedData = props.checkedData.concat(checkedData);
            props.setCheckedData(addCheckedData, true);
        }else{
            const newCheckedData = props.checkedData.filter(e => e.spot.pk !== Number(spotPk));
            props.setCheckedData(newCheckedData, true);
        }
    }
    const onRegister = () => {
        props.onCloseModal();
    }

    return(
    <React.Fragment>
        {
            props.open &&
            <ModalBackground
                onClick={onCloseModal}
            >
                <Modal>
                    <CloseButton>
                        <i className="fas fa-times-circle"
                            onClick={onCloseModal}
                        ></i>
                    </CloseButton>
                    <Title>
                        {props.lang == 0 && '관련 게시물 설정'}
                        {props.lang == 1 && 'Related post settings'}
                        {props.lang == 2 && 'Cài đặt bài đăng liên quan'}
                    </Title>
                    <RelatedPostList >
                        {
                            props.data.map(e=>{
                                return(
                                    <li key={e.spot.pk}>
                                        <label className="check_box">
                                            <span>{e.spot.title}</span>
                                            <input type="checkbox" value={e.spot.pk}
                                                onClick={onChecked}
                                            />
                                            <i className="fas fa-check-square"></i>
                                        </label>
                                    </li>
                                )
                            })
                        }
                    </RelatedPostList>
                    <CompleteButtonWrap>
                        <button type="button"
                            onClick={onRegister}
                        >
                            <span>
                            {props.lang == 0 && '등록'}
                            {props.lang == 1 && 'Enrollment'}
                            {props.lang == 2 && 'Ghi danh'}
                            </span>
                            <span><i className="fas fa-paper-plane"></i></span>
                        </button>
                    </CompleteButtonWrap>
                </Modal>
            </ModalBackground>
        }
    </React.Fragment>
    )
}
export default RelatedPostModal;