/**
 * Created by yoyo on 16/6/25.
 */
/**
 * Created by yoyo on 16/4/23.
 */
import HttpUtils from '../http/HttpUtils'
var Favourite = {
	fav_positions: function (posId) {
		return HttpUtils.post("/history/position",{id:posId})
	},
	unFav_positions:function (pos) {
		return HttpUtils.post("/history/delPosition",pos)
	},
	fav_company:function (companyId) {
		return HttpUtils.post("/history/company",{id:companyId})
	},
	unFav_company:function (companyId) {
		return HttpUtils.post("/history/delCompany",companyId)
	},
	fav_event:function (eventId) {
		return HttpUtils.post("/history/activity",{id:eventId})
	},
	unFav_event:function (eventId) {
		return HttpUtils.post("/history/delActivity",eventId)
	}
};

export default Favourite;
