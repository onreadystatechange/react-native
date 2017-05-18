import React, {Component} from 'react';
import {Navigator, View, Text, BackAndroid, Alert} from 'react-native';
import HomeScene from './view/home/HomeScene';
import WelcomeScene from "./view/WelcomeScene";
import {Events} from './model/Emitter';
import account from "./model/personal/Account";
import Toast from "@remobile/react-native-toast";
import DateUtils from './lib/DateUtils'

export  default class App extends Component {
    _navigator;
    _initialRoute;
    _backAndroidTimer = false;

    constructor(props) {
        super(props);
        this._initialRoute = account.isFirst ? {name: "WelcomeScene", component: WelcomeScene} : {
            name: "HomeScene",
            component: HomeScene
        };
    }

    ignorePop = ["QuestionCompleted", "BindAPay", "BillDetail"];//不统一处理物理返回按键名单
    componentDidMount() {
        BackAndroid.addEventListener(Events.HARDWARE_BACK_PRESS, () => {
            let navigator = this._navigator;
            if (navigator && navigator.getCurrentRoutes().length > 1) {
                let _name = navigator.navigationContext._currentRoute.name;
                if (this.ignorePop.indexOf(_name) == -1) {
                    navigator.pop();
                }
                return true;
            } else {
                // if (!this._backAndroidTimer) {
                //     Toast.showShortCenter("再按一次退出应用");
                //     this._backAndroidTimer = true;
                //     setTimeout(() => {
                //         this._backAndroidTimer = false;
                //     }, 2000);
                //     return true;
                // } else {
                //     return false;
                // }
                // let time = new Date();
                // time.setTime(this.lastBackPressed);
                // let timeFormat1 = DateUtils.format(time, 'MM-dd HH:mm:ss');
                // time.setTime(Date.now());
                // let timeFormat2 = DateUtils.format(time, 'MM-dd HH:mm:ss');
                // console.log(timeFormat1, timeFormat2);
                // console.log(this.lastBackPressed + 2000 >= Date.now());

                if(this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                    //最近2秒内按过back键，可以退出应用。
                    return false;
                } else {
                    this.lastBackPressed = Date.now();
                    Toast.showShortCenter('再按一次退出应用');
                    return true;
                }
            }
        });
    }

    configureScene(route) {
        if (route.name === "GFPhotoView") {
            return Navigator.SceneConfigs.VerticalUpSwipeJump;
        } else {
            return Navigator.SceneConfigs.PushFromRight;
        }
    }

    renderScene(route, navigator) {
        let Component = route.component;
        return <Component navigator={navigator} {...route.props} />;
    }

    render() {
        return (
            <Navigator
                ref = {ref => {
                    if(ref) {
                        let oldPush = ref.push;
                        ref.push = newRoute => {
                            let name = newRoute.name;
                            if(ref.navigationContext.currentRoute.name !== name) {
                                oldPush(newRoute);
                            }
                        };
                        this._navigator = ref;
                    }
                }}
                initialRoute = {this._initialRoute}
                configureScene = {this.configureScene}
                renderScene = {this.renderScene}
            />
        );
    }
}
