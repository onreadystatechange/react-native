/**
 * Created by yoyo on 16/4/28.
 */

import React, {Component} from 'react';
import {
	TouchableWithoutFeedback ,
	View ,
	Text ,
	Image ,
	Animated ,
	ScrollView ,
	StyleSheet ,
	ImageEditor,PanResponder
} from 'react-native'
import { mixed } from '../../lib/tools'
import {CSS as $F,CSS as $P} from '../CSS/CSS'
import { Res_system } from '../../lib/ResManger'


const edit_long = $P.width()
const mask_height = ($P.height() - edit_long) / 2;
const edit_border = 1

export  default class GFAvatarEditor_2 extends Component {
	constructor ( props ) {
		super( props );
		this.state = {
			x : 0,
			y : mask_height ,
			w : edit_long ,
			h : edit_long
		}
	}
	componentDidMount(){
		this.setState({defX:this.state.x,defY:this.state.y});
	}
    componentWillMount(){
	    this._panResponder = PanResponder.create( {
		    onMoveShouldSetPanResponder : ( evt , gestureState )=> {
			    return true;
		    } ,
		    onPanResponderGrant : ( evt , gestureState )=> {
			    let x=this.state.x;
			    let y=this.state.y;
			    this.vender={
				    x:x-gestureState.x0,
				    y:y-gestureState.y0
			    }
		    } ,
		    onPanResponderMove : ( evt , gestureState )=> {
			    let x2=gestureState.moveX+this.vender.x;
			    let y2=gestureState.moveY+this.vender.y;
			    this.setState({x:x2,y:y2});
		    } ,
		    onPanResponderRelease : ( evt , gestureState )=> {
			    this.setState({x:this.state.defX,y:this.state.defY})
		    } ,
		    onPanResponderTerminate : ()=> {
			    console.log( 'ter' )
		    }
	    } );
    }
	render () {
		return (<View style={styles.container} {...this._panResponder.panHandlers}>
			<Image source={Res_system.avatar}  style={[styles.image,
		                                            {
		                                            width:this.state.w,
		                                            height:this.state.h,
		                                            top:this.state.y,
		                                            left:this.state.x
		                                            }]}/>
			<View style={[styles.mask]}>

			</View>
			<View style={styles.editor}  >

			</View>
			<View style={[styles.mask]}>

			</View>
		</View>)
	}
}
const styles = StyleSheet.create( {
	container : mixed( {
		backgroundColor : '#000000'
	} ) ,
	image : {
		position : 'absolute'
	} ,
	editor : mixed( {
		height : edit_long ,
	} , $F.border4( 'rgb(145,145,145)' , edit_border , edit_border , 0 , 0 ) ) ,
	mask : {
		height : mask_height ,
		backgroundColor : 'rgba(0,0,0,0.5)'
	}
} )