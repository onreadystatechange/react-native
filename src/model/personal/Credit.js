/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

'use strict';

import httpUtils from "../../http/HttpUtils";

/**
 * @author JarkimZhu
 * Created on 2016-06-13.
 * @version 0.1.0
 * @class
 */
class Credit {

    queryCreditCount() {
        return httpUtils.post("/appraise/count4me", {type:2}).then(function (json) {
            return json.message;
        });
    }

    queryCreditList(page = 1) {
        return httpUtils.post("/appraise/query4me", {type:2}).then(function(json) {
            return json.message;
        });
    }
}
const credit = new Credit();
export default credit;