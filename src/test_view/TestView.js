/**
 * Created by yoyo on 16/4/23.
 */
/**
 * Created by yoyo on 16/4/7.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, {Component} from 'react';
import {
	TouchableWithoutFeedback ,
	View ,
	Text ,
	Image ,
	Animated ,
	PanResponder,
    ScrollView,StyleSheet
} from 'react-native'
const {drag, pinch, GestureView} = require('react-native-gestures')

function square(x){
	return x*x;
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: 'red',
		flex: 1
	}
})

const movable = {
	backgroundColor: 'green',
	width: 100,
	height: 100,
	position: 'absolute'
}

export  default class TestView extends Component {
	constructor(props){
		super(props);
		this.state= {
			res : 'loading' ,
			r : 0
		}
	}
	componentWillMount(){
		var self=this;
	}
	render(){
		return (
			<View name='Draggable Container' style={styles.container}>
				<GestureView
					style={movable}
					gestures={[drag, pinch]}
					toStyle={(layout) => {
            return {
              top: layout.y,
              left: layout.x,
              width: layout.width,
              height: layout.height,
              transform: [{rotate: `${layout.rotate}deg`}]
            }
          }}
					onError={console.error.bind(console)}>
					<Text>HEHE</Text>
					<Text>HEHE</Text>
				</GestureView>
			</View>
		)
	}
}
