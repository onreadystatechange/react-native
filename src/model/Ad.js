/**
 * Created by yoyo on 16/7/19.
 */
import HttpUtils from '../http/HttpUtils'

let Ad={
	getBannerAds:()=>{
		return HttpUtils.post('/imgversion/getByRule',{id:2})
	}
}

export  default Ad