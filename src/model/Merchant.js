/**
 * Created by yjy on 2016/11/16.
 */

import httpUtils from "../http/HttpUtils";

class Merchant {
    saveInfo({ fullName, name, industry, nature, totalNumber, logo, workEnv1, workEnv2, workEnv3, workEnv4, description, contact, telphone, reserveTelphone, email, qq, weixin, url, province, city, county, address, lonlat }) {
        return httpUtils.post4Company("/pro/info/word/save", {
            fullName,       //商家全称
            name,           //商家简称
            industry,       //所属行业
            nature,         //商家类型
            totalNumber,    //商家规模
            logo,           //logo
            workEnv1,
            workEnv2, 
            workEnv3,
            workEnv4,       //工作环境（4张）
            description,    //商家简介
            contact,        //联系人
            telphone,       //联系电话
            reserveTelphone,//紧急联系电话
            email,          //电子邮箱
            qq,             //QQ
            weixin,         //微信
            url,            //公司主页
            province,       //省
            city,           //市
            county,         //区
            address,        //详细地址
            lonlat         //经纬度
        });
    }


    updatePositionInfo({ jobType, state,salary,id,salaryUnit, title, clearingCate, type, needNumber, dateStart, dateEnd, startTime, endTime, contact, telphone, workTime, needMinAge, needMaxAge, needSex, needHealthCard, needEducation, needHeight, info, province, city, county, local, lonlat }) {
        return httpUtils.post4Company("/pro/position/updatePositionInfo", {
            jobType,        //兼职类型
            salary,         //工资
            salaryUnit,     //工资单位
            title,          //职位名称
            clearingCate,   //结算类型
            type,           //职位类型
            needNumber,     //招聘人数
            dateStart,
            dateEnd,        //有效时间
            startTime,
            endTime,        //工作时间
            contact,        //联系人
            telphone,       //联系电话
            workTime,       //工作时段
            needMinAge,
            needMaxAge,
            needSex,
            needHealthCard,
            needEducation,
            needHeight,     //工作要求
            info,           //工作描述
            province,       //省
            city,           //市
            county,         //区
            local,        //详细地址
            lonlat,        //经纬度
            state,
            id
        })
    }

    getInfo() {
        return httpUtils.get4Company('/pro/info/getInfo');
    }

    positionRelease({ jobType, salary, salaryUnit, title, clearingCate, type, needNumber, dateStart, dateEnd, startTime, endTime, contact, telphone, workTime, needMinAge, needMaxAge, needSex, needHealthCard, needEducation, needHeight, info, province, city, county, local, lonlat }) {
        return httpUtils.post4Company('/pro/position/word/save', {
            jobType,        //兼职类型
            salary,         //工资
            salaryUnit,     //工资单位
            title,          //职位名称
            clearingCate,   //结算类型
            type,           //职位类型
            needNumber,     //招聘人数
            dateStart,
            dateEnd,        //有效时间
            startTime,
            endTime,        //工作时间
            contact,        //联系人
            telphone,       //联系电话
            workTime,       //工作时段
            needMinAge,
            needMaxAge,
            needSex,
            needHealthCard,
            needEducation,
            needHeight,     //工作要求
            info,           //工作描述
            province,       //省
            city,           //市
            county,         //区
            local,        //详细地址
            lonlat         //经纬度
        })
    }

    getPosition(data) {
        return httpUtils.post4Company('pro/position/get', { data });
    }

    positionManageQuery(state,pn) {
        return httpUtils.post4Company('/pro/position/query', { state ,pn});
    }

    positionManageRefresh(data) {
        return httpUtils.post4Company('/pro/position/refresh', { data });
    }

    getPosition(data) {
        return httpUtils.post4Company('/pro/position/get', { data });
    }

    positionManageStop(data) {
        return httpUtils.post4Company('/pro/position/stop', { data });
    }

    applyManageQuery(state,pn) {
        return httpUtils.post4Company('/pro/companyApply/query', { state,pn });
    }

    applyReject(applyId, positionId, msg) {
        return httpUtils.post4Company('/pro/companyApply/upstate', {
            apply: applyId,         //报名id
            msg,                    //拒绝信息
            position: positionId,   //职位id
            state: 4
        })
    }

    applyPass(applyId, accountId, positionId) {
        return httpUtils.post4Company('/pro/companyApply/step2join', {
            apply: applyId,                     //报名id
            personAccount: accountId,           //报名个人id
            position: positionId,               //职位id
            state: 6
        })
    }

    applyCancel(applyId, positionId, msg) {
        return httpUtils.post4Company('/pro/companyApply/upstate', {
            apply: applyId,         //报名id
            msg,                    //拒绝信息
            position: positionId,   //职位id
            state: 2
        })
    }

    applySucceed(applyId, positionId) {
        return httpUtils.post4Company('/pro/companyApply/upstate', {
            apply: applyId,         //报名id
            position: positionId,   //职位id
            state: 7
        })
    }

    applyFinish(applyId, positionId) {
        return httpUtils.post4Company('/pro/companyApply/upstate', {
            apply: applyId,         //报名id
            position: positionId,   //职位id
            state: 8
        })
    }

    evaluate({ content, positionId, starLevel, personId }) {
        return httpUtils.post4Company('/pro/appraise/word/toPerson', {
            content,                //评价内容
            positionId,             //职位id
            starLevel,              //评价星际
            to: personId            //个人id
        })
    }

    getResume(resumeId) {
        return httpUtils.post4Company('/pro/resume/getResume4resumeid', {
            resumeId
        })
    }

    clearingByCash(applyId, positionId) {
        return httpUtils.post4Company('/pro/companyApply/upstate', {
            apply: applyId,
            position: positionId,
            state: 14
        })
    }

    certification({ licensePic, companyRegistrationId, IDCardId, IDCardPic }) {
        return httpUtils.post4Company('/pro/certification/save', {
            business_license: licensePic,
            idCompany: companyRegistrationId,
            idLagal: IDCardId,
            idcard: IDCardPic
        })
    }

    getPayInfo(applyId, orderId) {
        return httpUtils.post4Company('/pro/payment/getBalanceAndApplyData', {
            applyId,
            orderId
        })
    }

    createOrder(applyId, personId, salary) {
        return httpUtils.post4Company('/pro/order/createOrder', {
            business: [{
                businessId: applyId,
                inAccount: personId,
                salary
            }]
        })
    }

    creatOrderAndPay(applyId, personId, salary, payPassword) {
        return httpUtils.post4Company('/pro/pay/createOrderAndPay', {
            business: [{
                businessId: applyId,
                inAccount: personId,
                salary
            }],
            payPassword
        })
    }

    getCertificationInfo() {
        return httpUtils.post4Company('/pro/certification/get4me', {})
    }

    getRecord(recordType, pn) {
        return httpUtils.post4Company('/pro/payment/record/page', {
            endDate: "",
            pn,
            recordOper: recordType,
            searchDates: "-1",
            startDate: "",
            accountType: '2'
        })
    }

    getPositionCount(state) {
        return httpUtils.post4Company('/pro/position/count', {
            state // 0 待审核
        })
    }

    getCompanyApplyCount() {
        return httpUtils.post4Company('/pro/companyApply/count', {})
    }

    //
    getCountPositions(){
        return httpUtils.post4Company('/pro/position/countPositions', {
            state:'-1'
        })
    }

    getCompanyCount(){
        return httpUtils.post4Company('/pro/companyApply/count', {
            state: '99'
        })
    }

    //职位删除接口
    getDelete(id){
        return httpUtils.post4Company('/pro/position/delete', {
            mainId:id
        })
    }

    //修改已停招到招聘中
    changeState(id){
        return httpUtils.post4Company('/pro/position/updateState', {
            mainId:id
        })
    }
}

const merchant = new Merchant();
export default merchant;