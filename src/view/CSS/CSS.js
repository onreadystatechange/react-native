/**
 * Created by yoyo on 16/5/5.
 */
import React, {Dimensions, UIManager, PixelRatio, Platform, StatusBar} from 'react-native'
import {mixed} from '../../lib/tools'
import Toast from '@remobile/react-native-toast'
import Glog from '../../lib/Glog'
var PlatformInfo = {
    sizeObj: Dimensions.get('window'),
    scale: null,
    pixels: 2,
    getSize: ()=>Dimensions.get('window'),
    width: ()=> {
        return PlatformInfo.sizeObj.width;
    },
    height: ()=> {
        return PlatformInfo.sizeObj.height - (Platform.OS === "android" ? StatusBar.currentHeight : 0);
    },
    pixel: (px)=> {
        if (!PlatformInfo.pixels) {
            PlatformInfo.pixels = PixelRatio.get();
        }
        return px / PlatformInfo.pixels;
    }
};
var CSS = {
    flexDirection: ((direction = "row") =>({flexDirection: direction})),
    flexNum: ((num = 1)=>({flex: num})),
    border: ((color = 'blue', width = 1)=>({borderStyle: "solid", borderWidth: width, borderColor: color})),
    solidBorder: ((color = 'blue', width = 1)=>({borderWidth: width, borderColor: color})),
    hAlign: ((direction = "start")=>({
        justifyContent: direction
    })),
    vAlign: ((direction = "start")=>({alignItems: direction})), 
    radius: ((rad)=>({borderRadius: rad})),
    itemCenter: (()=>(mixed(CSS.flexNum(), CSS.hAlign("center"), CSS.vAlign("center")))),
    fd: ((direction = "row")=>({flexDirection: direction})),
    border4: ((color = 'blue', top, bottom, left, right)=>({
        borderStyle: "solid",
        borderColor: color,
        borderTopWidth: top, borderBottomWidth: bottom, borderLeftWidth: left, borderRightWidth: right,
    })),
    borderWidth:((width) => ({borderWidth:width})),
    textInput:()=>{underlineColorAndroid:'none'},
    textInputVAlign:(direction="top")=>{textAlignVertical:direction},
    pixel: PlatformInfo.pixel,
    width: PlatformInfo.width,
    height: PlatformInfo.height,
    setBarWhite:()=>{
      if(Platform.OS=='ios'){
          StatusBar.setBarStyle('light-content')
      }
    },
    setBarBlack:()=>{
        if(Platform.OS=='ios'){
            StatusBar.setBarStyle('default')
        }
    },
    ios_run:(fn)=>{
        if(Platform.OS=="ios"){
            fn()
        }
    },
    ROW: {
        CONTAINER: {
            LEFT: {
                flexDirection: "row",
                alignItems: "center"
            },
            RIGHT: {
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end"
            },
            AROUND: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent:"space-around"
            },
            BETWEEN: {
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent:"space-between"
            },
            CENTER: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }
        },

        CONTENT: {
            LEFT: {
                marginLeft: PlatformInfo.pixel(25)
            },
            RIGHT: {
                marginRight: PlatformInfo.pixel(25)
            }
        }
    },
    COLUMN: {
        CONTAINER: {
            CENTER: {
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            },
            BETWEEN: {
                flexDirection: "column",
                justifyContent: "space-between"
            }
        }
    },

    PAGE_WHITE: {
        height:PlatformInfo.height(),
        backgroundColor:"white"
    },

    PAGE_BLACK: {
        height:PlatformInfo.height(),
        backgroundColor:"black"
    },

    FLEX_WHITE: {
        flex:1,
        backgroundColor:"white"
    },
    
    FULL_SCENE: {
        width: PlatformInfo.width(),
        height: PlatformInfo.height()
    },

    LINK: {
        color: "#00b9e7"
    },

    ICON: {
        LOCATION: {
            width: PlatformInfo.pixel(27),
            height: PlatformInfo.pixel(32)
        }
    },

    ARROW_LEFT: {
        width: PlatformInfo.pixel(16),
        height: PlatformInfo.pixel(32)
    },
    ARROW_RIGHT: {
        width:10,
        height:19.5
    },
    BLUECOLOR: '#00b9e7',
    BACKCOLOR: '#efeff4',
    LINECOLOR: '#e2dede',
    REDCOLOR: '#fe5d5d'
};
var FlexCss = CSS;
var $F = CSS;
var $P = PlatformInfo;
export {CSS, PlatformInfo, FlexCss, $F, $P,Toast,Glog}