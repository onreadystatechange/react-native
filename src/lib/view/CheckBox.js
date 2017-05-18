/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {CSS} from "../../view/CSS/CSS";


const StyleSheetPropType = require('StyleSheetPropType');
const ViewStylePropTypes = require('ViewStylePropTypes');
const stylePropType = StyleSheetPropType(ViewStylePropTypes);

const FacadeType = {
    SQUARE: 'square',
    CIRCLE: 'circle',
    WRAP: 'wrap',
    IMAGE: 'image'
};

/**
 * @author JarkimZhu
 * Created on 2016-06-13.
 * @version 0.1.0
 * @class
 */
export default class CheckBox extends Component {
    static defaultProps = {
        single: false,
        items: [],
        facadeUnchecked: FacadeType.SQUARE,
        facadeChecked: FacadeType.SQUARE
    };
    static propTypes = {
        single: PropTypes.bool,
        items: PropTypes.array.isRequired,
        facadeUnchecked: PropTypes.oneOf([
            FacadeType.SQUARE,
            FacadeType.CIRCLE,
            FacadeType.WRAP,
            FacadeType.IMAGE
        ]),
        facadeChecked: PropTypes.oneOf([
            FacadeType.SQUARE,
            FacadeType.CIRCLE,
            FacadeType.WRAP,
            FacadeType.IMAGE
        ]),
        srcUnchecked: Image.propTypes.source,
        srcChecked: Image.propTypes.source,
        itemStyle: stylePropType,
        boxStyle: stylePropType,
        boxCheckedStyle: stylePropType,
        labelStyle: stylePropType,
        labelCheckedStyle: stylePropType,
        onChange: PropTypes.func,
        onItemChange: PropTypes.func
    };

    _checkboxItems = [];

    constructor(props) {
        super(props);
    }

    _onItemChange = (value, label, checked) => {
        let process = true;
        if(this.props.onItemChange) {
            process = this.props.onItemChange(value, label, checked);
        }
        let checkboxItems = this._checkboxItems;
        if(process) {
            let items = {};
            if (this.props.single) {
                if (checked) {
                    for (let i = checkboxItems.length - 1; i >= 0; i--) {
                        let ref = checkboxItems[i];
                        if (ref instanceof CheckBoxItem && value !== ref.props.value) {
                            ref.setChecked(false);
                            items[ref.props.value] = false;
                        }
                    }
                }
            } else {
                for (let i = checkboxItems.length - 1; i >= 0; i--) {
                    let ref = checkboxItems[i];
                    if (ref instanceof CheckBoxItem && value !== ref.props.value) {
                        items[ref.props.value] = ref.state.checked;
                    }
                }
            }
            items[value] = checked;
            if (this.props.onChange) {
                this.props.onChange(items);
            }
        } else {
            for (let i = checkboxItems.length - 1; i >= 0; i--) {
                let ref = checkboxItems[i];
                if (ref instanceof CheckBoxItem && value === ref.props.value) {
                    ref.setChecked(!checked);
                    break;
                }
            }
        }
    };

    render() {
        let itemViews = [];
        let items = this.props.items;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let props = this.props;
            itemViews.push(
                <View style = {{height: 22, justifyContent: 'center'}}>
                    <CheckBoxItem
                        key={"checkbox_" + item.value}
                        ref={this._setCheckBoxItemRef}
                        single={props.single}
                        value={item.value} label={item.label} checked={item.checked}
                        facadeUnchecked={props.facadeUnchecked}
                        facadeChecked={props.facadeChecked}
                        srcUnchecked={props.srcUnchecked}
                        srcChecked={props.srcChecked}
                        itemStyle={props.itemStyle}
                        boxStyle={props.boxStyle}
                        boxCheckedStyle={props.boxCheckedStyle}
                        labelStyle={props.labelStyle}
                        labelCheckedStyle={props.labelCheckedStyle}
                        onChange={props.onChange}
                        onItemChange={this._onItemChange}
                    />
                </View>
            )
        }
        return (
            <View style={[this.props.style, {flexWrap:"wrap"}]}>
                {itemViews}
            </View>
        )
    }

    _setCheckBoxItemRef = (item) => {
        if(item) {
            this._checkboxItems.push(item);
        } else {
            this._checkboxItems.length = 0;
        }
    }
}

class CheckBoxItem extends Component {
    static defaultProps = {
        checked: false
    };
    static propTypes = {
        checked: PropTypes.bool,
        value: PropTypes.any.isRequired,
        label: PropTypes.string,
        onItemChange: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            checked: nextProps.checked
        })
    }

    setChecked(checked) {
        this.setState({checked: checked});
    }

    _onItemPress = () => {
        let props = this.props;
        if (this.state.checked) {
            if (!props.single) {
                this.setChecked(false);
                props.onItemChange(props.value, props.label, false);
            }
        } else {
            this.setChecked(true);
            props.onItemChange(props.value, props.label, true);
        }
    };

    render() {
        return (
            <TouchableOpacity onPress={this._onItemPress} hitSlop = {{top: 5, left: 5, bottom: 5, right: 5}}>
                <View style={[styles.ITEM_CONTAINER, this.props.itemStyle]}>
                    <View>
                        {this._renderCheck()}
                    </View>
                    <View>
                        {this._renderLabel()}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _renderCheck() {
        let facadeUnchecked = this.props.facadeUnchecked;
        let facadeChecked = this.props.facadeChecked;
        let boxStyle = this.props.boxStyle;
        let boxCheckedStyle = this.props.boxCheckedStyle;

        if (this.state.checked) {
            if (facadeChecked === FacadeType.IMAGE) {
                return <Image style={[styles.BOX, boxStyle]} source={this.props.srcChecked}/>
            } else if (facadeChecked === FacadeType.CIRCLE) {
                return (
                    <View style={[styles.BOX, styles.BOX_CIRCLE, boxStyle]}>
                        <View style={[styles.BOX_CHECKED, styles.BOX_CIRCLE_CHECKED, boxCheckedStyle]}/>
                    </View>
                )
            } else if (facadeChecked === FacadeType.WRAP) {
                return (
                    <View style={[styles.WRAP_BOX, styles.BOX_SQUARE, styles.WRAP_BOX_CHECKED, boxCheckedStyle]}>
                        <Text style={styles.WRAP_LABEL_CHECKED}>{this.props.label}</Text>
                    </View>
                )
            } else {
                return (
                    <View style={[styles.BOX, styles.BOX_SQUARE, boxStyle]}>
                        <View style={[styles.BOX_CHECKED, styles.BOX_SQUARE_CHECKED, boxCheckedStyle]}/>
                    </View>
                )
            }
        } else {
            if (facadeUnchecked === FacadeType.IMAGE) {
                return <Image style={[styles.BOX, boxStyle]} source={this.props.srcUnchecked}/>
            } else if (facadeUnchecked === FacadeType.CIRCLE) {
                return <View style={[styles.BOX, styles.BOX_CIRCLE, boxStyle]}/>
            } else if (facadeUnchecked === FacadeType.WRAP && this.props.label) {
                return (
                    <View style={[styles.WRAP_BOX, styles.BOX_SQUARE]}>
                        <Text>{this.props.label}</Text>
                    </View>
                )
            } else {
                return <View style={[styles.BOX, styles.BOX_SQUARE, boxStyle]}/>
            }
        }
    }

    _renderLabel() {
        let facadeUnchecked = this.props.facadeUnchecked;
        let facadeChecked = this.props.facadeChecked;
        if ((this.state.checked && facadeChecked === FacadeType.WRAP)
            || (!this.state.checked && facadeUnchecked === FacadeType.WRAP)) {
            return null;
        }
        if (this.props.label) {
            return <Text style={[styles.LABEL, this.props.labelStyle]}>{this.props.label}</Text>
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    BOX: {
        alignItems: "center",
        justifyContent: "center",
        width: CSS.pixel(36),
        height: CSS.pixel(36),
    },
    BOX_SQUARE: {
        borderWidth: 1,
        borderColor: "dimgray"
    },
    BOX_CIRCLE: {
        borderWidth: 1,
        borderColor: "#a0a0a0",
        borderRadius: CSS.pixel(48)
    },
    BOX_CHECKED: {
        width: CSS.pixel(24),
        height: CSS.pixel(24),
        backgroundColor: "dimgray"
    },
    BOX_SQUARE_CHECKED: {},
    BOX_CIRCLE_CHECKED: {
        borderRadius: CSS.pixel(24)
    },

    LABEL: {
        marginLeft: 4,
        color: '#3d4245'
    },

    ITEM_CONTAINER: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    WRAP_BOX: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "dimgray",
        borderRadius: 4,
        padding:2
    },
    WRAP_BOX_CHECKED: {
        backgroundColor: "dimgray"
    },
    WRAP_LABEL_CHECKED: {
        color: "white"
    }
});
