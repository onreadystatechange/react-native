/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

/**
 * @version 0.0.1-SNAPSHOT
 * @author JarkimZhu
 * Created on 2015/12/11.
 * @class
 */
class ArrayUtils {
    static remove(arr, toRemove) {
        if (isNaN(toRemove)) {
            for (let i = arr.length - 1; i >= 0; i--) {
                if (arr[i] === toRemove) {
                    arr.splice(i, 1);
                    break;
                }
            }
        } else {
            arr.splice(toRemove, 1);
        }
        return arr;
    }

    static removeAll(arr) {
        let argSize = arguments.length;
        if (argSize === 2 && Array.isArray(arguments[1])) {
            let indexes = arguments[1];
            let indexSize = indexes.length;
            for (let m = 0; m < indexSize; m++) {
                let idx = indexes[m];
                arr.splice(idx - m, 1);
            }
        } else {
            for (let i = 1; i < argSize; i++) {
                let index = arguments[i];
                arr.splice(index - i, 1);
            }
        }
        return arr;
    }

    static contains(arr, value) {
        let index = ArrayUtils.indexOf(arr, value);
        return index !== -1;
    }

    static indexOf(arr, value) {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === value) {
                return i;
            }
        }
        return -1;
    }
}

class NumberUtils {
    static toFixed(num, scale) {
        let fixStr = num.toFixed(scale);
        if (scale === 0) {
            return parseInt(fixStr);
        } else {
            return parseFloat(fixStr);
        }
    }
}

export {
    ArrayUtils,
    NumberUtils
}