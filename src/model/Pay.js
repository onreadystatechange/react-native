/**
 * Created by yjy on 16/8/15.
 */

import httpUtils from "../http/HttpUtils";

class Pay {
    payFund(orderId, payPassword, payType, vCode, relevanceId) {
        return httpUtils.post("/pay/payFund", {
            orderId: orderId,               //订单ID
            payPassword: payPassword,       //支付密码
            vCode : vCode,                  //支付宝支付验证码
            payType : payType,              //1余额支付 2 支付宝支付 余额支付需要传payPassword，支付宝支付需要传vCode
            relevanceId : relevanceId
        });
    }

    pay4company(orderId, payPassword, payType, vCode, relevanceId) {
        return httpUtils.post4Company('/pro/pay/pay', {
            orderId: orderId,
            payPassword: payPassword,
            payType: payType,
            vCode: vCode,
            relevanceId: relevanceId
        })
    }
}

const pay = new Pay();
export default pay;