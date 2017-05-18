/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

'use strict';

import httpUtils from "../../http/HttpUtils"

/**
 * @author JarkimZhu
 * Created on 2016-06-12.
 * @version 0.1.0
 * @class
 */
class Favorite {

    queryPosition() {
        return httpUtils.post("/history/queryPosition", {state:1}).then(function (json) {
            return json.message;
        });
    }

    queryPositionCount() {
        return httpUtils.post("/history/countPosition", {state:1}).then(function (json) {
            return json.message;
        });
    }

    queryCompany() {
        return httpUtils.post("/history/queryCompany", {state:1}).then(function(json) {
            return json.message;
        });
    }

    queryCompanyCount() {
        return httpUtils.post("/history/countCompany", {state:1}).then(function (json) {
            return json.message;
        });
    }
    
    deleteFavorite(checkedItems) {
        let items = [];
        for(let id in checkedItems) {
            if(checkedItems.hasOwnProperty(id)) {
                if(checkedItems[id] === true) {
                    items.push(id);
                }
            }
        }
        if(items.length > 0) {
            return httpUtils.post("/history/del", items);
        } else {
            return Promise.resolve();
        }
    }

    activity(id) {
        return httpUtils.post("/history/activity", {
            id: id
        });
    }

    delActivity(id) {
        return httpUtils.post("/history/delActivity", {
            id: id
        });
    }

    queryActivity() {
        return httpUtils.post("/history/queryActivity", {});
    }

    countActivity() {
        return httpUtils.post("/history/countActivity", {});
    }
}

const favorite = new Favorite();
export default favorite;