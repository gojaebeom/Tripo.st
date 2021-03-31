import React from 'react';
import ImagePreivew from '../../components/imagePreview/ImagePreview';
import MoveSwitch from '../../components/moveSwitch/MoveSwitch';
import TagCreater from '../../components/tagCreater/TagCreater';
import { bgm_check, image_check } from '../../utils/file_check';
import { Redirect } from 'react-router-dom';
import { spotDelete, spotUpdate, spotDetail } from '../../apis/spotApi/spotApis';
import { Sleep } from '../../utils/sleep/Sleep';
import { avoidClickDom } from '../../utils/clickDom';
import { drawGoogleMap } from '../../utils/googleMap/GoogleMap';

class SpotUpdate extends React.Component{
    constructor() {
        super();
        this.state = {
            id : 0,
            title : '',
            content : '',
            imgFiles : [],
            previewImgFiles : [],
            panoImg : null,
            panoBgm : null,
            start : '없음',
            theme : 0,
            cost : 0,
            costType : 'KRW',
            moveType : 1,
            time : '당일',
            young : false,
            disabled : false,
            animal : false,
            tags : [],
            addr : '',
            complete : false,
            lat : 0,
            lon : 0,
        }
    }

    async componentDidMount(){
        this.props.isLoading(true);
        let id = location.pathname.split('/')[2];
        let result = await spotDetail(id);
        console.log(result);

        result = result.data[0];
        console.log(result);
        if(document.querySelector('#root').getAttribute('user_id') != result.user_info.id){
            alert('잘못된 접근입니다.');
            history.back();
        }
        this.setState({
            id : result.spot.pk,
            title : result.spot.title,
            content : result.spot.content,
            imgFiles : result.spotphotos,
            panoImg : (result.spotpanos.length != 0)? `/media/${result.spotpanos[0].path}` : null ,
            panoBgm : (result.spotpanos.length != 0)? `/media/${result.spotpanos[0].bgm}` : null,
            start : result.spot.start,
            theme : result.spot.theme,
            cost : result.spot.cost,
            costType : result.spot.cost_type,
            moveType : result.spot.move_type,
            time : result.spot.time,
            young : result.spot.young,
            disabled : result.spot.disabled,
            animal : result.spot.animal,
            addr : result.spot.addr,
            lat : result.spot.lat,
            lon : result.spot.lon
        });
        
        let arr = [];
        for(let tag of result.spottags){
            arr.push(tag.name);
        }
        this.setState({tags:arr});
        drawGoogleMap();
        this.props.isLoading(false);
        // 스크롤 올리기
        window.scrollTo(0, 0);
    }

    //이미치 추가
    appendImages(imgFile){
        this.setState({imgFiles : this.state.imgFiles.concat(imgFile)});
        console.log(this.state.imgFiles);
    }
    appendPreviewImages(imgFile){
        this.setState({previewImgFiles : this.state.previewImgFiles.concat(imgFile)});
        console.log('리사이징 이미지 파일--------------------->');
        console.log(this.state.previewImgFiles);
    }
    removeImage(){
        this.setState({ imgFiles : [], previewImgFiles : [] });
        console.log(this.state.imgFiles);
    }

    // 기본 택스트, 숫자를 작성하는 input 관련
    changeInput(e){
        let value = e.target.value;
        if(e.target.name == 'title') this.setState({title : value});
        if(e.target.name == 'content') this.setState({content : value});
        if(e.target.name == 'start') this.setState({start : value});
        if(e.target.name == 'theme') this.setState({theme : value});
        if(e.target.name == 'time') this.setState({time : value});
        if(e.target.name == 'cost') this.setState({cost : value});
        if(e.target.name == 'costType') this.setState({costType : value});
    }

    // 이동수단 관련
    checkMoveType(e){
        console.log(e.target);
        this.setState({moveType : e.target.value});
        console.log(this.state.moveType);
    }
    changePanoImgInput(e){
        let result = image_check(e.target);
        if(result){
            this.setState({panoImg : e.target.files[0]});
            return true;
        }else{
            this.setState({panoImg : null});
            return false;
        }
        
    }
    changePanoBgmInput(e){
        let result = bgm_check(e.target);
        if(result){
            this.setState({panoBgm : e.target.files[0]});
            return true;
        }else{
            this.setState({panoBgm : null});
            return false;
        }
    }

    // 유아, 장애인, 반려동물 채크관련
    clickCheckBox(e){
        if(e.target.name == 'young'){
            e.target.value == 'on' ? this.setState({young:true}) : this.setState({young:false})
        } 
        if(e.target.name == 'disabled'){
            e.target.value == 'on' ? this.setState({disabled:true}) : this.setState({disabled:false})
        }
        if(e.target.name == 'animal') {
            e.target.value == 'on' ? this.setState({animal:true}) : this.setState({animal:false})
        }

        console.log(this.state);
    }

    async deleteSpot(){
        console.log('스팟 삭제');
        let result = await spotDelete(this.state.id);
        this.setState({complete:true});
    }

    // 태그 관련
    addTagList(tag){
        let result = true;
        this.state.tags.map(e => {
            if(e == tag){
                let message = '중복되는 태그입니다.';
                if(this.props.lang == 1) message = 'This is a duplicate tag.';
                if(this.props.lang == 2) message = 'Đây là một thẻ trùng lặp.';
                this.props.setSnackbar({
                    type:'WARNING',
                    open:true, 
                    message: message,
                    time : 2000,
                });
                result = false;
                return;
            }
        });
        if(result != false){
            this.setState({tags : this.state.tags.concat(tag)});
        }
        // console.log(this.state.tags);
    }
    removeTag(tag){
        // console.log(`삭제할 태그 : ${tag}`);
        const filterTags = this.state.tags.filter(e => {
            console.log(`배열에 있는 태그 : ${e}`);
            if(e != tag){
                return e;
            }
        });
        this.setState({tags : [].concat(filterTags) })
        // console.log(this.state.tags);
    }

    //구글맵 관련
    async clickAddrSearch(){
        let message = '위치를 탐색중입니다..';
        if(this.props.lang == 1) message = 'Searching for a location..';
        if(this.props.lang == 2) message = 'Đang tìm kiếm vị trí ..';
        this.props.setSnackbar({
            type:'INFO',
            open:true, 
            message: message,
            result : true,
            time : 2000,
        });

        await drawGoogleMap();
        await Sleep(1000);

        this.setState({
            lat : document.querySelector('#spot_create_map_lat').value,
            lon : document.querySelector('#spot_create_map_lon').value 
        });

        let message2 = '위치가 탐색되었습니다.';
        if(this.props.lang == 1) message = 'The location has been explored.';
        if(this.props.lang == 2) message = 'Vị trí đã được khám phá.';
        this.props.setSnackbar({
            type:'SUCCESS',
            open:true, 
            message: message2,
            result : true,
            time : 2000,
        });
    }
    keyUpAddrSearch(e){
        if(e.target.name == 'addr') this.setState({addr : e.target.value});
        if(e.keyCode == 13){
            this.clickAddrSearch();
        }
    }
    changeLatLon(e){
        let value = e.target.value;
        if(e.target.name == 'lat') this.setState({lat : value});
        if(e.target.name == 'lon') this.setState({lon : value});
    }

    async submitForm(e){
        /**-------------유효성 검사------------- */
        if(this.state.imgFiles.length == 0){
            let message = '한장 이상의 사진을 등록해주세요.';
            if(this.props.lang == 1) message = 'Please register more than one photo.';
            if(this.props.lang == 2) message = 'Vui lòng đăng ký nhiều hơn một bức ảnh.';
            this.props.setSnackbar({
                type:'WARNING',
                open:true, 
                message: message,
                time : 2000,
            });
            return false;
        }

        if(this.state.lat == 0 || this.state.lon == 0){
            let message = '주소를 입력하여 지도에 위치를 띄워주세요.';
            if(this.props.lang == 1) message = 'Please enter your address to display your location on the map.';
            if(this.props.lang == 2) message = 'Vui lòng nhập địa chỉ của bạn để hiển thị vị trí của bạn trên bản đồ.';
            this.props.setSnackbar({
                type:'WARNING',
                open:true, 
                message: message,
                time : 2000,
            });
            return false;
        }

        /**-------------x유효성 검사x------------- */

        console.log(e.target);
        avoidClickDom(e.target);

        window.scrollTo({top:0, left:0, behavior:'smooth'});
        this.props.isLoading(true);

        let message = '스팟을 등록중입니다.';
        if(this.props.lang == 1) message = 'Spot is being registered.';
        if(this.props.lang == 2) message = 'Spot đang được đăng ký.';
        this.props.setSnackbar({
            type:'INFO',
            open:true, 
            message: message,
            result : true,
            time : 5000,
        });

        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);

        // console.log(this.state.imgFiles[0][0]);
        // console.log(typeof this.state.imgFiles[0]);
        if(this.state.imgFiles.length != 0){
            if(this.state.imgFiles[0].path){
                formData.append('imgs', null);
            }else if(this.state.imgFiles[0]){
                for(let file of this.state.imgFiles){
                    formData.append('imgs', file);
                }
                for(let file of this.state.previewImgFiles){
                    formData.append('previews', file);
                }
            }
        }else{
            formData.append('imgs', null);
        }

        formData.append('panorama', this.state.panoImg);
        formData.append('bgm', this.state.panoBgm);
        formData.append('start', this.state.start);
        formData.append('theme', this.state.theme);
        formData.append('cost', this.state.cost);
        formData.append('costType', this.state.costType);
        formData.append('move_type', this.state.moveType);
        formData.append('time', this.state.time);
        formData.append('young', this.state.young);
        formData.append('disabled', this.state.disabled);
        formData.append('animal', this.state.animal);
        this.state.tags.map(tag => {
            formData.append('tags', tag);
        })
        formData.append('addr', this.state.addr);
        formData.append('lat', this.state.lat);
        formData.append('lon', this.state.lon);
        let data = await spotUpdate(formData, this.state.id);
        
        this.props.isLoading(false);
        if(data.result){
            this.setState({complete: true});

            let message = '스팟이 등록되었습니다.';
            if(this.props.lang == 1) message = 'The spot has been registered.';
            if(this.props.lang == 2) message = 'Vị trí đã được đăng ký.';
            this.props.setSnackbar({
                type:'SUCCESS',
                open:true, 
                message: message,
                result : true,
                time : 2000,
            });
        }else{
            avoidClickDom(e.target);
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
    }

    render(){
        if(document.querySelector('#root').getAttribute('loginState') == 'False'){
            alert('잘못된 접근입니다.');
            return <Redirect to="/"/>
        }
        if(this.state.complete){
            return <Redirect to="/"/>
        }

        let startText = '여행 출발 주소 입력';
        let titleText = '제목을 입력하세요.';
        let contentText = '내용을 입력해주세요';
        let addrText = '여행 주소를 입력하세요';
        if(this.props.lang == 1) {
            startText = 'Enter your travel departure address';
            titleText = 'Please enter a title.';
            contentText = 'Please enter your details';
            addrText = 'Please enter your travel address';
        } else if(this.props.lang == 2){
            startText = 'Nhập địa chỉ khởi hành chuyến du lịch của bạn';
            titleText = 'Vui lòng nhập tiêu đề.';
            contentText = 'Vui lòng nhập thông tin chi tiết của bạn';
            addrText = 'Vui lòng nhập địa chỉ du lịch của bạn';
        }
        return (
            <React.Fragment>
                <div className="popup_container">
                    <div className="popup_detail">
                        <form name="spot_create_form" 
                        autoComplete="off">

                            <input id="spot_create_csrf" type="hidden" name="csrfmiddlewaretoken"/>

                            <div className="write_default box_default">
                                <div className="write_default_inner">
                                    <div className="write_default_top">
                                        <div className="write_default_tab">
                                            <ul className="tab_list">
                                                <li className="active">
                                                    <div className="tab_title">
                                                    { this.props.lang == 0 && '스팟 수정'}
                                                    { this.props.lang == 1 && 'Edit a trip'}
                                                    { this.props.lang == 2 && 'Chỉnh sửa tại chỗ'}
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="write_default_bottom">
                                        <div className="file_upload_gallery">

                                            <ImagePreivew 
                                                lang={this.props.lang}
                                                imgFiles={this.state.imgFiles}
                                                appendImages={this.appendImages.bind(this)}
                                                appendPreviewImages={this.appendPreviewImages.bind(this)}
                                                removeImage={this.removeImage.bind(this)}
                                                setSnackbar={this.props.setSnackbar}
                                            />

                                            <div className="write_panarama mt-20">
                                                <ul className="col_row">
                                                    <li className="col_2">
                                                        <div className="write_input_wrap">
                                                            <div className="write_input_title">
                                                            { this.props.lang == 0 && '파노라마 사진'}
                                                            { this.props.lang == 1 && 'Spot edit'}
                                                            { this.props.lang == 2 && 'Chỉnh sửa tại chỗ'}
                                                            </div>
                                                            <div className="write_input input_default" >
                                                                { this.props.lang == 0 && '파노라마는 수정하거나 새로 등록할 수 없습니다. 파노라마 사진과 배경음악의 큰 용량으로 인해 한 게시물당 최초 한번만 생성 할 수 있는 점 양해바랍니다.'}
                                                                { this.props.lang == 1 && 'Panoramas cannot be modified or newly registered. Please note that you can only create the first one per post due to the large capacity of the panorama photo and background music.'}
                                                                { this.props.lang == 2 && 'Ảnh toàn cảnh không thể được sửa đổi hoặc đăng ký mới. Xin lưu ý rằng bạn chỉ có thể tạo ảnh đầu tiên cho mỗi bài đăng do dung lượng lớn của ảnh toàn cảnh và nhạc nền.'}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                        <div className="write">
                                            <div className="write_travel_info">
                                                <ul className="col_row">
                                                    <li className="col_1">
                                                        <div className="write_input_wrap">
                                                            <div className="write_input_title">
                                                            {this.props.lang == 0 && '여행 출발 주소'}
                                                            {this.props.lang == 1 && 'Departure'}
                                                            {this.props.lang == 2 && 'Địa chỉ khởi hành du lịch'}
                                                            </div>
                                                            <div className="write_input input_default">
                                                           
                                                            <input type="text" name="start" placeholder={startText} value={this.state.start}
                                                            onChange={this.changeInput.bind(this)}
                                                            /></div>
                                                        </div>
                                                    </li>
                                                    <li className="col_1">
                                                        <div className="write_input_wrap">
                                                            <div className="write_input_title">
                                                            {this.props.lang == 0 && '여행 테마'}
                                                            {this.props.lang == 1 && 'Theme'}
                                                            {this.props.lang == 2 && 'Chủ đề du lịch'}
                                                            </div>
                                                            <div className="write_input input_default">
                                                   
                                                                <select name="theme" value={this.state.theme}
                                                                onChange={this.changeInput.bind(this)}
                                                                >
                                                                    <option value="0">
                                                                    {this.props.lang == 0 && '테마 없음'}
                                                                    {this.props.lang == 1 && 'N/A'}
                                                                    {this.props.lang == 2 && 'Không có chủ đề'}
                                                                    </option>
                                                                    <option value="1">
                                                                    {this.props.lang == 0 && '캠핑'}
                                                                    {this.props.lang == 1 && 'Camping'}
                                                                    {this.props.lang == 2 && 'Cắm trại'}
                                                                    </option>
                                                                    <option value="2">
                                                                    {this.props.lang == 0 && '차박'}
                                                                    {this.props.lang == 1 && 'Auto camping'}
                                                                    {this.props.lang == 2 && 'Cắm trại tự động'}
                                                                    </option>
                                                                    <option value="3">
                                                                    {this.props.lang == 0 && '야경'}
                                                                    {this.props.lang == 1 && 'Night view'}
                                                                    {this.props.lang == 2 && 'Cảnh đêm'}
                                                                    </option>
                                                                    <option value="4">
                                                                    {this.props.lang == 0 && '코로나 x'}
                                                                    {this.props.lang == 1 && 'COVID-19 free'}
                                                                    {this.props.lang == 2 && 'COVID-19 miễn phí'}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="col_1">
                                                        <div className="write_input_wrap">
                                                            <div className="write_input_title">        
                                                            {this.props.lang == 0 && '여행 경비'}
                                                            {this.props.lang == 1 && 'Expense'}
                                                            {this.props.lang == 2 && 'Chi phí đi lại'}
                                                            </div>
                                                            <div className="write_input input_default input_money">
                                                                <div className="cost_input_wrap">
                                                                    <input type="number" name="cost" style={{border:'none',width:'100%',padding:"0px"}}
                                                                    //defaultValue={this.state.cost}
                                                                    value={this.state.cost}
                                                                    onChange={this.changeInput.bind(this)}
                                                                    />
                                                                    <select className="a-current-coin" name="costType"
                                                                        onChange={this.changeInput.bind(this)}
                                                                        value={this.state.costType}
                                                                    >
                                                                        <option value="KRW">KRW</option>
                                                                        <option value="USD">USD</option>
                                                                        <option value="VND">VND</option>
                                                                        <option value="EUR">EUR</option>
                                                                        <option value="CNY">CNY</option>
                                                                        <option value="JPY">JPY</option>
                                                                        <option value="CAD">CAD</option>
                                                                        <option value="AUD">AUD</option>
                                                                        <option value="NZD">NZD</option>
                                                                        <option value="TWD">TWD</option>
                                                                        <option value="MXN">MXN</option>
                                                                        <option value="CHF">CHF</option>
                                                                        <option value="PHP">PHP</option>
                                                                        <option value="THB">THB</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="col_1">

                                                        <MoveSwitch 
                                                            lang={this.props.lang}
                                                            moveType={this.state.moveType}
                                                            checkMoveType={this.checkMoveType.bind(this)}
                                                        />

                                                    </li>
                                                    <li className="col_1">
                                                        <div className="write_input_wrap">
                                                            <div className="write_input_title">
                                                            {this.props.lang == 0 && '여행 기간'}
                                                            {this.props.lang == 1 && 'Travel period'}
                                                            {this.props.lang == 2 && 'Thời gian du lịch'}
                                                            </div>
                                                            <div className="write_input input_default">
                                                                <select name="time" value={this.state.time} 
                                                                onChange={this.changeInput.bind(this)}>
                                                                    <option value="당일">
                                                                    {this.props.lang == 0 && '당일'}
                                                                    {this.props.lang == 1 && 'A day'}
                                                                    {this.props.lang == 2 && 'ngày'}
                                                                    </option>
                                                                    <option value="1박 2일">
                                                                    {this.props.lang == 0 && '1박 2일'}
                                                                    {this.props.lang == 1 && '2 days'}
                                                                    {this.props.lang == 2 && '1 đêm 2 ngày'}
                                                                    </option>
                                                                    <option value="2박 3일">
                                                                    {this.props.lang == 0 && '2박 3일'}
                                                                    {this.props.lang == 1 && '3 days'}
                                                                    {this.props.lang == 2 && '2 đêm 3 ngày'}
                                                                    </option>
                                                                    <option value="3박 4일">
                                                                    {this.props.lang == 0 && '3박 4일'}
                                                                    {this.props.lang == 1 && '4 days'}
                                                                    {this.props.lang == 2 && '4 ngày 3 đêm'}
                                                                    </option>
                                                                    <option value="일주일">
                                                                    {this.props.lang == 0 && '일주일'}
                                                                    {this.props.lang == 1 && 'A week'}
                                                                    {this.props.lang == 2 && 'một tuần'}
                                                                    </option>
                                                                    <option value="한달">
                                                                    {this.props.lang == 0 && '한달'}
                                                                    {this.props.lang == 1 && 'A month'}
                                                                    {this.props.lang == 2 && 'mot thang'}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="write_title mt-20">
                                                <ul className="col_row">
                                                    <li className="col_3">
                                                        <div className="write_input_wrap">
                                                            <div className="write_input_title">
                                                            {this.props.lang == 0 && '여행 제목'}
                                                            {this.props.lang == 1 && 'Travel title'}
                                                            {this.props.lang == 2 && 'Tiêu đề du lịch'}
                                                            </div>
                                                            <div className="write_input input_default">
                                    
                                                            <input type="text" className="input" name="title" placeholder={titleText}
                                                            defaultValue={this.state.title}
                                                            onChange={this.changeInput.bind(this)}
                                                            /></div>
                                                        </div>
                                                    </li>
                                                    <li className="col_1">
                                                        <div className="write_input_wrap">
                                                            <div className="write_input_title" style={{opacity:0}}>영/유아</div>
                                                            <div className="write_input box_line">
                                                                <label className="check_box">
                                                                    {this.props.lang == 0 && '영/유아'}
                                                                    {this.props.lang == 1 && 'Child-friendly'}
                                                                    {this.props.lang == 2 && 'đứa trẻ'}    
                                                                    <input type="checkbox"  name="young" onClick={this.clickCheckBox.bind(this)}
                                                                    defaultChecked={this.state.yound == true ? true : false}
                                                                    />
                                                                    <span className="check_icon"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="col_1">
                                                        <div className="write_input_wrap">
                                                            <div className="write_input_title" style={{opacity:0}}>장애인</div>
                                                            <div className="write_input box_line">
                                                                <label className="check_box">
                                                                    {this.props.lang == 0 && '장애인'}
                                                                    {this.props.lang == 1 && 'Disabled'}
                                                                    {this.props.lang == 2 && 'Tàn tật'}        
                                                                    <input type="checkbox" name="disabled" onClick={this.clickCheckBox.bind(this)}
                                                                    defaultChecked={this.state.disabled == true ? true : false}
                                                                    />
                                                                    <span className="check_icon"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="col_1">
                                                        <div className="write_input_wrap">
                                                            <div className="write_input_title" style={{opacity:0}}>반려동물</div>
                                                            <div className="write_input box_line">
                                                                <label className="check_box">
                                                                    {this.props.lang == 0 && '반려동물'}
                                                                    {this.props.lang == 1 && 'Pet-friendly'}
                                                                    {this.props.lang == 2 && 'Vật nuôi'}                           
                                                                    <input type="checkbox" name="animal" onClick={this.clickCheckBox.bind(this)}
                                                                    defaultChecked={this.state.animal == true ? true : false}
                                                                    />
                                                                    <span className="check_icon"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="write_desc mt-20">
                                                <div className="write_textarea_wrap">
                                                    <div className="write_textarea_title">
                                                    {this.props.lang == 0 && '여행 설명'}
                                                    {this.props.lang == 1 && 'Content'}
                                                    {this.props.lang == 2 && 'Mô tả du lịch'}  
                                                    </div>
                                                    <div className="textarea_default">
                                                        <textarea id="" name="content" placeholder={contentText}
                                                        onChange={this.changeInput.bind(this)} defaultValue={this.state.content}
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <TagCreater 
                                                    lang={this.props.lang}
                                                    tags={this.state.tags}
                                                    addTagList={this.addTagList.bind(this)}
                                                    removeTag={this.removeTag.bind(this)}
                                                    setSnackbar={this.props.setSnackbar}
                                                />
                                                
                                            </div>
                                            <div className="write_map mt-10">
                                                <div className="write_input_wrap">
                                                    <div className="write_input box_line icon_input">
                                                        <img className="i_18 i_search_map mr-10"src="/static/img/search_map.png" alt="search_map"/>
                                                        <input id="spot_create_address" type="text" name="addr" placeholder={addrText}
                                                        defaultValue={this.state.addr}
                                                        onKeyUp={this.keyUpAddrSearch.bind(this)}
                                                        />
                                                        <button className="point" type="button" style={{border:"none",background:"none",padding:"10px"}} 
                                                        onClick={this.clickAddrSearch.bind(this)}
                                                        ><i className="fas fa-search" style={{fontSize:"30px",color:"#36d7b7"}}></i></button>
                                                        <input id="spot_create_map_lat" type="hidden" name="lat" value="0"
                                                            onChange={this.changeLatLon.bind(this)}
                                                        />
                                                        <input id="spot_create_map_lon" type="hidden" name="lon" value="0"
                                                            onChange={this.changeLatLon.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                
                                                <div className="google_map_container"></div>
                                            </div>
                                            <div className="write_related mt-40">
                                            
                                            </div>
                                            <input hidden="hidden" />
                                            <div className="submit mt-20">
                                                <div className="submit_inner">
                                                    <div className="cancel_box mr-10 point" onClick={
                                                        ()=>{
                                                            let text = '게시물을 삭제하시겠습니까?';
                                                            if(this.props.lang == 1) text = 'Are you sure you want to delete the post?';
                                                            if(this.props.lang == 2) text = 'Bạn có chắc chắn muốn xóa bài viết không?';
                                                            let result = confirm(text);
                                                            if(!result) return false;
                                                            this.deleteSpot();
                                                        }
                                                    }>
                                                        <a>
                                                            {this.props.lang == 0 && '게시물 삭제'}
                                                            {this.props.lang == 1 && 'Delete a post'}
                                                            {this.props.lang == 2 && 'Xóa một bài đăng'}   
                                                        </a>
                                                    </div>
                                                    <div className="cancel_box mr-10 point"
                                                        onClick={
                                                            ()=> {
                                                                let text = '작업을 취소하시겠습니까?';
                                                                if(this.props.lang == 1) text = 'Are you sure you want to cancel the operation?';
                                                                if(this.props.lang == 2) text = 'Bạn có chắc chắn muốn hủy thao tác không?';
                                                                let result = confirm(text);
                                                                if(!result) return false;   
                                                                this.setState({complete:true});
                                                            }}
                                                        >
                                                        <a>
                                                        {this.props.lang == 0 && '취소'}
                                                        {this.props.lang == 1 && 'Cancel'}
                                                        {this.props.lang == 2 && 'hủy bỏ'}  
                                                        </a>
                                                    </div>
                                                    <button type="button" className="spot_button"
                                                        onClick={this.submitForm.bind(this)}
                                                    >
                                                        <span>
                                                        {this.props.lang == 0 && '수정'}
                                                        {this.props.lang == 1 && 'Update'}
                                                        {this.props.lang == 2 && 'Sửa đổi'}
                                                        </span>
                                                        <img className="i_18 i_submit ml-10"src="/static/img/submit.png" alt="submit"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="related_check_container">
                                <div className="related_check_container_inner">
                                    <div className="related_check_wrap off box_default">

                                    </div>
                                </div>
                            </div>
                        </form>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default SpotUpdate;