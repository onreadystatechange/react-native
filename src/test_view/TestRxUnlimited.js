/**
 * Created by yoyo on 16/5/28.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	ListView,StyleSheet,NativeModules,Image,Alert,TouchableWithoutFeedback,Animated,Easing,ScrollView
} from 'react-native'
import Rx from 'rx'

//数据生产中心
function getDataFromDbServer( pageSize,pageIndex ) {
	return new Promise( function ( res , reject ) {
		setTimeout( function () {
			let start=pageSize*(pageIndex-1);
			let _arr=[];
			let _count=pageSize;
			while (_count>0){
				start++
				_arr.push(start)
				_count--;
			}
			res( _arr);//返回数据
		},500)
	} )
}
let DbPool=[];
let ds=new ListView.DataSource({rowHasChanged : ( r1 , r2 ) => r1 !== r2 });
export  default class TestRxUnlimited extends  Component{
	constructor(props){
		super(props)
		this.state={
			arr:[],
			dataSource:ds.cloneWithRows([])
		}
	}
	componentWillMount(){
		let self=this;
        let requestCount=50;//向服务器请求条数
		let response2listCount=40;//向listDataSource 发射条数
		Rx.Observable.create(function ( observer ) {
			self._onScroll=function (data) {
				if(!data){
					observer.next(1);
				}else{
					let nativeEvent=data.nativeEvent;
					observer.next(nativeEvent.contentOffset.y);
				}
			}
		}).debounce(100).scan(function ( lastY,thisY ) {
			return thisY-lastY>0?true:false;
		},0).filter(function ( isScrool2down ) {
			return isScrool2down
		}).map(function () {
			return 1;
		}).scan(function ( x,y ) {
			return x+y;
		},0).map(function (count) {
			return  {promise:getDataFromDbServer(requestCount,count) ,count:count}
		}).subscribe(function ( res ) {
			let promise=res.promise;
			let count=res.count;
			promise.done(function ( data ) {
			     DbPool=DbPool.concat(data);
				 let endIndex=count*response2listCount;
				 let listDs=DbPool.slice(0,endIndex);
				 self.setState({dataSource:ds.cloneWithRows(listDs)})
		     })
		})
	}
	componentDidMount(){
		this._onScroll();
	}
	renderRowData(rowData){
		return (<View style={[{height:50,borderStyle:'solid',justifyContent: "center",borderColor:'#000000',borderWidth:1,flexDirection:'row',alignItems:'center'}]}>
			<Text>{rowData.toString()}</Text>
		</View>)
	}
	render(){
		return (
			<View style={{flex:1}}>
				<ListView
					onScroll={this._onScroll}
					automaticallyAdjustContentInsets={false}
					alwaysBounceVertical={false}
					dataSource={this.state.dataSource}
					renderRow={this.renderRowData}>
				</ListView>
			</View>
		)
	}
}