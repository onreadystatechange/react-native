/**
 * Created by yjy on 16/8/17.
 */

import httpUtils from "../http/HttpUtils";

class Index {
    structure(city) {
        return httpUtils.post("/index/structure", {
            city: city
        });
    }
}

const index = new Index();
export default index;