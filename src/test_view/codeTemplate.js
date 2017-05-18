import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';

//import {CSS} from '../view/CSS/CSS'
//import {CSS, Toast} from '../CSS/CSS'
//import GFTitleBar from '../Custom/GFTitleBar'
//import {Res_Common} from '../../lib/ResManger'
//import {Res_Common_Size} from '../../lib/ResSize'
//import Emitter,{Events} from '../../model/Emitter'

export default class codeTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    _handlerBack() {
        this.props.navigator.pop();
    }

    _handlerPush(name, component, props) {
        this.props.navigator.push({name, component, props});
    }

    render() {
        return (
            <View style = {{flex: 1, backgroundColor: '#ffffff'}}>
                <GFTitleBar title = {'代码创建模板'} back_handler = {() => this._handlerBack()} />
                <ScrollView bounces = {false}>

                </ScrollView>
            </View>
        )
    }
}