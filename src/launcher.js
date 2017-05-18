



import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'
import First from '../src/test/First'
import Second from '../src/test/Second'
import Last from '../src/test/Last'
import Index from '../src/index'
export default class Main extends Component {

    constructor(props){
        super(props)
        this.state={
            selectedTab:'首页',
        }
    }
    exitLogin(){
        const { navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'Index',
                component:Index,
            })
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '首页'}
                        title="首页"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}

                        onPress={() => this.setState({ selectedTab: '首页' })}>
                        <First/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '我的'}
                        title="我的"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}

                        onPress={() => this.setState({ selectedTab: '我的' })}>
                        <Second
                            onPressButton = {()=>this.exitLogin()}
                        />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '消息'}
                        title="消息"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}

                        onPress={() => this.setState({ selectedTab: '消息' })}>
                        <Last />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        color: "#000000",
        fontSize: 13
    },
    selectedTabText: {
        color: "#999999",
        fontSize: 13
    },
    icon: {
        width: 20,
        height: 20
    }
});  
