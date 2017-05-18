/**
 * Created by yoyo on 16/8/2.
 */
import HttpUtils from '../../http/HttpUtils'
const _url_='/payment/'
let WalletService={
	/*获取余额
	* */
	getBalance:()=>HttpUtils.get(`${_url_}getBalance`),
	isSetPassword:()=>HttpUtils.get(`${_url_}isSetPassword`),
	validMobileByFindPwd:(code)=>HttpUtils.post(`${_url_}validMobileByFindPwd`,{code}),
	validPayPassword:(password)=>HttpUtils.post(`${_url_}validPayPassword`,{password}),
	setPassword:(password,passwordD,vCode)=>HttpUtils.post(`${_url_}setPassword`,{password,passwordD,vCode}),
	bindThirdPay:(bindAccount,realName,payPassword,financeType=1)=>HttpUtils.post(`${_url_}bindThirdPay`,{bindAccount,realName,payPassword,financeType}),//绑定支付账号
	updateBind:(bindAccount,realName,payPassword,bindId,financeType=1)=>HttpUtils.post(`${_url_}updateBind`,{bindId,bindAccount,realName,payPassword,financeType}),//修改支付账号
	unBindThirdPay:(bindId,payPassword)=>HttpUtils.post(`${_url_}unBindThirdPay`,{bindId,payPassword}),
	pageThirdPay:(bindId)=>HttpUtils.post(`${_url_}pageThirdPay`,{bindId}),//查询第三方支付账号
	recordPage:(config)=>HttpUtils.post(`${_url_}record/page`,config),
	getRecord:(id)=>HttpUtils.post(`${_url_}record/get`,{id}),
	applyTransfer:(amount,currency="CNY",financeType=1)=>HttpUtils.post("/finance/applyTransfer",{amount,currency,financeType}),
	queryTransfer:(transferId)=>HttpUtils.post("/finance/queryTransfer",{transferId}),
	queryRefund:(refundId)=>HttpUtils.post("/finance/queryRefund",{refundId})
}
export default WalletService