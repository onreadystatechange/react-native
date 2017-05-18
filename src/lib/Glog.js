/**
 * Created by yoyo on 16/7/23.
 */
function Glog (arg1,arg2) {
	if(__DEV__){
		//发布模式__DEV_ 为false
		//console.log.apply(this,arguments)
		if(!arg2){
			console.log(arg1)
		}else{
			console.log(arg1,arg2)
		}
	}
}
export default Glog