/**
 * Created by yjy on 16/6/24.
 */

import httpUtils from "../../http/HttpUtils";

class Schedule {
    query(date, pn = '20/1') {
        return httpUtils.post("/schedule/query", {
            date: date,
            pn: pn
        });
    }
}

const schedule = new Schedule();
export default schedule;