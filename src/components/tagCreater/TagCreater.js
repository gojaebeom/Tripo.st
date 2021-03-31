import React from 'react';

function TagCreater(props){
    const addTagList = (e) => {
        console.log(e.target.value);
        let value = e.target.value;

        let message = '태그는 공백을 포함할 수 없습니다.';
        if(props.lang == 1) message = 'Tags cannot contain spaces.';
        if(props.lang == 2) message = 'Thẻ không được chứa khoảng trắng.';
        if(value.indexOf(' ') !== -1){
            props.setSnackbar({
                type:'WARNING',
                open:true, 
                message: message,
                time : 2000,
            });
            e.target.value = '';
            return false;
        }else if(value.indexOf(',') !== -1){
            value = value.split(',')[0];
            props.addTagList(value);
            e.target.value = '';
        }
    }
    const removeTag = (e) => {
        console.log(e);
        props.removeTag(e.target.title);
    }

    let tagText = '태그는 쉼표(,)로 구분하여 작성합니다.';
    if(props.lang == 1) tagText = 'Write tags separated by commas (,).';
    if(props.lang == 2) tagText = 'Viết các thẻ được phân tách bằng dấu phẩy (,).';
    return (
        <React.Fragment>
            <div className="write_input_wrap mt-10">
                <div className="write_input box_line icon_input">
                    <img className="i_18 i_tag mr-10"src="/static/img/tag.png" alt="tag"/>
                    <div className="tags_wrap">
                        {(props.tags.length != 0) &&
                            props.tags.map((e, index)=>{
                                return <span className="tag point" title={e} key={index} onClick={removeTag}>{e} x</span>
                            })  
                        }
                        
                    </div>
                    <input type="text" maxLength="20" 
                    placeholder={tagText}
                    step="border:1px solid black;width:100%;"
                    onKeyUp={addTagList}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
export default TagCreater;