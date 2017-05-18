/**
 * Created by yjy on 16/8/4.
 */

import httpUtils from "../http/HttpUtils";

class Address {
    addSave(type, province, city, county, local, consignee, callNum) {
        return httpUtils.post("/address/save", {
            type: type,             //类型，0普通，1默认地址
            province: province,     //省份
            city: city,             //城市
            county: county,         //区/县
            local: local,           //详细地址
            consignee: consignee,   //收件人
            callNum: callNum        //联系电话
        });
    }

    editSave(id, type, province, city, county, local, consignee, callNum) {
        return httpUtils.post("/address/save", {
            id: id,
            type: type,             //类型，0普通，1默认地址
            province: province,     //省份
            city: city,             //城市
            county: county,         //区/县
            local: local,           //详细地址
            consignee: consignee,   //收件人
            callNum: callNum        //联系电话
        });
    }

    query(type) {
        return httpUtils.post("/address/query", {
            type: type			//-1全部, 0普通，1默认地址
        });
    }

    count(type) {
        return httpUtils.post("/address/count", {
            type: type			//-1全部, 0普通，1默认地址 
        });
    }

    get(id) {
        return httpUtils.post("/address/get", {
            id: id
        });
    }

    del(id) {
        return httpUtils.post("/address/del", {
            id: id
        });
    }

    setDefault(id) {
        return httpUtils.post("/address/setDefault", {
            id: id
        });
    }
}

const address = new Address();
export default address;