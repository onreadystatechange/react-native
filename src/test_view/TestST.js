/**
 * Created by yoyo on 16/5/11.
 */
'use strict';

import React, {Component} from 'react';
/*核心库*/
import {
	Text ,
	View
} from 'react-native'
/*第三方库*/
import ScrollableTabView from 'react-native-scrollable-tab-view'

/*自定义组件*/
import GFTabBar from '../view/Custom/GFTabBar'
import GFTitleBar from '../view/Custom/GFTitleBar'
/*业务组件*/
import IndexPage from '../index.js/IndexPage'
import JobPage from '../view/job/JobPage'
import MessagePage from '../view/message/Messageage'

export default class TestST extends Component {

	constructor ( props ) {
		super( props );
		this.state = null;
	}

	renderTabBar () {
		return <GFTabBar/>
	}

	render () {
		return (
			<View style={{flex:1}}>
				<GFTitleBar title={'测试'}></GFTitleBar>
				<View style={{flex:1}}>
					<ScrollableTabView tabBarPosition="bottom" renderTabBar={this.renderTabBar}>
						<IndexPage tabLabel="精选"/>
						<JobPage tabLabel="发现"/>
						<MessagePage tabLabel="兼职"/>
					</ScrollableTabView>
				</View>
			</View>

		);
	}
}
