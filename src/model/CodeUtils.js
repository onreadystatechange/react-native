/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

'use strict';

import ConstellationCode from "../../res/data/ConstellationCode";
import GradeCode from "../../res/data/GradeCode";
import EducationCode from "../../res/data/EducationCode";
import ClearCateCode from "../../res/data/ClearCateCode";
import SalaryUnitCode from "../../res/data/SalaryUnitCode";
import JobCardCode from "../../res/data/JobCardCode";
import ExceptionCode  from '../../res/data/ExceptionCode'
import AMapCityWithPinyin,{flatCitys} from '../../res/data/AMapCityWithPinyin';
import AMapCityWithPinyinTemp from '../../res/data/AMapCityWithPinyinTemp';
import CityZoneCode from '../../res/data/ChinaCityCode'
import Glog from '../lib/Glog'
/**
 * @author JarkimZhu
 * Created on 2016-06-08.
 * @version 0.1.0
 * @class
 */
export default class CodeUtils {
    /**
     * 根据城市ID获取当前城市
     * @param cityCode
     * @returns {{code, name, provinceCode}|*}
     */
    static getCityByCode(cityCode){
        return CodeUtils._getByCode(cityCode, flatCitys, "cityCode");
    }
    static getCityByName(cityName) {
        return CodeUtils._getByName(cityName, flatCitys);
    }
    static getExceptionByCode(e_code){
        return CodeUtils._getByCode(e_code,ExceptionCode);
    }
    static getCityCenterByCode(cityCode){
        let _city=CodeUtils._getByCode(cityCode,CityZoneCode,'citycode')
        Glog('_city',_city)
        if(!_city)return null
        let xy=_city.center.split(',')
        Glog('xy',xy)
        return {
                longitude:xy[0]*1,
                latitude:xy[1]*1
        }
    }
    /*
    * 根据关键字(拼音)查询获取城市列表
    * @param code
    * @returns [{name:"",code:"",pinyin:""}]
    * */
    static getCityCollectionBySearch(kw){
        kw=kw.toLowerCase()
        let _filterCitys=flatCitys.filter(x=>{
            let wordIndex=x.name.indexOf(kw);
            let pinyinIndex=x.pinyin.indexOf(kw);
            return (wordIndex>-1)||(pinyinIndex>-1)
        })||[]
        return _filterCitys;
    }
    static getCityCollection(){
        //return AMapCityWithPinyin;
        return AMapCityWithPinyinTemp;

    }
    static getCityZoneByCityCode(cityCode){
        return CodeUtils._getByCode(cityCode,CityZoneCode,'citycode')
    }
    static getGradeByCode(code) {
        return CodeUtils._getByCode(code, GradeCode);
    }
    static getGradeByName(name) {
        return CodeUtils._getByName(name, GradeCode);
    }

    static getEducationByCode(code) {
        return CodeUtils._getByCode(code, EducationCode);
    }

    static getEducationByName(name) {
        return CodeUtils._getByName(name);
    }

    static getClearCateByCode(code) {
        return CodeUtils._getByCode(code, ClearCateCode);
    }

    static getClearCateByName(name) {
        return CodeUtils._getByName(name, ClearCateCode);
    }

    static getSalaryUnitByCode(code) {
        return CodeUtils._getByCode(code, SalaryUnitCode);
    }

    static getSalaryUnitByName(name) {
        return CodeUtils._getByName(code, SalaryUnitCode);
    }

    static getJobCardByCode(code) {
        return CodeUtils._getByCode(code, JobCardCode);
    }

    static getJobCardByName(name) {
        return CodeUtils._getByName(name, JobCardCode);
    }

    static getConstellation(month, day) {
        let md = parseInt(month) * 100 + parseInt(day);
        if (101 <= md && md <= 1231) {
            for (let i = 0; i < 12; i++) {
                let constellation = ConstellationCode[i];
                if (constellation.match(md)) {
                    return constellation;
                }
            }
        }
        return {};
    }

    static getConstellactionByName(name) {
        return CodeUtils._getByName(name, ConstellationCode);
    }

    static _getByCode(code, datas, key) {
        if(!key) key = "code";
        for(let i = datas.length - 1; i >= 0; i--){
            let o = datas[i];
            if(o[key] === code){
                return o;
            }
        }
        return {};
    }

    static _getByName(name, datas) {
        for(let i = datas.length - 1; i >= 0; i--){
            let o = datas[i];
            if(o.name === name){
                return o;
            }
        }
        return {};
    }
}