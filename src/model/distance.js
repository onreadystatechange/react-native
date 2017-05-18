/**
 * Created by yoyo on 16/7/2.
 */
function distance(distance_m) {
	if(distance_m){
		/*if(distance_m>1000){
			return (distance_m*1/1000).toFixed(1)+"km"
		}else{
			return distance_m.toFixed(1)+"m"
		}*/
		return (distance_m*1/1000).toFixed(1)+"km"
	}
	return "未知距离"
}
export  default distance