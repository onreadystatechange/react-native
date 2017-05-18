/**
 * Created by yoyo on 16/6/7.
 */
import {Cmy_URL} from '../http/url'
import HttpUtils from '../http/HttpUtils'
var Company = {
	getInfo: function (companyId) {
		return HttpUtils.post(Cmy_URL.getInfo,{"companyId":companyId})
	},
	getCommentList:(config)=>{
		return HttpUtils.post("/appraise/query",config).then(x=>{
			return x.message
		})
	}
};
export {Company}