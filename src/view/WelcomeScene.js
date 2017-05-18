// /*
//  * Copyright (c) 2014-2016. JarkimZhu
//  * This software can not be used privately without permission
//  */
//
// 'use strict';
//
// import React, {Component, PropTypes} from 'react';
// import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// import ScrollableTabView from 'react-native-scrollable-tab-view';
// import HomeScene from './home/HomeScene'
// import {Res_Welcome} from "../lib/ResManger";
// import {CSS} from "./CSS/CSS";
//
// import account from "../model/personal/Account";
//
//
// /**
//  * @author JarkimZhu
//  * Created on 2016-06-24.
//  * @version 0.1.0
//  * @class
//  */
// export default class WelcomeScene extends Component {
//
//     _colors;
//
//     constructor(props) {
//         super(props);
//         this._colors = [
//             {backgroundColor:"#fdefca", dot:"rgb(219,192,150)", source:Res_Welcome.INDEX_1},
//             {backgroundColor:"#40b696", dot:"rgb(115,206,180)", source:Res_Welcome.INDEX_2},
//             {backgroundColor:"#3b3750", dot:"rgb(88,80,114)", source:Res_Welcome.INDEX_3},
//             {backgroundColor:"#5cbdc6", dot:"#5cbdc6", source:Res_Welcome.INDEX_4}
//         ]
//     }
//
//     _enterHomeScene = () => {
//         account.setFirst(false);
//         this.props.navigator.replace({name:"HomeScene", component:HomeScene})
//     };
//
//     _renderTabBar = (props) => {
//         let activeTab = props.activeTab;
//         return (
//             <View style={[CSS.ROW.CONTAINER.AROUND, styles.TAB_CONTAINER]}>
//                 <View style={CSS.ROW.CONTAINER.AROUND}>
//                     {
//                         this._colors.map((t, i)=>{
//                             if(activeTab === this._colors.length - 1) {
//                                 return;
//                             }
//                             let item = this._colors[activeTab];
//                             let stys = [[styles.TAB_ITEM, {backgroundColor:item.dot}]];
//                             if(activeTab === i) {
//                                 stys.push(styles.TAB_ITEM_LONG);
//                             }
//                             return <View key={"item_" + i} style={stys} />
//                         })
//                     }
//                 </View>
//             </View>
//         )
//     };
//
//     render() {
//         return (
//             <ScrollableTabView tabBarPosition="bottom" renderTabBar={this._renderTabBar}>
//                 {
//                     this._colors.map((item, i)=>{
//                         return <WelcomePage key={"welcome_" + i}
//                             backgroundColor={item.backgroundColor}
//                             source={item.source}
//                             hasButton={i === this._colors.length - 1}
//                             onBtnPress={this._enterHomeScene}
//                         />
//                     })
//                 }
//             </ScrollableTabView>
//         )
//     }
// }
//
// class WelcomePage extends Component {
//     constructor(props) {
//         super(props)
//     }
//
//     render() {
//         return (
//             <View style={{position:"absolute", bottom:0, backgroundColor:this.props.backgroundColor}}>
//                 <Image source={this.props.source} style={[CSS.FULL_SCENE]} resizeMode="cover">
//                     {
//                         this.props.hasButton ? <View style={[CSS.ROW.CONTAINER.AROUND, styles.TAB_CONTAINER]}>
//                             <TouchableOpacity style={styles.BUTTON} onPress={this.props.onBtnPress}>
//                                 <Text style={styles.BUTTON_TEXT}>马上体验</Text>
//                             </TouchableOpacity>
//                         </View> : null
//                     }
//                 </Image>
//             </View>
//         )
//     }
// }
//
// const styles = StyleSheet.create({
//     TAB_CONTAINER: {
//         position:"absolute",
//         bottom:20,
//         left:0,
//         right:0
//     },
//     TAB_ITEM_LONG: {
//         width:14
//     },
//     TAB_ITEM: {
//         borderRadius:5.5,
//         width:5.5,
//         height:5.5,
//         margin:3
//     },
//
//
//     BUTTON: {
//         borderWidth:1,
//         borderRadius:5,
//         padding:3,
//         borderColor:"white",
//         bottom:5
//     },
//     BUTTON_TEXT: {
//         fontSize:15,
//         color:"white"
//     }
//
// });
/**
 * Created by yjy on 16/9/5.
 */

import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import HomeScene from './home/HomeScene'
import {Res_Welcome} from "../lib/ResManger";
import {CSS} from "./CSS/CSS";
import account from "../model/personal/Account";

export default class WelcomeScene extends Component {
    constructor(props) {
        super(props);
        this.imageArr = [
            {source: Res_Welcome.INDEX_1},
            {source: Res_Welcome.INDEX_2},
            {source: Res_Welcome.INDEX_3},
            {source: Res_Welcome.INDEX_4}
        ];
    }

    _enterHomeScene = () => {
        account.setFirst(false);
        this.props.navigator.replace({name:"HomeScene", component:HomeScene})
    };

    _getImage() {
        return this.imageArr.map((item, i) => {
            return(
                <View key = {i}>
                    <Image style = {{width: CSS.width(), height: CSS.height()}} source = {item.source} />
                    {i == this.imageArr.length-1 ?
                        <View style = {{position: 'absolute', left: 0, bottom: CSS.pixel(138), width: CSS.width(), height: CSS.pixel(72), alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity onPress = {this._enterHomeScene}>
                                <View style = {{width: CSS.pixel(236), height: CSS.pixel(70), borderColor: '#ffffff', borderWidth: CSS.pixel(1), borderRadius: CSS.pixel(50), alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style = {{fontSize: CSS.pixel(32), color: '#ffffff', backgroundColor: 'rgba(0,0,0,0)'}}>开始体验</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        : null
                    }
                </View>
            )
        })
    }

    render() {
        return (
            <ScrollView
                horizontal = {true}
                pagingEnabled = {true}
                showsHorizontalScrollIndicator = {false}
                bounces = {false}
            >
                {this._getImage()}
            </ScrollView>
        )
    }
}