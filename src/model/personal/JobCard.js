/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

'use strict';

import httpUtils from "../../http/HttpUtils";
import Emitter, {Events} from "../../model/Emitter";
import {JobCardCodes} from "../../Constants";
import Glog from '../../lib/Glog'
/**
 * @author JarkimZhu
 * Created on 2016-06-14.
 * @version 0.1.0
 * @class
 */
class JobCard {
    static NameIds = {
        LANGUAGE:1,
        VOICE:2,
        SPECIALTY: 3,
        EXPERIENCE: 4,
        STATURE:5,
        TYPE_SPEED:6,
        GOOD_AT:7,
        OFFICE_SKILL:8,
        NATIONALITY:9,
        VIDEO:10,
        HEALTH:11,
        PHOTO:12
    };

    constructor() {
        Emitter.on("SAVE_SALE", this.saveSale);
        Emitter.on("SAVE_SERVICE", this.saveService);
        Emitter.on("SAVE_WAITER", this.saveWaiter);
        Emitter.on("SAVE_ETI", this.saveEtiquette);
        Emitter.on("SAVE_SELL", this.saveSell);
        Emitter.on("SAVE_SECURITY", this.saveSecurity);
        Emitter.on("SAVE_MODEL", this.saveModel);
    }

    queryJobCardList() {
        Glog("queryJobCardList");
        return httpUtils.get("/positioncard/positioncardList").then(function (json) {
            return json.cards;
        });
    }

    querySaleInfo() {
        return httpUtils.post("/positioncard/getPositioncard4me", {positionTypeId:JobCardCodes.SALE}).then(function (json) {
            let myOptions = json.cards.myOptions;
            if(myOptions && myOptions.length > 0) {
                let healthChecked = {};
                let languageChecked = {};
                let stature = 0;
                for(let i = myOptions.length - 1; i >= 0; i--) {
                    let option = myOptions[i];
                    if(option.positionCardNameId === JobCard.NameIds.HEALTH) {
                        healthChecked[option.value] = true;
                    } else if(option.positionCardNameId === JobCard.NameIds.LANGUAGE) {
                        languageChecked[option.positionCardNameItemId] = true;
                    } else if(option.positionCardNameId === JobCard.NameIds.STATURE) {
                        stature = option.value;
                    }
                }
                return [healthChecked, languageChecked, stature];
            } else {
                return null;
            }
        })
    }

    queryServiceInfo() {
        return httpUtils.post("/positioncard/getPositioncard4me", {positionTypeId:JobCardCodes.SERVICE}).then(function (json) {
            let myOptions = json.cards.myOptions;
            if(myOptions && myOptions.length > 0) {
                let typeSpeedChecked = {};
                let languageChecked = {};
                let goodAtChecked = {};
                let skillChecked = {};
                let audio = null;
                for(let i = myOptions.length - 1; i >= 0; i--) {
                    let option = myOptions[i];
                    if(option.positionCardNameId === JobCard.NameIds.TYPE_SPEED) {
                        typeSpeedChecked[option.positionCardNameItemId] = true;
                    } else if(option.positionCardNameId === JobCard.NameIds.LANGUAGE) {
                        languageChecked[option.positionCardNameItemId] = true;
                    } else if(option.positionCardNameId === JobCard.NameIds.GOOD_AT) {
                        goodAtChecked[option.positionCardNameItemId] = true;
                    } else if(option.positionCardNameId === JobCard.NameIds.OFFICE_SKILL) {
                        skillChecked[option.positionCardNameItemId] = true;
                    } else if(option.positionCardNameId === JobCard.NameIds.VOICE) {
                        audio = {uri: option.domain, resourceid: option.value}
                    }
                }
                return [typeSpeedChecked, languageChecked, goodAtChecked, skillChecked, audio];
            } else {
                return null;
            }
        })
    }

    queryWaiterInfo() {
        return httpUtils.post("/positioncard/getPositioncard4me", {positionTypeId:JobCardCodes.WAITER}).then(function (json) {
            let myOptions = json.cards.myOptions;
            if(myOptions && myOptions.length > 0) {
                let healthChecked = {};
                let languageChecked = {};
                for(let i = myOptions.length - 1; i >= 0; i--) {
                    let option = myOptions[i];
                    if(option.positionCardNameId === JobCard.NameIds.HEALTH) {
                        healthChecked[option.value] = true;
                    } else if(option.positionCardNameId === JobCard.NameIds.LANGUAGE) {
                        languageChecked[option.positionCardNameItemId] = true;
                    }
                }
                return [healthChecked, languageChecked];
            } else {
                return null;
            }
        })
    }

    queryEtiquetteInfo() {
        return httpUtils.post("/positioncard/getPositioncard4me", {positionTypeId:JobCardCodes.ETIQUETTE}).then(function (json) {
            let myOptions = json.cards.myOptions;
            if(myOptions && myOptions.length > 0) {
                let languageChecked = {};
                let stature = 0;
                let photos = [];
                for(let i = myOptions.length - 1; i >= 0; i--) {
                    let option = myOptions[i];
                    if(option.positionCardNameId === JobCard.NameIds.LANGUAGE) {
                        languageChecked[option.positionCardNameItemId] = true;
                    } else if(option.positionCardNameId === JobCard.NameIds.STATURE) {
                        stature = option.value;
                    } else if(option.positionCardNameId === JobCard.NameIds.PHOTO) {
                        photos.push({
                            uri:option.domain,
                            resourceid:option.value
                        })
                    }
                }
                return [languageChecked, stature, photos];
            } else {
                return null;
            }
        })
    }

    querySellInfo() {
        return httpUtils.post("/positioncard/getPositioncard4me", {positionTypeId:JobCardCodes.SELL}).then(function (json) {
            let myOptions = json.cards.myOptions;
            if(myOptions && myOptions.length > 0) {
                let languageChecked = {};
                let goodAtChecked = {};
                for(let i = myOptions.length - 1; i >= 0; i--) {
                    let option = myOptions[i];
                    if(option.positionCardNameId === JobCard.NameIds.LANGUAGE) {
                        languageChecked[option.positionCardNameItemId] = true;
                    } else if(option.positionCardNameId === JobCard.NameIds.GOOD_AT) {
                        goodAtChecked[option.positionCardNameItemId] = true;
                    }
                }
                return [languageChecked, goodAtChecked];
            } else {
                return null;
            }
        })
    }

    querySecurityInfo() {
        return httpUtils.post("/positioncard/getPositioncard4me", {positionTypeId:JobCardCodes.SECURITY}).then(function (json) {
            let myOptions = json.cards.myOptions;
            if(myOptions && myOptions.length > 0) {
                let expChecked = {};
                let languageChecked = {};
                let specialtyChecked = {};
                for(let i = myOptions.length - 1; i >= 0; i--) {
                    let option = myOptions[i];
                    if(option.positionCardNameId === JobCard.NameIds.EXPERIENCE) {
                        expChecked[option.value] = true;
                    } else if(option.positionCardNameId === JobCard.NameIds.LANGUAGE) {
                        languageChecked[option.positionCardNameItemId] = true;
                    } else if(option.positionCardNameId === JobCard.NameIds.SPECIALTY) {
                        specialtyChecked[option.positionCardNameItemId] = true;
                    }
                }
                return [expChecked, languageChecked, specialtyChecked];
            } else {
                return null;
            }
        })
    }

    queryModelInfo() {
        return httpUtils.post("/positioncard/getPositioncard4me", {positionTypeId:JobCardCodes.MODEL}).then(function (json) {
            let myOptions = json.cards.myOptions;
            if(myOptions && myOptions.length > 0) {
                let nationalityChecked = {};
                let languageChecked = {};
                let stature = 0;
                let video = null;
                for(let i = myOptions.length - 1; i >= 0; i--) {
                    let option = myOptions[i];
                    if(option.positionCardNameId === JobCard.NameIds.NATIONALITY) {
                        nationalityChecked[option.positionCardNameItemId] = true;
                    } else if(option.positionCardNameId === JobCard.NameIds.LANGUAGE) {
                        languageChecked[option.positionCardNameItemId] = true;
                    } else if(option.positionCardNameId === JobCard.NameIds.STATURE) {
                        stature = option.value;
                    } else if(option.positionCardNameId === JobCard.NameIds.VIDEO) {
                        video = {
                            uri : option.domain,
                            resourceid:option.value
                        }
                    }
                }
                return [nationalityChecked, languageChecked, stature, video];
            } else {
                return null;
            }
        })
    }

    saveSale = (healthItems, languageItems, stature) => {
        let params = [];
        this._pushParam(params, healthItems, JobCard.NameIds.HEALTH, true);
        this._pushParam(params, languageItems, JobCard.NameIds.LANGUAGE, false);
        if(stature) {
            params.push({
                nameId: JobCard.NameIds.STATURE,
                value: stature.toString()
            });
        }
        return httpUtils.post("/positioncard/savePositioncard4me", {
            positionTypeId : JobCardCodes.SALE,
            configs : params
        }).then(function () {
            Emitter.to(Events.SAVE_CARD_SUCCESS, JobCardCodes.SALE);
        });
    };

    saveService = (typeSpeedItems, languageItems, goodAtItems, skillItems, audio) => {
        return this._uploadAudio(audio).then((res) => {
            let params = [];
            this._pushParam(params, typeSpeedItems, JobCard.NameIds.TYPE_SPEED, false);
            this._pushParam(params, languageItems, JobCard.NameIds.LANGUAGE, false);
            this._pushParam(params, goodAtItems, JobCard.NameIds.GOOD_AT, false);
            this._pushParam(params, skillItems, JobCard.NameIds.OFFICE_SKILL, false);

            if(res) {
                params.push({
                    nameId: JobCard.NameIds.VOICE,
                    value: res.resourceid
                })
            }

            return httpUtils.post("/positioncard/savePositioncard4me", {
                positionTypeId : JobCardCodes.SERVICE,
                configs : params
            })
        }).then(function () {
            Emitter.to(Events.SAVE_CARD_SUCCESS, JobCardCodes.SERVICE);
        });
    };

    saveWaiter = (healthItems, languageItems) => {
        let params = [];
        this._pushParam(params, healthItems, JobCard.NameIds.HEALTH, true);
        this._pushParam(params, languageItems, JobCard.NameIds.LANGUAGE, false);
        return httpUtils.post("/positioncard/savePositioncard4me", {
            positionTypeId : JobCardCodes.WAITER,
            configs : params
        }).then(function () {
            Emitter.to(Events.SAVE_CARD_SUCCESS, JobCardCodes.WAITER);
        });
    };

    _uploadPicture(photos) {
        if(photos && photos.length > 0) {
            let toUpload = {};
            let size = 0;
            for(let i = 0; i < photos.length; i++) {
                let photo = photos[i];
                if(!photo.resourceid) {
                    size++;
                    let name = "photo_" + i;
                    toUpload[name] = {
                        uri:photo.image.uri,
                        name:name + ".jpg",
                        type:photo.type
                    }
                }
            }
            if(size > 0) {
                return httpUtils.upload("/pic.upload", toUpload).then((json) => {
                    let message = json.message;
                    for(let name in message) {
                        if(message.hasOwnProperty(name) && name.startsWith("photo_")) {
                            let res = message[name];
                            let index = parseInt(name.substring(6));
                            photos[index] = {uri:res.domain, resourceid:res.resourceid}
                        }
                    }
                    return photos;
                })
            } else {
                return Promise.resolve(photos);
            }
        } else {
            return Promise.resolve(photos);
        }
    }

    _uploadVideo(video) {
        if(video) {
            let toUpload;
            if(!video.resourceid) {
                toUpload = {
                    video : {
                        uri:video.uri,
                        name:"video.mp4",
                        type:"video/mp4"
                    }
                };
                return httpUtils.upload("/video.upload", toUpload).then((json) => {
                    let res = json.message.video;
                    if(res) {
                        return {uri:res.domain, resourceid:res.resourceid}
                    }
                })
            } else {
                return Promise.resolve(video);
            }
        }
        return Promise.resolve();
    }

    _uploadAudio(audio) {
        if(audio) {
            let toUpload;
            if(!audio.resourceid) {
                toUpload = {
                    audio : {
                        uri:audio.uri,
                        name:"audio.amr",
                        type:"audio/amr"
                    }
                };
                return httpUtils.upload("/voice.upload", toUpload).then((json) => {
                    let res = json.message.audio;
                    if(res) {
                        return {uri:res.domain, resourceid:res.resourceid}
                    }
                })
            } else {
                return Promise.resolve(audio);
            }
        }
        return Promise.resolve();
    }

    saveEtiquette = (languageItems, stature, photos) => {
        return this._uploadPicture(photos).then((res) => {
            let params = [];
            this._pushParam(params, languageItems, JobCard.NameIds.LANGUAGE, false);
            params.push({
                nameId: JobCard.NameIds.STATURE,
                value: stature.toString()
            });
            if(res) {
                for(let i = 0; i < res.length; i++) {
                    let r = res[i];
                    params.push({
                        nameId: JobCard.NameIds.PHOTO,
                        value: r.resourceid
                    })
                }
            }
            httpUtils.post("/positioncard/savePositioncard4me", {
                positionTypeId : JobCardCodes.ETIQUETTE,
                configs : params
            })
        }).then(function () {
            Emitter.to(Events.SAVE_CARD_SUCCESS, JobCardCodes.ETIQUETTE);
        });
    };

    saveSell = (languageItems, goodAtItems) => {
        let params = [];
        this._pushParam(params, languageItems, JobCard.NameIds.LANGUAGE, false);
        this._pushParam(params, goodAtItems, JobCard.NameIds.GOOD_AT, false);
        return httpUtils.post("/positioncard/savePositioncard4me", {
            positionTypeId : JobCardCodes.SELL,
            configs : params
        }).then(function () {
            Emitter.to(Events.SAVE_CARD_SUCCESS, JobCardCodes.SELL);
        });
    };

    saveSecurity = (expItems, languageItems, specialtyItems) => {
        let params = [];
        this._pushParam(params, expItems, JobCard.NameIds.EXPERIENCE, true);
        this._pushParam(params, languageItems, JobCard.NameIds.LANGUAGE, false);
        this._pushParam(params, specialtyItems, JobCard.NameIds.SPECIALTY, false);
        return httpUtils.post("/positioncard/savePositioncard4me", {
            positionTypeId : JobCardCodes.SECURITY,
            configs : params
        }).then(function () {
            Emitter.to(Events.SAVE_CARD_SUCCESS, JobCardCodes.SECURITY);
        });
    };

    saveModel = (nationalityItems, languageItems, stature, video) => {
        //todo 屏蔽视频功能
        let params = [];
        this._pushParam(params, nationalityItems, JobCard.NameIds.NATIONALITY, false);
        this._pushParam(params, languageItems, JobCard.NameIds.LANGUAGE, false);
        params.push({
            nameId: JobCard.NameIds.STATURE,
            value: stature.toString()
        });
        params.push({
            nameId: JobCard.NameIds.VIDEO,
            value: "no-video-dev"
        })
        httpUtils.post("/positioncard/savePositioncard4me", {
            positionTypeId : JobCardCodes.MODEL,
            configs : params
        }).then(x=>{
            Emitter.to(Events.SAVE_CARD_SUCCESS, JobCardCodes.MODEL);
        })
        return false;
        /*
        return this._uploadVideo(video).then((res) => {
            let params = [];
            this._pushParam(params, nationalityItems, JobCard.NameIds.NATIONALITY, false);
            this._pushParam(params, languageItems, JobCard.NameIds.LANGUAGE, false);
            params.push({
                nameId: JobCard.NameIds.STATURE,
                value: stature.toString()
            });
            if(res) {
                params.push({
                    nameId: JobCard.NameIds.VIDEO,
                    value: res.resourceid
                })
            }
            httpUtils.post("/positioncard/savePositioncard4me", {
                positionTypeId : JobCardCodes.MODEL,
                configs : params
            });
        }).then(function () {
            Emitter.to(Events.SAVE_CARD_SUCCESS, JobCardCodes.MODEL);
        });*/
    };

    _pushParam(params, items, nameId, single) {
        for(let i = 0; i < items.length; i++) {
            let item = items[i];
            if(item.checked) {
                if(single) {
                    params.push({
                        nameId: nameId,
                        value: item.value
                    })
                } else {
                    params.push({
                        nameId: nameId,
                        nameItemId: item.value
                    })
                }
            }
        }
    }

    setItemsWithChecked(items, checked) {
        for(let i = items.length - 1; i >= 0; i--) {
            let item = items[i];
            item.checked = false;
            for(let value in checked) {
                if(checked.hasOwnProperty(value)) {
                    if(item.value == value) {
                        item.checked = checked[value];
                        break;
                    }
                }
            }
        }
    }

    hasAnyChecked(items) {
        for(let i = items.length - 1; i >= 0; i--) {
            let item = items[i];
            if(item.checked) {
                return true;
            }
        }
        return false;
    }
}

function LANGUAGE_ITEMS() {
    return [
        {value: 2, label: "普通话", checked: true},
        {value: 1, label: "英文"},
        {value: 3, label: "当地语言", checked: true}
    ];
}

const jobCard = new JobCard();
export default jobCard;
export {LANGUAGE_ITEMS};