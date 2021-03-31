import Jimp  from 'jimp';

export async function ImageResize(image, strictSize){
    console.log(image);
    let resizeImage = await Jimp.read(image);
    console.log(resizeImage);
    let {width, height} = resizeImage.bitmap;
    console.log(width, height);

    if (width > strictSize && width > height) {  
        height = strictSize / width * height;
        width = strictSize;
    } else if (height > strictSize && height > width) {  
        width = strictSize / height * width;  
        height = strictSize;
    } else if (width > strictSize && height > strictSize) {  
        if(width > height){  
            height = strictSize / width * height;  
            width = strictSize;  
        }else{  
            width = strictSize / height * width  
            height = strictSize;  
        }
    }

    console.log(width, height);
    console.log(Jimp.MIME_JPEG);
    await resizeImage.resize(width, height);
    let bitData = await resizeImage.getBufferAsync(Jimp.MIME_JPEG);
    let base64Data = await resizeImage.getBase64Async(Jimp.MIME_JPEG);
    return {bitData, base64Data};
}

export function dataURLtoFile(dataurl, fileName){

    return new File([dataurl], fileName, {type:'image/jpeg'});
}