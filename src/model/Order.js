/**
 * Created by yjy on 16/8/5.
 */

import httpUtils from "../http/HttpUtils";

class Order {
    createOrder4crowd(productId, addressId, remark) {
        return httpUtils.post("/order/createOrder4crowd", {
            productIds: [productId],        //产品ID(数组)
            address: addressId,             //地址
            remark: remark                  //备注
        });
    }

    createOrder4offline(productIds, remark_tname, remark_mobile) {
        return httpUtils.post("/order/createOrder4offline", {
            productIds: productIds,         //['产品ID||5','产品ID||4'] 数组
            remark_tname: remark_tname,     //'备注姓名'
            remark_mobile: remark_mobile    //'备注手机'
        });
    }

    query(type) {
        return httpUtils.post("/order/query", {
            type: type
            // * 0 普通订单，一个订单由 1-n 个产品构成，而且交易对象一致（所有商品属于同一商家）。
            // * 1 批次订单，一个订单 由n   个产品构成，属于一个交易合并批次，交易对象不一致（所有商品不属于同一商家）。
            // * 2 项目筹款
            // * 3 项目结算
            // * 4 操作订单，充值、提现
        });
    }

    count(type) {
        return httpUtils.post("/order/count", {
            type: type
        });
    }
    
    detail(orderId) {
        return httpUtils.post("/order/detail", {
            orderId: orderId
        });
    }

    cancel(orderId) {
        return httpUtils.post("/order/cancel", {
            orderId: orderId
        });
    }

    del(orderId) {
        return httpUtils.post("/order/del", {
            orderId: orderId
        });
    }
}

const order = new Order();
export default order;