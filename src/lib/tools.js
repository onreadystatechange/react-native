/**
 * Created by yoyo on 16/4/6.
 */

import React from 'react'
import {Platform} from 'react-native'
import CheckUtils from './CheckUtils'
function getImageResource(image) {
    if (!image) {
        return null;
    } else if (image.uri) {
        return image
    } else {
        return image.image;
    }
}

function hideMobile(mobile) {
    if(mobile && typeof mobile === "string" && mobile.length >= 11) {
        let length = mobile.length;
        return mobile.substring(0, length - 8) + "****" + mobile.substring(length - 4);
    }
    return mobile;
}
function hideEmail(email){
    if(email && typeof email === "string") {
        let [left, right] = email.split('@');
        let length = left.length;
        left = left.substring(0, length-4);
        let e = left+'****@'+right;
        return e;
    }
    return email
}
function accountHide (account) {
    if(CheckUtils.checkMobile(account)){
        return hideMobile(account)
    }
    if(CheckUtils.checkEmail((account))){
        return hideEmail(account)
    }
    return account
}
var mixed = function () {
    let args = arguments;
    var res = {};
    Array.prototype.forEach.call(args, (x) => {
        for (let name in x) {
            res[name] = x[name];
        }
    });
    return res;
};

function betweenArray(arr, fn) {
    var list = [];
    var last = arr.length - 1;
    arr.forEach((x, i)=> {
        list.push(x);
        if (i != last) {
            list.push(fn(x, i))
        }
    });
    return list;
}

function CountTimer(time_s) {
    return function (updater) {
        let waiter_s = time_s;//等待时间
        let _now = Date.now()
        let _target = _now + waiter_s * 1000;
        let uper = updater || (()=> {
            })
        return new Promise((res, reject)=> {
            requestAnimationFrame(function () {
                let _lastNow = Date.now();
                if (_target >= _lastNow) {
                    let second = (waiter_s - Math.floor((_lastNow - _now) / 1000));
                    uper(second, second / waiter_s);
                    requestAnimationFrame(arguments.callee)
                } else {
                    res(true)//倒计时结束
                }
            })
        })
    }

}
//数组去重复
function ArrayUnique(arr) {
    var n = {}, r = []; //n为hash表，r为临时数组
    for (var i = 0; i < arr.length; i++) //遍历当前数组
    {
        if (!n[arr[i]]) //如果hash表中没有当前项
        {
            n[arr[i]] = true; //存入hash表
            r.push(arr[i]); //把当前数组的当前项push到临时数组里面
        }
    }
    return r;
}
function ParseJSON(str){
    return JSON.parse(str);
}
export {mixed, getImageResource, betweenArray, CountTimer, ArrayUnique,ParseJSON, hideMobile,accountHide, hideEmail}
