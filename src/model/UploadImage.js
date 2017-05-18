/**
 * Created by yjy on 2016/11/15.
 */

import httpUtils from "../http/HttpUtils";

class UploadImage {
    uploadImageWithName(image, name) {
        if(image && !image.resourceid) {
            let imageStringArr = image.image.uri.split('.');
            let imageType = imageStringArr[imageStringArr.length-1];
            let toUpload = {
                face: {
                    uri: image.image.uri,
                    name: name+'.'+imageType,
                    type: image.type ? image.type : 'image/'+imageType
                }
            };
            return httpUtils.upload("/pic.upload", toUpload).then((json) => {
                let res = json.message.face;
                if(res) {
                    return {uri:res.domain, resourceid:res.resourceid}
                }
            })
        } else {
            return Promise.resolve();
        }
    }
}

const uploadImage = new UploadImage();
export default uploadImage;