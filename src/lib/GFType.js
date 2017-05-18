/**
 * @author yoyo
 * Created on 2016-06-02.
 * @version 0.1.0
 * @class
 */

const Type_account = {
    noCode: 0,
    person: 1,
    company: 2
};

const Type_login = {
    pwd: 1,
    message: 2
};

const Type_check = {
    getPhoneCode: 1,
    testPhoneCode: 2
};

const Type_PhotoLimit = {
    single: true,
    multiple: false
};

const Type_Jobs_type = [
    {'key': '不限', 'val': 99},
    {'key': '促销导购', 'val': 3},
    {'key': '传单派单', 'val': 1},
    {'key': '礼仪', 'val': 16},
    {'key': '模特', 'val': 4},
    {'key': '安保', 'val': 17},
    {'key': '销售', 'val': 5},
    {'key': '服务员', 'val': 2},
    {'key': '客服', 'val': 18},
    {'key': '小时工', 'val': 6},
    {'key': '校园代理', 'val': 8},
    {'key': '家教培训', 'val': 9},
    {'key': '问卷调查', 'val': 12},
    {'key': '主持表演', 'val': 15},
    {'key': '生活配送', 'val': 10},
    {'key': '其他', 'val': 99}
];

const Type_Edu_arr = ['', '高中', '大专', '本科', '研究生'];


const Type_Jobs_type_Sex = [
    { value: -1, text: '不限' },
    { value: 1, text: '男' },
    { value: 2, text: '女' }
];

const Type_Jobs_type_Height = [
    { value: -1, text: '不限' },
    { value: 150, text: '150cm以上' },
    { value: 160, text: '160cm以上' },
    { value: 170, text: '170cm以上' },
    { value: 180, text: '180cm以上' }
];

const Type_Jobs_type_Need = [
    { value: 1, text: '需要' },
    { value: 0, text: '不需要' }
];

const Type_Jobs_type_ByCode = function (code) {
    let res = Type_Jobs_type.filter(x=>code * 1 == x.val);
    return res.length ? res[0].key : ""
};

const Type_Jobs_type_ByKey = function (key) {
    let res = Type_Jobs_type.filter(x=>key == x.key);
    return res.length ? res[0].val : ""
};

const clearingCate_enum = ["", "日结", "周结", "月结", "完结"];
const salaryUnit_enum = ["", "天", "小时", "月", "件"];
const delivery_enum = ['不配送', '包邮'];

export  {
    salaryUnit_enum,
    clearingCate_enum,
    delivery_enum,
    Type_account,
    Type_login,
    Type_check,
    Type_PhotoLimit,
    Type_Jobs_type,
    Type_Jobs_type_ByCode,
    Type_Edu_arr,
    Type_Jobs_type_ByKey,
    Type_Jobs_type_Sex,
    Type_Jobs_type_Height,
    Type_Jobs_type_Need
}