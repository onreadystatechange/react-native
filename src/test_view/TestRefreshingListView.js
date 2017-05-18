/**
 * Created by newsyjz on 16/8/31.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView
} from 'react-native';

import {CSS} from '../view/CSS/CSS'
import GFRefreshListView from '../view/Custom/GFRefreshListView'

export default class TestRefreshingListView extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    _onRefresh() {
        setTimeout(() => {
            this.setState({dataSource: this.ds.cloneWithRows([1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])});
            this._GFRefreshListView.refreshEnd()
        }, 1000)
    }

    _renderRow(rowData, sectionID, rowID) {
        return(
            <View style = {{width: CSS.width(), height: 50, backgroundColor: rowData == 1 ? 'black' : '#00b9e7'}}>
                <View style = {{width: CSS.width(), height: 2, backgroundColor: 'pink'}} />
            </View>
        )
    }

    render() {
        return (
            <View style = {{flex: 1, backgroundColor: '#ffffff'}}>
                <GFRefreshListView
                    dataSource = {this.state.dataSource}
                    renderRow = {(rowData, sectionID, rowID) => this._renderRow(rowData, sectionID, rowID)}
                    ref = {ref => this._GFRefreshListView = ref}
                    onRefresh = {() => this._onRefresh()}
                />
            </View>
        )
    }
}