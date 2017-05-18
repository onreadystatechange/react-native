/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

'use strict';

/**
 * @author JarkimZhu
 * Created on 2016-07-02.
 * @version 0.1.0
 * @class
 */
export default class UiUtils {
    static startAnimationTimer(callback, interval) {
        let startTime = Date.now();
        function _inner(nowTime) {
            let diff = nowTime - startTime;
            if (diff >= interval) {
                callback(diff);
            }
            callback.__requestAnimationFrameId__ = requestAnimationFrame(_inner);
        }
        callback(0);
        callback.__requestAnimationFrameId__ = requestAnimationFrame(_inner);
    }

    static stopAnimationTimer(callback) {
        cancelAnimationFrame(callback.__requestAnimationFrameId__);
    }
}