/**
 * Created by yoyo on 16/5/10.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    ListView,StyleSheet
} from 'react-native'
import {CSS} from '../view/CSS/CSS'
let ds;
export  default class  TestWheel extends Component{
	constructor(props){
		super(props)
		ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
		let limitAge=16// LAW_Limit
		let min=1980
		function makeList(num){
			let arr=[]
			let i=min;
			while (num--){
				arr.push(i++)
			}
			return arr;
		}
		this.state={
			data:makeList(2016-limitAge-min),
			currentYear:1983
		}
		this.state.dataSource=ds.cloneWithRows(this.state.data)
	}
	componentWillMount(){
		let self=this;
		let data=self.state.data;
		this.listViewAda={
			dataSource:this.state.dataSource,
			renderRow:(rowData)=>{
				return (
					<View style={[styles.itemContainer,CSS.itemCenter()]}>
						<Text style={[styles.item]}>{rowData.toString()}</Text>
					</View>
				)
			},onChangeVisibleRows:(visibleRows,changedRows)=>{
				let vrows=visibleRows.s1;
				let props=[]
				for (name in vrows){
					props.push(name)
				}
				let currentYear=this.state.data[(props[2]*1)];
				this.setState({currentYear:currentYear,mustC:(Math.random()*100).toString()+Date.now().toString()})
			}
		}
	}
	render(){

		return (
			<View style={[{flex:1},CSS.itemCenter()]}>
				<View style={[{height:containerHeight,width:containerWidth,borderStyle:'dotted',borderColor:'#000000',borderWidth:5}]}>
					<ListView snapToInterval={itemH}  ms={this.state.ms} style={styles.list} {...this.listViewAda}/>
					<View   pointerEvents="none"  style={[styles.touchLayer,CSS.itemCenter()]}>
						<View style={[{width:containerWidth,height:itemH},CSS.border(),{backgroundColor:'red'}]}>
							<View style={[{flex:1},CSS.itemCenter()]}>
									<Text style={{fontSize:20}}>
										{this.state.currentYear}
									</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		)
	}
}
const itemH=30;
const containerHeight=30*5;
const containerWidth=150;
const styles=StyleSheet.create({
	list:{
	   backgroundColor:'red'
	},
	item:{
		fontSize:16,
		height:20,
		color:'rgb(167,167,167)',
		textAlign:'center'
	},
	itemContainer:{
		height:30
	},
	touchLayer:{
		top:0,left:0,position:'absolute',height:containerHeight,width:containerWidth
	}
})