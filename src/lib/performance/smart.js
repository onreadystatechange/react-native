/**
 * Created by yoyo on 16/7/12.
 */

let navigatorList=[]
let handler=[]
import {mixed} from '../tools'
import _ from 'underscore'
import Glog from '../Glog'
function smart_didFocus (nav,_route_name,fn,alias) {
	if(navigatorList.indexOf(nav)==-1){
		navigatorList.push(nav)
		handler.push({name:_route_name,fn:fn,alias:alias})
		nav.navigationContext.addListener('didfocus',(x)=>{
			//Glog(handler)
			handler.filter(_x=>(_x.name==x._data.route.name)&&(!x.pause)).forEach(_record=>_record.fn())
		})
	}else{
		handler.push({name:_route_name,fn:fn})
	}
}
function _set_pause(pageName){
	return function ( state ) {
		if(pageName){
			handler.filter(x=>(x.name==pageName)||(x.alias==pageName)).forEach(item=>{
				item.pause=state
			})
		}
	}
}
function smart_page_pause(pageName) {
	_set_pause(pageName)(true)
}
function smart_page_active(pageName) {
	_set_pause(pageName)(false)
}
function mj (_route,route) {
	_.each(route,(value,_key)=>{
		if(_key!="name"&&_key!="component"){
			_route[_key]=value
		}
	})
}
function smart_nav_push(nav,route) {
		let _routeStack=nav.getCurrentRoutes()
		let _route=_routeStack.filter(r=>r.name==route.name)[0]
		if(_route){
			//清除上一次参数,保证下一次参数传输不受上一次干扰
			_route._$arg$_.forEach(key=>{
				delete  _route[key]
			})
			_route._$arg$_=[]
			mj(_route,route)
			nav.jumpTo(_route)
			return false
		}
		//纪录除name component之外的参数
		route._$arg$_=[]
		for( let name in route){
			if(name!="name"&&name!="component"){
				route._$arg$_.push(name)
			}
		}
		route._$pushType$_='smart'
	    nav.push(route)
}
export {
    smart_nav_push,
	smart_didFocus,
	smart_page_pause,
	smart_page_active
}