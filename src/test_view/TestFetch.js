import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';

export default class TestFetch extends Component {

    _onClick() {
        fetch("http://www.baidu.com")
            .then((response) => {
                return response.text();
            }).then(text => console.log(text))
    }

    render() {
        return <View>
            <TouchableWithoutFeedback onPress={this._onClick.bind(this)}>
                <View>
                    <Text>aaa</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    }
}
