/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

"use strict"

import sdkManager from "../../lib/sdk/SdkManager";
import {SdkType, ShareTo} from "../../lib/sdk/SdkConfigs";
import Constants, {ShareInfo} from "../../Constants";
import {Platform} from 'react-native'


/**
 * Created on 16/8/25.
 *
 * @author JarkimZhu
 * @class
 */
class Share {

    share(type, uiShareTo, title, thumbUrl, id) {
        let sdkType, shareTo, thumbResourceName;
        if(uiShareTo === "wechat") {
            sdkType = SdkType.WECHAT;
            shareTo = ShareTo.WeChat.WXSceneSession;
        } else if(uiShareTo === "pengyou") {
            sdkType = SdkType.WECHAT;
            shareTo = ShareTo.WeChat.WXSceneTimeline;
        } else if(uiShareTo === "qq") {
            sdkType = SdkType.TENCENT;
            shareTo = ShareTo.QQ.QQ;
        } else if(uiShareTo === "qzone") {
            sdkType = SdkType.TENCENT;
            shareTo = ShareTo.QQ.QZone;
        } else if(uiShareTo === "weibo") {
            sdkType = SdkType.WEIBO;
            shareTo = ShareTo.Weibo.Weibo;
        }


        if(!thumbUrl) {
            if(Platform.OS === Constants.OS_ANDROID) {
                thumbResourceName = "ic_launcher";
            } else {
                thumbResourceName = "AppIcon";
            }
        }
        let info = ShareInfo[type];
        return sdkManager.share(sdkType, {
            type: type,
            url:info.url + id,
            title:title,
            description:info.desc,
            thumbUrl:thumbUrl,
            thumbResourceName:thumbResourceName,
            shareTo:shareTo
        })
    }
}

const share = new Share();
export default share;