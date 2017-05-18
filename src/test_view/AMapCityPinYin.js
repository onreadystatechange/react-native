/**
 * Created by yoyo on 16/6/30.
 */
import AMapCityCode from '../../res/data/AMapCityCode'
import convert2pinyin from '../lib/convert2pinyin'

city_result=AMapCityCode.result.city

for (let _key in city_result){
	let _group=city_result[_key]
	_group.forEach(city=>{
		city.pinyin=convert2pinyin(city.name).toString().toLowerCase()
	})
}
console.log("city_result",city_result);

export default city_result