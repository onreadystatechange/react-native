/**
 * Created by yjy on 2016/6/15.
 */

import httpUtils from "../../http/HttpUtils";

class Message {
    topPanel(GF_index, HCNP_index, JOIN_index , message_index) {
        return httpUtils.post("/inform/topPanel", {
            GF_index : GF_index,   //GrowFace 通知，客户端存储的索引
            HCNP_index : HCNP_index, //新兼职通知
            JOIN_index :  JOIN_index,  //上岗提醒
            message_index : message_index  //客服消息
        });
    }
    queryMessage(type, index) {
        return httpUtils.post("/inform/queryLast", {
            type : type,				 //类型 	 1 GrowFace 通知
            index : index               //新兼职通知  2 app索引
        });
    }
    getMessage(msgId) {
        return httpUtils.post("/inform/get", {
            msgId : msgId				 //消息ID
        });
    }
    query4history(index) {
        return httpUtils.post("/inform/query4history", {
            index : index         
        });
    }
    query4positionapply_join(index) {
        return httpUtils.post("/inform/query4positionapply_join", {
            index : index
        });
    }
}

const message = new Message();
export default message;