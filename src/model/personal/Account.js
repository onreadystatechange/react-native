/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

'use strict';

import httpUtils from "../../http/HttpUtils";
import DeviceProvider from "../../lib/DeviceProvider";
import Constants from "../../Constants";
import Emitter, {Events} from "../../model/Emitter";

/**
 * @author JarkimZhu
 * Created on 2016-06-02.
 * @version 0.1.0
 * @class
 */
    
class Account {
    static STORAGE_KEY_ACCOUNT = "ACCOUNT";
    static STORAGE_KEY_FIRST = "FIRST";
    info = {};
    isLogin = false;
    isFirst = true;

    constructor() {
        Emitter.on(Events.INVALID_TOKEN, this._resetAccount);
    }

    async getToken() {
        try {
            let info = await storage.load({key: Account.STORAGE_KEY_ACCOUNT});
            if(info) {
                if(info.token) {
                    httpUtils.token = info.token;
                }
                if(info.accountId) {
                    this.isLogin = true;
                }
            } else {
                storage.remove({key: Account.STORAGE_KEY_ACCOUNT});
            }
        } catch (e) {
            try {
                let json = await httpUtils.post("/user/getToken", {
                    deviceId: DeviceProvider.deviceId,
                    version: Constants.VERSION,
                    channel: DeviceProvider.channel,
                    device: DeviceProvider.device,
                    os: DeviceProvider.OS,
                    language: DeviceProvider.language
                });
                storage.save({
                    key: Account.STORAGE_KEY_ACCOUNT,
                    rawData: {
                        token : json.token
                    }
                });
                httpUtils.token = json.token;
            } catch (e) {
                console.error(e);
            }
        }
    }

    async checkFirst() {
        try {
            let rawData = await storage.load({key: Account.STORAGE_KEY_FIRST});
            this.isFirst = rawData.first;
            return rawData.first;
        } catch (e) {
            return true;
        }
    }

    setFirst(first) {
        this.isFirst = first;
        storage.save({
            key: Account.STORAGE_KEY_FIRST,
            rawData: {
                first : first
            }
        });
    }

    querySmsCode(smsType, mobile) {
        return httpUtils.post("/cert/sendMsg", {
            mobile: mobile,
            step: smsType
        });
    }

    signUp(thirdType, signId, authKey, question1, question2, question3, answer1, answer2, answer3) {
        return httpUtils.post("/user/signup", {
            thirdType: thirdType,
            signId: signId,
            authKey: authKey,
            deviceId: DeviceProvider.deviceId,
            version: Constants.VERSION,
            channel: DeviceProvider.channel,
            device: DeviceProvider.device,
            os: DeviceProvider.OS,
            language: DeviceProvider.language,
            question1 : question1,
            question2 : question2,
            question3 : question3,
            answer1 : answer1,
            answer2 : answer2,
            answer3 : answer3
        }).then((json) => {
            storage.save({
                key: Account.STORAGE_KEY_ACCOUNT,
                rawData: json.message
            });
            httpUtils.token = json.message.token;
            this.isLogin = true;
            return json
        }).catch((err) => {
            this.isLogin = false;
            return Promise.reject(err);
        });
    }

    queryAccountInfo() {
        return httpUtils.get("/user/getPerson").then((json) => {
            this.info = json.message || {};
            return this.info;
        }).catch((err) => {
            this.isLogin = false;
            return Promise.reject(err);
        });
    }

    setNickName(nickName) {
        return httpUtils.post("/user/setNickname",{nickName:nickName}).then(() => {
            this.info.nickName = nickName;
            return nickName;
        })
    }

    setFace(face) {
        return this._uploadFace(face).then(function(res) {
            if(res) {
                httpUtils.post("/user/setFace",  {icon : res.resourceid })
            }
            return res;
        });
    }

    _uploadFace(face) {
        if(face && !face.resourceid) {
            let toUpload = {
                face: {
                    uri:face.image.uri,
                    name:"face.jpg",
                    type:face.type
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

    accountLogout() {
        return httpUtils.get("/user/accountLogout").then((json)=>{
            this._resetAccount();
            Emitter.to(Events.ACCOUNT_LOGOUT);
            return json;
        });
    }

    _resetAccount = () => {
        storage.remove({key: Account.STORAGE_KEY_ACCOUNT});
        this.info = {};
        this.isLogin = false;
        this.getToken();
    };

    getSafetyByMobile(mobile) {
        return httpUtils.post("/user/getSafetyByMobile", {
            mobile: mobile
        });
    }

    signup4role() {
        return httpUtils.post("/user/signup4role", {});
    }
}

const account = new Account();
export default account;