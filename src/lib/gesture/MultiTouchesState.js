/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

"use strict"


/**
 * Created on 16/8/18.
 *
 * @author JarkimZhu
 * @class
 * @extends React.Component
 */
export default class MultiTouchesState {

    _multiTouches = [];
    constructor(evt) {
        this._updateMultiTouches(evt.nativeEvent.touches);
    }

    updateMultiTouchesState(evt) {
        this._updateMultiTouches(evt.nativeEvent.touches);
    }

    getMoveScale(referWidth, referHeight) {
        let multiTouches = this._multiTouches;
        if(multiTouches.length < 2) {
            return 1;
        }

        let referDis = Math.sqrt(referWidth * referWidth + referHeight + referHeight);

        let m0 = multiTouches[0], m1 = multiTouches[1];
        let m0x = m0.x, m0y = m0.y, m0x0 = m0.x0, m0y0 = m0.y0;
        let m1x = m1.x, m1y = m1.y, m1x0 = m1.x0, m1y0 = m1.y0;

        let dis0 = Math.sqrt(Math.pow(m0x0 - m1x0, 2) + Math.pow(m0y0 - m1y0, 2));
        let dis1 = Math.sqrt(Math.pow(m0x - m1x, 2) + Math.pow(m0y - m1y, 2));
        let touchDis = dis1 - dis0;

        console.log("referDis", referDis, "dis0", dis0, "dis1", dis1);

        return 1 + touchDis / referDis;
    }

    _updateMultiTouches(touches) {
        let multiTouches = this._multiTouches;
        for(let i = touches.length - 1; i >= 0; i--) {
            let touch = touches[i];
            let m = null;
            for(let j = multiTouches.length - 1; j >= 0; j--) {
                let t = multiTouches[j];
                if(touch.identifier === t.identifier) {
                    m = t;
                    break;
                }
            }

            if(!m) {
                m = {
                    identifier: touch.identifier,
                    x: touch.pageX,
                    y: touch.pageY,
                    x0: touch.pageX,
                    y0: touch.pageY,
                    dx: 0,
                    dy: 0
                };
                multiTouches.push(m);
            } else {
                m.x = touch.pageX;
                m.y = touch.pageY;
                m.dx = touch.pageX - m.x0;
                m.dy = touch.pageY - m.y0;
            }
        }
    }
}