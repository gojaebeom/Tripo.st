export function drawGoogleMap() {
    if(document.getElementById('spot_create_map'))
        document.getElementById('spot_create_map').remove();

    let div_map = document.createElement('div');
    div_map.id = "spot_create_map";
    document.querySelector('.google_map_container').appendChild(div_map);

    let geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 14,
    //   center: latlng
    }

    var address = document.getElementById('spot_create_address').value;

    if(address == ''){
        address = '대한민국';
        mapOptions.zoom = 6;
    }

    let map = new google.maps.Map(document.getElementById('spot_create_map'), mapOptions);
    //map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.querySelector('.google_map_search_container'));
    function codeAddress() {
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            
            document.querySelector('#spot_create_map_lat').value = marker.map.center.lat();
            document.querySelector('#spot_create_map_lon').value = marker.map.center.lng();
            console.log(document.querySelector('#spot_create_map_lat').value);
            console.log(document.querySelector('#spot_create_map_lon').value);
          } else {
            alert('일치하는 주소가 없습니다 😥');
          }
        });
    }
    codeAddress();
}

export function detailGoogleMap(addr) {
  let geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
      zoom: 14,
      //   center: latlng
  }
  var address = addr;
  if (address == '') {
      address = '대한민국';
      mapOptions.zoom = 6;
  }
  let map = new google.maps.Map(document.getElementById('spot_detail_map'), mapOptions);
  //map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.querySelector('.google_map_search_container'));
  function codeAddress() {
      geocoder.geocode({
          'address': address
      }, function (results, status) {
          if (status == 'OK') {
              map.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location
              });
          } else {
              alert('일치하는 주소가 없습니다 😥');
          }
      });
  }
  codeAddress();
}

export async function drawGoogleMapV2(latitude, longitude, data){
    if(document.getElementById('spot_create_map'))
        document.getElementById('spot_create_map').remove();

    let div_map = document.createElement('div');
    div_map.id = "spot_create_map";
    document.querySelector('.google_map_container').appendChild(div_map);

    const uluru = { lat: latitude, lng: longitude };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.querySelector(".google_map_container"), {
        zoom: 9,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });

    // 마커 이미지의 이미지 주소입니다
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    for (var i = 0; i < data.length; i ++) {
        console.log(data[i]);
        //마커 위에 표시할 카드 디자인
        var content = `
        <div class="card_list" style="width:200px;height:200px;margin-bottom:10px;">
            <div class="card card_grid">
                <div style="width:100%;display:flex;justify-content:center;align-items:center;overflow:hidden;">
                    <img class="card_img" 
                    src="${ (data[i].thumbnail)? '/media/'+data[i].thumbnail : '/static/img/tripo_no_photo04.png' }" 
                    alt="" style="width:100%;height:120px;">
                </div>
                
                <div class="card_action_wrap">
                    <div class="card_action">
                        <div class="card_info">
                            <div class="card_view_btn">
                                <div class="round_box_btn">
                                    <a class="point" data-id="${data[i].spot.pk}"
                                        onclick="location.href='/spots/'+this.dataset.id"
                                    >자세히보기</a>
                                </div>
                            </div>
                            <div class="card_info_inner">
                                <div class="card_info_tag">
                                    <div class="traffic">
                                        
                                    </div>
                                </div>
                                <div class="card_info_summary">
                                    <a class="point">
                                        <h4 class="card_info_title" >${data[i].spot.title}</h4>
                                        <p class="card_info_desc"
                                        style="display: inline-block; width:80%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                                        >${(data[i].spot != undefined)?data[i].spot.content:'내용없음' }</p>
                                    </a>
                                </div>
                                <div class="card_info_footer">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div>`;
        
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(data[i].spot.lat, data[i].spot.lon),
            icon: imageSrc,
            map: map,
        });
        const infowindow = new google.maps.InfoWindow({
            content: content,
        });
        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
    }
}