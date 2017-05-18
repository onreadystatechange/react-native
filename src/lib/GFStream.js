/**
 * @author yoyo
 * Created on 2016-06-02.
 * @version 0.1.0
 * @class
 */
import Rx from 'rx'

function createScrollStream(pageSize,pnCreator,scrollHandler,getDataPromise,setDs) {
	let DbPool=[];
	let init=false;
	let stream=Rx.Observable.create(function ( observer ) {
		scrollHandler(function (data) {
			if(!data){
				observer.next("start");
			}else{
				let nativeEvent=data.nativeEvent;
				observer.next(nativeEvent.contentOffset.y);
			}
		})
	}).debounce(500).scan(function ( lastY,thisY ) {
		if(thisY=='start'){
			return true
		}
		return thisY-lastY>0;
	},0).filter(function ( is2down) {
		return is2down
	}).map(function () {
		return 1;
	}).scan(function ( x,y ) {
		if(init){
			init=false;
			return 1;
		}
		return x+y;
	},0).map(function (pageIndex) {
		return  {promise:getDataPromise(pnCreator(pageIndex)) ,count:pageIndex}
	}).subscribe(function ( res ) {
		let promise=res.promise;
		let count=res.count;
		let endIndex=count*pageSize;
		if(DbPool.length){
			let listDs=DbPool.slice(0,endIndex);
			setDs(listDs)
		}
		promise.done(function ( data ) {
			let append=false;
			if(DbPool.length==0){
				append=true;
			}
			DbPool=DbPool.concat(data);
			if(append){
				let listDs=DbPool.slice(0,endIndex);
				setDs(listDs);
			}
		})
	})
	return {destroyStream:function (  ) {
		if(DbPool&&stream){
			DbPool.length=0;
			DbPool=null;
			if(stream.unsubscribe){
				stream.unsubscribe();
			}
			stream=null;
		}
	},init:function (scrollTrigger) {
		DbPool.length=0;
		init=true;
		scrollTrigger();
	}}
}

export {createScrollStream}