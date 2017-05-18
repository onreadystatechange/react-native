/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

'use strict';

/**
 * @author JarkimZhu
 * Created on 2016-06-03.
 * @version 0.1.0
 */
const Envs = {
    ENV_DEV: "dev",
    ENV_PROD: "prod",
    ENV_CHEN_HUI:"ChenHui"
};

const SERVERS = {};

SERVERS[Envs.ENV_DEV] = {
    domain: "http://192.168.0.109:8081/app-domain",
    companyDomain: "http://192.168.0.109:8085/company-domain",
    file: "http://192.168.0.109:83/resource-domain",
    share: "http://192.168.0.109:8085/company-domain"
};

SERVERS[Envs.ENV_PROD] = {
    domain: "http://101.201.77.170:8081/app-domain",
    companyDomain: "http://101.201.77.170:8085/company-domain",
    file: "http://101.201.116.24:83/resource-domain",
    share: "http://share.growface.cn/share"
};

SERVERS[Envs.ENV_CHEN_HUI] = {
    domain: "http://192.168.0.114:8081/app-domain",
    companyDomain: "http://192.168.0.114:8085/company-domain",
    file: "http://192.168.0.122:83/resource-domain",
    share: "http://192.168.0.106:8082/company-domain"
};

const Constants = {
    ENV: Envs.ENV_DEV,
    VERSION: "2.1.3",
    SMS_TYPE : {
        //1 发送登录验证码 2 密码找回/修改密码 4 旧手机验证码 5 新手机验证码}
        register : 1 ,//注册
        login : 1 ,//登录
        forgetPwd : 3 ,//忘记密码
        modifyPwd : 2,//修改密码
        findPwd: 2,//找回密码
        oldMobile: 4,//旧手机验证码
        newMobile: 5//新手机验证码
    },
    OS_ANDROID: "android",
    OS_IOS: "ios",
    NOOP : function(){},
    GO_BACK: function () {
        this.props.navigator.pop();
    }
};

const ProtocolResult = {
    SUCCESS : 0,
    INVALID_PARAM : 1,
    INVALID_SESSION : 100,
    SERVER_ERROR : 500,
    INVALID_TOKEN : 1000,
    LOGIN_FAILED : 1001,
    ACCOUNT_FORBIDDEN: 1004,

    TOP_UP_FAILED : 52001,
    TOP_UP_CANCEL : 52002,
    TOP_UP_NOT_RECEIVED : 52003,
    TOP_UP_PENDING : 52004
};

const SERVER = SERVERS[Constants.ENV];

const JobCardCodes = {
    SALE : 3,
    SERVICE: 18,
    WAITER:2,
    ETIQUETTE:16,
    SELL:5,
    SECURITY:17,
    MODEL:4
};

const ShareInfo = {
    1 : {
        desc:"兼职无忧，money经验快到碗里来~",
        url:SERVER.share + "/JobInfo.html?id="
    },
    2 : {
        desc:"我在GrowFace玩众筹，就差你了！！！",
        url:SERVER.share + "/CrowdfundingDetail.html?id="
    },
    3 : {
        desc:"没玩过这个，大学白上了...",
        url:SERVER.share + "/OffLineEvent.html?id="
    }
};

export default Constants;
export {Envs, SERVER, ProtocolResult, JobCardCodes, ShareInfo};