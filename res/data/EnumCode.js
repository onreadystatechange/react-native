/**
 * Created by yoyo on 16/7/9.
 * info:枚举管理
 */
const EnumCode={
	//性别
	gender_eum:{
		_null:0,//不限制,未知
		male:1,//女性
		female:2//男性
	},
	//兼职状态
	jobState_eum:{
		in_progress:1,//招聘进行中
		reject:2,//驳回
		complete:3,//已完成
		out_date:4//已过期
	}
}
export default EnumCode