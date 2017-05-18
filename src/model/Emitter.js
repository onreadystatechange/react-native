/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

'use strict';

import {DeviceEventEmitter} from "react-native";

/**
 * @author JarkimZhu
 * Created on 2016-06-04.
 * @version 0.1.0
 * @class
 */
export default class Emitter {
    static to(eventName, ...data) {
        DeviceEventEmitter.emit(eventName, ...data);
    }

    static on(eventName, handler) {
        let subscription = DeviceEventEmitter.addListener(eventName, handler);
        handler.__subscription__ = subscription;
        return subscription;
    }

    static off(eventName, handler) {
        if (handler.__subscription__) {
            handler.__subscription__.remove();
        } else {
            throw new Error(eventName + " has none subscription");
        }
    }
}

const Events = {
    APP_CHANGE:"appChange",
    JOBCARD_LOADED:"JOBCARD_LOADED",
    JOBCARD_LOADING:"JOBCARD_LOADING",
    CURRENTCITY:"CURRENTCITY",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    OPEN_SIDE_MENU_FINISHED: "drawerHasOpened",//OPEN_SIDE_MENU_FINISHED
    CLOSE_SIDE_MENU_FINISHED: "drawerHasClosed",//CLOSE_SIDE_MENU_FINISHED
    INVALID_TOKEN: "INVALID_TOKEN",
    ACCOUNT_LOGOUT: "ACCOUNT_LOGOUT",
    ACCOUNT_FORBIDDEN: "ACCOUNT_FORBIDDEN",
    OPENSLIDE:"drawerOpen",//打开侧边栏openSlide
    CLOSESLIDE:'drawerClose',//关闭侧边栏closeSlide
    TOGGLESLIDE: 'drawerToggle',//TOGGLESLIDE
    SERVER_UNKNOWN_ERROR: "SERVER_UNKNOWN_ERROR",
    NETWORK_ERROR: "NETWORK_ERROR",
    SAVE_RESUME: "SAVE_RESUME",
    SAVE_CARDS: "SAVE_CARDS",
    SAVE_CARD_SUCCESS: "SAVE_CARD_SUCCESS",
    SUBMIT_IDENTIFY:"SUBMIT_IDENTIFY",
    RECEIVE_PAYLOAD_MSG: "receive_payload_msg",
    HARDWARE_BACK_PRESS: "hardwareBackPress",
    HIDE_TAB_BAR:"HIDE_TAB_BAR",//隐藏tab栏
    SHOW_TAB_BAR:"SHOW_TAB_BAR",//显示tab栏
    LOCATION_CHANGE:"_city_geo_changed",//地理位置信息变更,
    APPLYJOBS:"APPLYJOBS",//申请兼职
    APPLYJOB:"APPLYJOBS",
    FILE_UPLOAD_PROGRESS:"FILE_UPLOAD_PROGRESS",
    GFTABINDEXCHANGED:"GFTABINDEXCHANGED",//tabIndex发生改变
    CHANGEGFTABINDEX:"CHANGEGFTABINDEX"//变更tabIndex
};

export {Events};