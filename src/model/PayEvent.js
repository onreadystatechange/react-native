/**
 * Created by yjy on 16/8/10.
 */

import sdkManager from "../lib/sdk/SdkManager"
import {SdkType, ProtocolResult} from "../lib/sdk/SdkConfigs"
import Emitter from '../model/Emitter'
import pay from './Pay'

class PayEvent {
    aliPay(orderId, vCode, money, productName) {
        Emitter.to('pay_disabled');
        return sdkManager.topUp(SdkType.ALIPAY, {
            product: {
                productName: productName
            },
            amount: money
        }).then(ret => {
            Emitter.to('pay_able');
            if(ret.result === ProtocolResult.SUCCESS) {
                Emitter.to('ali_pay_completed');
                let financeId = ret.financeRecord.financeId;
                return pay.payFund(orderId, '', 2, vCode, financeId).then(() => {
                    Emitter.to('wallet_pay_completed');
                    return Promise.resolve();
                })
            } else if(ret.result === ProtocolResult.TOP_UP_CANCEL) {
                return Promise.reject('已取消充值');//充值取消
            }
        }).catch(err => {
            return Promise.reject(err);
        })
    }

    aliPay4company(orderId, vCode, money, productName) {
        Emitter.to('pay_disabled');
        return sdkManager.topUp(SdkType.ALIPAY, {
            product: {
                productName: productName
            },
            amount: money
        }).then(ret => {
            Emitter.to('pay_able');
            if(ret.result === ProtocolResult.SUCCESS) {
                Emitter.to('ali_pay_completed');
                let financeId = ret.financeRecord.financeId;
                return pay.pay4company(orderId, '', 2, vCode, financeId).then(() => {
                    Emitter.to('wallet_pay_completed');
                    return Promise.resolve();
                })
            } else if(ret.result === ProtocolResult.TOP_UP_CANCEL) {
                return Promise.reject('已取消充值');//充值取消
            }
        }).catch(err => {
            return Promise.reject(err);
        })
    }

    async prepay(amount) {
        let product = { productName: 'GrowFace充值' };
        try {
            let ret = await sdkManager.topUp(SdkType.ALIPAY, { product, amount });
            return ret.result;
        } catch(e) {
            return e;
        }
    }
}

const payEvent = new PayEvent();
export default payEvent;