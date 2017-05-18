/**
 * Created by yoyo on 2017/5/5.
 */
'use strict';
import React,{Component} from 'react'
import  {

	StyleSheet,
	Text,
	Image,
	TextInput,
	View,
	Navigator
} from 'react-native';


import FirstPageComponent from './index';

export default class Root extends React.Component {
	render() {
		var defaultName = 'FirstPageComponent';
		var defaultComponent = FirstPageComponent;
		return (
			<Navigator
				//指定了默认的页面，也就是启动app之后会看到的第一屏，需要两个参数，name跟component
				initialRoute={{ name: defaultName, component: defaultComponent }}
				configureScene={(route) => {
            //跳转的动画
				return Navigator.SceneConfigs.FloatFromBottom;
          }}
				renderScene={(route, navigator) => {
            let Component = route.component;
            if(route.component){
                return <Component  navigator={navigator} />
            }
          }} />
		);
	}
}