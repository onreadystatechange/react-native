/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

'use strict';

import httpUtils from "../../http/HttpUtils";
import Emitter, {Events} from "../../model/Emitter";

/**
 * @author JarkimZhu
 * Created on 2016-06-07.
 * @version 0.1.0
 * @class
 */
class Resume {
    info = {};

    constructor() {
        Emitter.on(Events.ACCOUNT_LOGOUT, ()=>this.info = {});
    }

    getResumeInfo() {
        return httpUtils.post("/resume/getResume", {}).then((json) => {
            if(json.message) {
                this.info = json.message;
            }
            return json.message;
        });
    }

    uploadAvatar(avatar) {
        let toUpload = {};
        if(avatar && !avatar.resourceid && avatar.image) {
            toUpload.avatar = {
                uri:avatar.image.uri,
                name:"avatar.jpg",
                type:avatar.type
            }
        }
        if(toUpload.avatar) {
            return httpUtils.upload("/pic.upload", toUpload).then((json) => {
                let message = json.message;
                return {
                    resourceid: message.avatar.resourceid,
                    domain: message.avatar.domain
                }
            });
        } else {
            return Promise.resolve();
        }
    }

    saveResume(resume) {
        if(resume.avatar && resume.avatar.resourceid) {
            resume.photo = resume.avatar.resourceid;
            resume.photoPath = resume.avatar.uri;
        }
        return httpUtils.post("/resume/saveResume", resume).then(() => {
            this.info = resume;
        })
    }
}
const resume = new Resume();
export default resume;