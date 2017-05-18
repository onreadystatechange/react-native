/**
 * Created by yjy on 2016/6/8.
 */

import httpUtils from "../../http/HttpUtils";

class Apply {
    queryMyJobs(state, positionName, type, jobType, pn) {
        return httpUtils.post("/job/queryMyJobs", {
            state: state, //投递状态 必须 默认全部 -1 ， 0 用户申请"join" 1 用户取消"userCancel" 2 公司取消"companyCancel" 3 待用户确认"userWaiting" 4 公司驳回"companyReject" 5 用户拒绝"userReject" 6 待到岗"companyWaiting" 7 工作中"working" 8 完成"closed" 14 已结算"cleared" 9 用户评价"userComment" 10 商家评价"companyComment" 12 已互评"commented"
            positionName : positionName, //职位名称  可选
            type: type,//发布类型 可选
            jobType: jobType, //职位类别 可选
            pn: pn //分页 每页显示数/当前页数 必须
        });
    }

    cancelMyJobs(applyId, positionId) {
        return httpUtils.post("/job/cancel", {
            applyId : applyId, //投递ID 必须
            positionId : positionId  //职位ID 必须
        });
    }

    delMyJobs(applyId) {
        return httpUtils.post("/job/del", {
            applyId : applyId //投递ID 必须
        });
    }

    countMyJobs(state, positionName, type, jobType) {
        return httpUtils.post("/job/countMyJobs", {
            state : state, //投递状态 可选
            positionName : positionName, //可选
            type : type,//发布类型 可选
            jobType: jobType //职位类别 可选
        });
    }

    getJobByApplyId(applyId) {
        return httpUtils.post("/job/getJobByApplyId", {
            applyId : applyId //投递ID 必须
        });
    }

    // addTime;   //投递时间
    // joinMsg;  //申请简语
    // hireDate;  //录用时间
    // companyRejectDate;  //公司驳回时间
    // companyRejectMessage;  //公司驳回原因
    // userRejectDate;   //用户拒绝时间
    // userRejectMessage;  //用户拒绝原因
    // companyCancelDate;  //公司取消时间
    // userCancelDate;   //用户取消时间
    // workDate;   //工作时间
    // closeDate; //工作结束时间
    // clearDate;  //结算时间
    getApplyLogs(applyId) {
        return httpUtils.post("/job/getApplyLogs", {
            applyId : applyId //投递ID 必须
        });
    }

    reject(applyId, message) {
        return httpUtils.post("/job/reject", {
            applyId : applyId, //投递ID 必须
            message : message //拒绝原因
        });
    }

    agree(applyId) {
        return httpUtils.post("/job/agree", {
            applyId : applyId //投递ID 必须
        });
    }

    toCompany(companyId, starLevel, positionId, content) {
        return httpUtils.post("/appraise/toCompany", {
            to : companyId, 			    //商家ID
            starLevel : starLevel, 		    //评分
            appraiseObject : positionId,    //职位
            content : content 			    //内容
        });
    }

    badge4MyJobs(index4apply, index4join, index4completion, index4apprise) {
        return httpUtils.post("/job/badge4MyJobs", {
            index4apply: index4apply,
            index4join: index4join,
            index4completion: index4completion,
            index4apprise: index4apprise
        });
    }
}

const apply = new Apply();
export default apply;