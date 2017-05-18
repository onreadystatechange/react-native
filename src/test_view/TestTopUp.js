/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

"use strict"

import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import sdkManager from "../lib/sdk/SdkManager";
import {SdkType, ProtocolResult} from "../lib/sdk/SdkConfigs";
import Toast from "@remobile/react-native-toast";


/**
 * Created on 16/8/8.
 *
 * @author JarkimZhu
 * @class
 * @extends React.Component
 */
export default class TestTopUp extends Component {
    _testTimes = 0;

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    _topUp = () => {
        return sdkManager.topUp(SdkType.ALIPAY, {
            product: {
                productName: "众筹"
            },
            amount: 0.01
        }).then(function (ret) {
            if (ret.result === ProtocolResult.SUCCESS) {
                Toast.showLongCenter("充值成功");
                let financeRecord = ret["financeRecord"];
                console.log(financeRecord.financeId);
                console.log(financeRecord.amount);
                console.log(financeRecord.status);
            } else if(ret.result === ProtocolResult.TOP_UP_CANCEL) {
                Toast.showLongCenter("充值取消");
            }
            return Promise.resolve(ret);
        }).catch(function(err) {
            Toast.showLongCenter("充值异常: " + err);
            return Promise.reject(err);
        });
    };

    _pay = () => {
        this._getOrderMock().then((orderId) => {// 先调用创建订单接口
            return this._innerPay(orderId) // 然后调用支付接口
        }).then(function () {
            Toast.showLongCenter("支付成功");
        })
    };

    _innerPay(orderId) {
        return this._payOrderMock(orderId).then((message)=> {
            if(message.result === ProtocolResult.SUCCESS) {
                return Promise.resolve();//完成订单
            }
        }).catch((err) => {
            if(err === 55002){ // 余额不足
                return this._topUp().then((ret) => {// 调用充值接口
                    if(ret.result === ProtocolResult.SUCCESS) {
                        return this._innerPay(orderId); // 充值成功后再次调用支付接口,直到递归成功
                    }
                });
            }
        });
    }

    render() {
        return (
            <View style={{marginTop: 20}}>
                <TouchableOpacity onPress={this._topUp}>
                    <Text>充值</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._pay}>
                    <Text>订单支付</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _getOrderMock() {
        return Promise.resolve("ORDER-123456");
    }

    _payOrderMock(orderId) {
        if(this._testTimes < 2) {
            Toast.showShortCenter("余额还是不足!");
            this._testTimes++;
            return Promise.reject(55002);
        } else {
            return Promise.resolve({
                result:ProtocolResult.SUCCESS
            })
        }

    }
}