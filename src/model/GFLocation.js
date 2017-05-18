/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

import {AMapLocation} from 'react-native-amap'

const MY_LOCATION = "MY-LOCATION";

/**
 * @author JarkimZhu
 * Created on 2016-06-25.
 * @version 0.1.0
 * @class
 */
export default class GFLocation {
    static AMapLocationMode = {
        HIGH_ACCURACY : -1,
        MIDDLE_ACCURACY : 100,
        LOW_ACCURACY : 3000
    };

    static _currentTask = null;

    static getLocationOnce(accuracy) {
        if(!accuracy) {
            accuracy = GFLocation.AMapLocationMode.MIDDLE_ACCURACY
        }
        if(!GFLocation._currentTask) {
            GFLocation._currentTask = AMapLocation.locationOnce(accuracy).then(function (location) {
                if(location && location.cityCode) {
                    storage.save({
                        key: MY_LOCATION,
                        rawData: location
                    });
                    GFLocation._currentTask = null;
                    return location;
                } else {
                    GFLocation._currentTask = null;
                    throw new Error("Location has no city");
                }
            }).catch(function (err) {
                GFLocation._currentTask = null;
                return Promise.reject(err);
            });
        }
        return GFLocation._currentTask;
    }
    static getLocation() {
        return new Promise((resolve, reject)=> {
            storage.load({key:MY_LOCATION}).then(function (storedLocation) {
                resolve(storedLocation);
            }).catch(function () {
                GFLocation.getLocationOnce().then(function (location) {
                    resolve(location);
                }).catch(function (err) {
                    reject(err);
                });
            });
        })
    }
    static calculateLineDistance(start, end) {
        return AMapLocation.calculateLineDistance(start, end).then(function (meter) {
            return (meter / 1000).toFixed(2);
        });
    }
    
    static getFlatternDistance(lat1,lng1,lat2,lng2){
        const EARTH_RADIUS = 6378.137;    //单位km
        const PI = Math.PI;
        let getRad = (d) => {
            return d*PI/180.0;
        };
        let radLat1 = getRad(lat1);
        let radLat2 = getRad(lat2);

        let a = radLat1 - radLat2;
        let b = getRad(lng1) - getRad(lng2);

        let s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s*EARTH_RADIUS;
        s = Math.round(s*10000)/10000.0;

        return s;
    }
}