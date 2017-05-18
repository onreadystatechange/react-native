/**
 * Created by yoyo on 16/4/23.
 */
import {Pos_URL} from '../http/url'
import HttpUtils from '../http/HttpUtils'
import GFLocation from './GFLocation'
import Glog from '../lib/Glog'
var Positions = {
    queryPositions: function (arg,isSendGeo) {
        if(isSendGeo){
            return new Promise((resolve,reject)=>{
                GFLocation.getLocation().then(geo=>{
                    Glog('geo',geo)
                    let config=arg||{pn:"1/1"}
                    config.gpsX=geo.longitude
                    config.gpsY=geo.latitude
                    config.city=geo.cityCode
                    resolve(HttpUtils.post(Pos_URL.queryPositions,arg||{pn:'1/1'}))
                }).catch(err=>{
                    Glog('no_find_geo')
                    resolve(HttpUtils.post(Pos_URL.queryPositions,arg||{pn:'1/1'}))
                })
            })
        }
        Glog('not_send_geo')
        return HttpUtils.post(Pos_URL.queryPositions,arg||{pn:'1/1'})
    },
    queryPositionsDetail:function (positionId=null) {
        if(positionId){
            return HttpUtils.post(Pos_URL.queryPositionsDetail,{"positionId":positionId});
        } else {
            return Promise.reject("posiontionId is null");
        }
    },
    hasCard:function ( positionType=null ) {
        return HttpUtils.post("/positioncard/hasCard",{positionTypeId:positionType})
    },
    jobJoin:function ( posId ,joinMsg,sendCard) {
        return HttpUtils.post("/job/join",{positionId:posId,joinMsg:joinMsg,sendCard:sendCard?1:0})
    },
    //投诉
    report:function ( posId ,text) {
        return HttpUtils.post("/complain/complainPosition",{positionId:posId,content:text})
    },
    queryPositionByCompanyID:function (cid,pn) {
        return HttpUtils.post("/job/queryPositionsByCompany",{ companyId :cid, pn : pn||'20/1' })
    },
    queryPositionComments:function (posId,pn) {
        let arg = {
            appraiseObject : posId ,
            pn : '10/'+pn
        }
        //获取职位评论
        return HttpUtils.post( '/appraise/query' , arg )
    },
    countMyJobs:function(state) {
        return HttpUtils.post("/job/countMyJobs", {state:state}).then(function (json) {
            return json.count;
        })
    }
};

export default Positions;
//export {Positions};