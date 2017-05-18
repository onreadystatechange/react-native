/**
 * Created by yoyo on 16/7/5.
 */
import HttpUtils from '../../http/HttpUtils'
import GFLocation from '../GFLocation'

let School={
	querySchool:(kw)=>{
		return HttpUtils.post("/code/querySchool",{searchValue:kw})
	}
}

export  default School