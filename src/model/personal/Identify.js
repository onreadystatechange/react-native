/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

'use strict';

import httpUtils from "../../http/HttpUtils";

/**
 * @author JarkimZhu
 * Created on 2016-06-17.
 * @version 0.1.0
 * @class
 */
class Identify {
    info = {};
    get() {
        return httpUtils.get("/cert/getIdcard").then((json) => {
            if(json.myIdCard) {
                this.info = json.myIdCard;
                return this.info;
            }
        })
    }

    upload(params, pcb) {
        let frontImage = params.frontImage;
        let backImage = params.backImage;
        let frontImageStringArr = frontImage.image.uri.split('.');
        let frontType = frontImageStringArr[frontImageStringArr.length-1];
        let backImageStringArr = backImage.image.uri.split('.');
        let backType = backImageStringArr[backImageStringArr.length-1];
        let toUpload = {};
        if(frontImage && !frontImage.resourceid) {
            toUpload.frontImage = {
                uri:frontImage.image.uri,
                name:'frontImage.'+frontType,
                type:frontImage.type ? frontImage.type : 'image/'+frontType
            }
        }
        if(backImage && !backImage.resourceid) {
            toUpload.backImage = {
                uri:backImage.image.uri,
                name:'backImage.'+backType,
                type:backImage.type ? backImage.type : 'image/'+backType
            }
        }

        if(toUpload.frontImage || toUpload.backImage) {
            return httpUtils.upload("/pic.upload", toUpload, pcb).then((json) => {
                let message = json.message;
                if(!message.frontImage) {
                    message.frontImage = frontImage ? {domain: frontImage.uri, resourceid: frontImage.resourceid} : null;
                }
                if(!message.backImage) {
                    message.backImage = backImage ? {domain: backImage.uri, resourceid: backImage.resourceid} : null;
                }
                return {
                    frontPhoto: message.frontImage ? message.frontImage.resourceid : null,
                    backPhoto: message.backImage ? message.backImage.resourceid : null,
                    frontPhotoDomain: message.frontImage ? message.frontImage.domain : null,
                    backPhotoDomain: message.backImage ? message.backImage.domain : null
                }
            });
        } else {
            return Promise.resolve();
        }
    }

    submit(params) {
        return httpUtils.post("/cert/setIdcard", {
            certId:this.info ? this.info.certId : null,
            frontPhoto:params.frontImage ? params.frontImage.resourceid : null,
            backPhoto:params.backImage ? params.backImage.resourceid : null,
            name:params.realName,
            personNumber:params.identityCard
        }).then((json) => {
            this.info = json.message;
            return this.info;
        });
    }
}
const identify = new Identify();
export default identify;
