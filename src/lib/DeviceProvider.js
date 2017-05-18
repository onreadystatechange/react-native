/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

'use strict';

import {Platform} from "react-native";
import DeviceInfo from "react-native-device-info";
import Glog from './Glog'
/**
 * @author JarkimZhu
 * Created on 2016-06-02.
 * @version 0.1.0
 * @class
 */
const DeviceProvider = {
    get deviceId() {
        let id;
        try {
            if (DeviceInfo && DeviceInfo.getUniqueID) {
                id = DeviceInfo.getUniqueID()
            }
        } catch (e) {
            Glog(e)
        }
        return id;
    },

    get OS() {
        return Platform.OS;
    },

    get device() {
        return DeviceInfo.getDeviceName();
    },

    get language() {
        return "zh_CN";
    },

    get channel() {
        if(__DEV__) {
            return "dev";
        } else {
            return "self";
        }
    }
};

export default DeviceProvider;