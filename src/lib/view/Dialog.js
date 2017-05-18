/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, Platform, UIManager, Dimensions, Animated} from 'react-native';

/**
 * @author JarkimZhu
 * Created on 2016-06-21.
 * @version 0.1.0
 * @class
 */
export default class Dialog extends Component {
    static defaultProps = {
        show:false,
        animationType:"fade"
    };

    static propTypes = {
        show: PropTypes.bool,
        animationType:PropTypes.oneOf(['none', 'slide', 'fade']),
        onClose: PropTypes.func,
        onShow: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            show: props.show
        };
        if(props.animationType === "fade" && !props.show) {
            this.state.fadeAnim = new Animated.Value(0);
        } else {
            this.state.fadeAnim = new Animated.Value(1);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.show) {
            setTimeout(() => {
                this._onShow();
            }, 0);
        } else {
            this._onClose();
        }
    }

    _onShow() {
        Animated.timing(          // Uses easing functions
            this.state.fadeAnim,    // The value to drive
            {toValue: 1},           // Configuration
        ).start(()=>{
            this.setState({show: true})
        });
    }

    _onClose() {
        Animated.timing(          // Uses easing functions
            this.state.fadeAnim,    // The value to drive
            {toValue: 0},           // Configuration
        ).start(()=>{
            this.setState({show:false});
        });
    }

    render() {
        if(!this.props.show && !this.state.show) {
            return null;
        }
        const containerStyles = {
            top: Platform.OS === 'android' && Platform.Version >= 19 ? UIManager.RCTModalHostView.Constants.StatusBarHeight : 0,
        };
        return (
            <View style={[styles.MASK, containerStyles]}>
                <Animated.View style={[styles.BODY, {opacity: this.state.fadeAnim}]}>
                    {this.props.children}
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MASK: {
        left: 0,
        top: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        position: 'absolute',
        width: Dimensions.get('window').width + 20,
        height: Dimensions.get('window').height + 20
    },

    BODY: {
        backgroundColor: "transparent"
    }
});
