/**
 * Created by chuangxiangkeji on 2016/6/12.
 */
import React,{Component} from 'react'

import {TouchableOpacity,Text,Alert,View} from 'react-native'


class  ToggleButton extends  Component{
    constructor(props){
        super(props)
        this.state={
            on:false
        }
    }
    _onPress(){
        let _status=!this.state.on
        if(this.props.onStatusChange){
            this.props.onStatusChange(_status);
        }
        this.setState({on:_status})
    }
    getState(){
        return this.state.on;
    }
    render(){
        return (<TouchableOpacity onPress={this._onPress.bind(this)}>
            <Text>{this.state.on?"已打开":"已关闭"}</Text>
        </TouchableOpacity>)
    }
}
export  default class TestToggle extends  Component{
    onStatusChange(isOn){
        //Alert.alert(isOn?"yes":"no");
    }
    _getCurrentStatus(){
        Alert.alert(this.refs._toggleButton.getState()?"打开":"关闭")
    }
    render(){
        return (<View style={{flex:1}}>
            <ToggleButton ref="_toggleButton"  onStatusChange={this.onStatusChange.bind(this)}/>
            <Text onPress={this._getCurrentStatus.bind(this)}>
                获取当前状态
            </Text>
        </View>)
    }
}