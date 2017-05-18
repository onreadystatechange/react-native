function LightQueue (fn_list) {
	var self=this;
	self._list=fn_list;
	self._len=fn_list.length;
	self.index=0;
	self.run_que=function (lastValue) {
		if(self._list.length>0){
			if(self.index>=self._len){
				self.index=0;
				if(self.end){
					self.end();
				}
				return false;
			}
			self._list[self.index](function ( _lastValue ) {
				self.index++;
				self.run_que(_lastValue);
			},lastValue)
		}else{
			self.index=0;
			if(self.end){
				self.end();
			}
		}
	}
	self.start=function (endCallBack) {
		self.index=0;
		self.end=endCallBack;
		self.run_que();
	}
}
