/**
 * Created by yjy on 16/7/29.
 */

import httpUtils from "../http/HttpUtils";

class Event {
    eventQuery(type, clazz, isFree, timeHorizon, orderType, ownerType, recruit, distance, gpsX, gpsY, keyword, city, pn) {
        return httpUtils.post("/activity/query", {
            type: type,                         //1  众筹活动 ， 2 线下活动
            clazz1: clazz,                      //分类1 直接传分类ID
            isFree: isFree,                     //-1 全部   ，1 免费
            timeHorizon: timeHorizon,           //时间属性：	1 周末  2 周内 3 假日
            orderType: orderType,	            //排序方式  1 综合排序 ， 2 最新发布 ，3 人气排行 ， 4 即将结束 ， 5 离我最近
            ownerType: ownerType,               //发布者类型 ，1 系统（官方） ， 2 用户（个人）  ， 4 （组织）
            recruit: recruit,                   //范围：		1 校内 ，2 校外
            distance: distance,                 //距离：		1:1km ，3:3km
            gpsX: gpsX,	                        //经度
            gpsY: gpsY,	                        //维度
            keyword: keyword,
            city: city,
            pn: '20/'+pn
        });
    }

    eventCount(type) {
        return httpUtils.post("/activity/count", {
            type: type			//1 众筹活动 ， 2 线上活动
        });
    }

    get(activityId) {
        return httpUtils.post("/activity/get", {
            activityId: activityId
        });
    }

    productQuery(activityId) {
        return httpUtils.post("/activityProduct/query", {
            activityId: activityId
        });
    }

    productCount(activityId) {
        return httpUtils.post("/activityProduct/count", {
            activityId: activityId
        });
    }

    queryClazz() {
        return httpUtils.post("/activity/queryClazz", {});
    }

    complainActivity(activityId, content) {
        return httpUtils.post("/complain/complainActivity", {
            activityId: activityId,
            content: content
        });
    }

    query4myjoin(type, joinState) {
        return httpUtils.post("/activity/query4myjoin", {
            type: type,   //1  众筹活动 ， 2 线下活动 3 线上活动
            joinState: joinState    // 加入状态：0 待支付 1 待参加（已支付）2 已取消 10 进行中  20 已结束
        });
    }

    count4myjoin(type, joinState) {
        return httpUtils.post("/activity/count4myjoin", {
            type: type,   //1  众筹活动 ， 2 线下活动 3 线上活动
            joinState: joinState    // 加入状态：0 待支付 1 待参加（已支付）2 已取消 10 进行中  20 已结束
        });
    }

    getPersonInfo(accountId) {
        return httpUtils.post("/personPublic/getPersonInfo", {
            accountId: accountId
        });
    }

    queryFace(activityId) {
        return httpUtils.post("/activityApply/queryFace", {
            activityId: activityId
        });
    }

    countFace(activityId) {
        return httpUtils.post("/activityApply/countFace", {
            activityId: activityId
        });
    }

    countOrder4me(activityId) {
        return httpUtils.post("/order/countOrder4me", {
            bizId: activityId
        });
    }

    optByJoin(joinId, activityId, optType) {
        return httpUtils.post("/activity/optByJoin", {
            joinId: joinId,
            activityId: activityId,
            optType : optType  //1 :投票
        });
    }
}

const event = new Event();
export default event;