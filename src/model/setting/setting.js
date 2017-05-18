/**
 * Created by yjy on 2016/6/17.
 */

import httpUtils from "../../http/HttpUtils";

class Setting {
    save(push) {
        return httpUtils.post("/config/save", {
            push : push     //推送配置 { off , on , D1 , W1 , M1 , Y1 }
        });
    }
    
    load() {
        return httpUtils.post("/config/load", {});
    }
    
    setSafety(question1, question2, question3, answer1, answer2, answer3) {
        return httpUtils.post("/user/setSafety", {
            question1: question1,
            question2: question2,
            question3: question3,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3
        });
    }
    
    getSafety() {
        return httpUtils.get("/user/getSafety");
    }
    
    validSafety(question1, question2, question3, answer1, answer2, answer3) {
        return httpUtils.post("/user/validSafety", {
            question1: question1,
            question2: question2,
            question3: question3,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3
        });
    }
    
    validOldMobile(mobile, code) {
        return httpUtils.post("/user/validOldMobile", {
            mobile: mobile,
            code: code
        });
    }
    
    upMobile(mobile, code, vCode) {
        return httpUtils.post("/user/upMobile", {
            mobile: mobile,
            code: code,
            vCode: vCode //验证码，安全问题和旧手机验证通过后的返回码
        });
    }
    
    saveOpinion(contact, content) {
        return httpUtils.post("/settings/saveOpinion", {
            contact: contact,  //邮箱
            content: content   //内容
        });
    }

    getVersion() {
        return httpUtils.post("/app/getVersion", {});
    }

    isUpdate(version, appType, channel) {
        return httpUtils.post("/app/isUpdate", {
            version: version,
            appType: appType,
            channel: channel
        });
    }
}

const setting = new Setting();
export default setting;