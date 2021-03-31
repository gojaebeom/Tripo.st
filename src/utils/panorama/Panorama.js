export function createPonorama(panoImg , panoBgm){
    console.log(panoImg);
    console.log(panoBgm);
    let viewer = new PhotoSphereViewer.Viewer({
        container: document.querySelector('#pano_viewer'),
        panorama: panoImg
    });

    viewer.on('fullscreen-updated', function (e) {
        console.log('이벤트 호출!!');
        if (e.target.prop.fullscreen) {
            let bgm = document.createElement('audio');
            bgm.className = 'panorama_bgm';
            bgm.src = panoBgm;
            bgm.style.display = 'none';
            document.body.appendChild(bgm);
            document.querySelector('.panorama_bgm').play();
        } else {
            document.querySelector('.panorama_bgm').remove();
        }
    });
}